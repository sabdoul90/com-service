const express = require('express');
const Information = require('../models/informationmodel');
const File = require('../models/fileModele');
const { where, json } = require('sequelize');

const addInfo = async (req, res)=>{
    try{
        const {titre, description, filesIds} = req.body;

        const info = await Information.create({titre, description});

        if(Array.isArray(filesIds) && filesIds.length>0){
            await File.update(
                {"information" : info.id},
                {where : {id : filesIds}}
            );
        }

        const infoAjouter = await Information.findOne({
            where: { id: info.id },
            include: [{ model: File }]
        });

        res.status(200).json({
            success:true,
            message : "Information ajoutée avec succès",
            information : infoAjouter
        });
        
    }catch (error){
        res.status(500).json({success:false, message:`Erreur d'enregistrement ${error}`})
    }
}

const getInfo = async (req, res) => {
    try {
        const url = req.params;

        console.log("Dans la fonction getInfo");

        const info = await Information.findAll({
            include: {
                model: File,
            }
        });

        if (info.length>0) {
            return res.status(200).json({success:true, message:"success", data:info});
        } else {
            return res.status(404).json({ success:false, message: "Aucune information trouvée." });
        }
    } catch (error) {
        return res.status(500).json({success:true, message: "Erreur interne du serveur." });
    }
};


const getInfoParID = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Dans par ID");
        if (!id) {
            return res.status(400).json({ success:false, message: "L'ID est requis pour la suppression." });
        }

        //const idInt = parseInt(id,10);

        const info = await Information.findOne({
            where : {id},
            include : {
                model:File
            }
        });

        if (info) {
            return res.status(200).json({ success:true, message:"succèss", data: info});
        } else {
            return res.status(404).json({ success : false, message: "Aucune information trouvée." });
        }
    } catch (error) {
        return res.status(500).json({ success : false, message: "Erreur interne du serveur." });
    }
};

const supprimerInfo = async (req, res) => {

    try {
        const { id } = req.params;
        console.log(id);

        if (!id) {
            return res.status(400).json({ success:false, message: "L'ID est requis pour la suppression." });
        }

        const idInt = parseInt(id,10);


        const info = await Information.destroy(
             { where: { id : idInt } } );


        if (info) {
            return res.status(200).json({ 
                success:true,
                message: "Information supprimée avec succès." });
        } else {
            return res.status(404).json({
                success:false,
                 message: "Information non trouvée." });
        }

    } catch (error) {
        return res.status(500).json(
            { success:false, message: "Erreur interne du serveur." }
        );
    }
};

const updateInfo = async (req, res) => {
    try {
        const { id } = req.params;
        const {titre, description, filesIds} = req.body;

        if (!id) {
            return res.status(400).json({ success : false, message: "L'ID est requis pour la mise à jour." });
        }

        const info = await Information.findOne({ where: { id } });
        if (!info) {
            return res.status(404).json(
                { 
                    success:false, 
                    message: "Information non trouvée." 
                });
            }

        const updateData = {};

        if (titre !== undefined) 
            updateData.titre = titre;
        if (description !== undefined) 
            updateData.description = description;

        if(Object.keys(updateData).length>0)
            await info.update(updateData);

        if(Array.isArray(filesIds) && filesIds.length>0){
            await File.update(
                {"information" : info.id},
                {where : {id : filesIds}}
            );
        }

        const updatedInfo = await Information.findOne({
            where: { id },
            include: { model: File }
        });

        return res.status(200).json(
            { 
                success:true, 
                message: "Information mise à jour avec succès.", 
                data: updatedInfo 
            });
    } catch (error) {
        return res.status(500).json(
            {
                success:false, 
                message: "Erreur interne du serveur." 
            });
    }
};

module.exports = {addInfo, getInfo, getInfoParID, supprimerInfo, updateInfo};