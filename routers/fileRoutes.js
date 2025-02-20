const {upload, enregistrer} = require("../controllers/fileController");
const express = require('express');

const filesRouter = express.Router();

filesRouter.post('/uploads', enregistrer.array("files", 5),upload);

module.exports = filesRouter;