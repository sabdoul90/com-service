const Commentaire = require("../models/commentaireModele");

const addComment = async (req, res) => {
    const { content, type, proprietaire, idRelation } = req.body;

    try {
        if (!idRelation) {
            return res.status(400).json({ success: false, message: `${type} requis` });
        }

        
        const relationKey = type === "information" ? "information" 
                          : type === "activite" ? "activite" 
                          : type === "livre" ? "livre" 
                          : null;

        if (!relationKey) {
            return res.status(400).json({ success: false, message: "Type de commentaire invalide" });
        }

        const comment = await Commentaire.create({
            type,
            content,
            proprietaire,
            [relationKey]: idRelation,
        });

        return res.status(200).json({ success: true, message: "Ajout du commentaire effectué.", data: comment });

    } catch (e) {
        return res.status(500).json({ success: false, message: `Ajout du commentaire échoué. ${e.message}` });
    }
};

const getAll = async (req, res)=>{
    try{
        const commentaires = await Commentaire.findAll();
        return res.status(200).json({success:true,message:"recuperation effectuée !", data : commentaires})
    }catch(e){
        return res.status(500).json({ success:false, message:`Echec de la récuperation des commenatires : ${e.message}`});
    }
}

const getCommentPardID = async (req, res)=>{
    const {id} = req.params;
    try{
        if (!id) {
            return res.status(400).json({ success:false, message: "L'ID est requis pour la recuperation." });
        }

        const commentaire = await Commentaire.findOne({where : {id}});

        if (!commentaire) {
            return res.status(404).json({ success : false, message: "Aucune commentaire trouvée." });
        }

        return res.status(200).json({ success:true, message:"succèss", data: commentaire});

    }catch(e){
        res.status(500).json({ success:false, message:`Echec de la recuperation du commentaire : ${e.message}`});
    }
}

const delateComment = async (req, res)=>{
    const {id} = req.params;
    try{

        if (!id) {
            return res.status(400).json({ success:false, message: "L'ID est requis pour la recuperation." });
        }

        const commentaire = await Commentaire.destroy({where:{id : id}});

        if (!commentaire) {
    
            return res.status(404).json({
                success:false,
                 message: "commantaire non trouvé." });
        }

        return res.status(200).json({ 
            success:true,
            message: "commenatire supprimé avec succès." });

    }catch(e){
        res.status(500).json({ success:false, message:`Suppression du commentaire echoué : ${e.message}`});
    }
}

const updateComment = async (req, res)=>{
    const {content, proprietaire, idInfo} = req.body;
    try{

    }catch(e){
        res.status(500).json({ success:false, message:`Modification du commentaire echouée : ${e}`});
    }
}

module.exports = {
    addComment,
    getAll,
    getCommentPardID,
    delateComment,
    updateComment
}