const express = require("express");
const { addComment, getAll, getCommentPardID, delateComment, updateComment } = require("../controllers/commentaireController");

const commentRoute = express.Router();

commentRoute.post("/commentaires", addComment);
commentRoute.get("/commentaires", getAll);
commentRoute.get("/commentaires/:id", getCommentPardID);
commentRoute.delete("/commentaires/:id", delateComment);
commentRoute.put("/commentaires/:id", updateComment);

module.exports = commentRoute;