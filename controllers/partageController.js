const Partage = require("../models/partagesModele");


const addPartage = async (req, res)=>{
    const {type, proprietaire, idRelation} = req.body;

    try{

        const relationKey = type === "information" ? "information" 
                          : type === "activite" ? "activite" 
                          : type === "livre" ? "livre" 
                          : null;

        if(!relationKey){
            return res.status(400).json({success : true, message : `${type} de partage invalide`});
        }

        const partage = await Partage.create({
            proprietaire : proprietaire,
            [relationKey]: idRelation
        });

        return res.status(200).json({
            success : true,
            message : "Ajout du partage effectué",
            data : partage
        });

    }catch (e){
        return res.status(500).json({
            success : false,
            message : `L'ajout du partage a echoué ${e.message} .`
        });
    }
};

const retirerPartage = (req, res)=>{
    const {id} = req.params;
    try{
        if(!id){
            return res.status(400).json({success : true, message : `L'identifiant est requis pour la suppression.`});
        }
        
        const partage = Partage.destroy({where : {id : id}});
    
        if (!partage) {
        
            return res.status(404).json({
                success:false,
                message: "Partage non trouvé." });
        }
    
        return res.status(200).json({ 
            success:true,
            message: "Le partage est retiré avec succès." });
    }catch(e){
        return res.status(500).json({ success:false, message:`Le retrait du partage a echoué : ${e.message}`});
    }

}

module.exports = {addPartage, retirerPartage}