const Like = require("../models/likesModele");

const addLike = async (req, res)=>{
    const {type, proprietaire, idRelation} = req.body;


    try{

        const relationKey = type === "information" ? "information" 
                          : type === "activite" ? "activite" 
                          : type === "livre" ? "livre" 
                          : null;

        if(!relationKey){
            return res.status(400).json({success : true, message : `${type} de like invalide`});
        }

        const like = await Like.create({
            proprietaire,
            [relationKey]: idRelation,
        });

        console.log(like);

        return res.status(200).json({
            success : true,
            message : "Ajout du like effectué",
            data : like
        });

    }catch (e){
        return res.status(500).json({
            success : false,
            message : `L'ajout du like a echoué ${e.message} .`
        })
    }
}

const retirerLike = async (req, res)=>{
    const {id} = req.params;
    try{
        if(!id){
            return res.status(400).json({success : true, message : `L'identifiant est requis pour la suppression.`});
        }
        
        const like = await Like.destroy({where : {id : id}});
    
        if (!like) {
            return res.status(404).json({
                success:false,
                message: "Like non trouvé." });
        }
    
        return res.status(200).json({ 
            success:true,
            message: "Le like est retiré avec succès." });
    }catch(e){
        return res.status(500).json({ success:false, message:`Le retrait du like a echoué : ${e.message}`});
    }

}

module.exports = {addLike, retirerLike}