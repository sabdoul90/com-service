const express = require("express");
const { addLike, retirerLike } = require("../controllers/likeController");

const likesRoutes = express.Router();

likesRoutes.post("/likes", addLike);
likesRoutes.delete("/likes/:id",retirerLike);

module.exports = likesRoutes;