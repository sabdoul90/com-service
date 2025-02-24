const express = require('express');
const {addInfo, getInfo, supprimerInfo, updateInfo, getInfoParID}= require('../controllers/infoController');

const informationRouter = express.Router();

//Route de la fonction d'ajout d'informations
informationRouter.post("/informations", addInfo);

//Route de la fonction pour modifier une information
informationRouter.post("/update-informations/:id", updateInfo);

//Route de la fonction pour recuperer les information selon l'id ou l'ensemble
informationRouter.get("/informations/:id", getInfoParID);
informationRouter.get("/informations", getInfo);


//Route de la fonction de suppression d'une information
informationRouter.delete("/delete-informations/:id", supprimerInfo);

module.exports = informationRouter;