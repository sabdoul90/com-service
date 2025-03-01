const express = require("express");
const { addPartage, retirerPartage } = require("../controllers/partageController");

const partageRoutes = express.Router();

partageRoutes.post("/partages", addPartage);
partageRoutes.delete("/partages/:id",retirerPartage);

module.exports = partageRoutes;