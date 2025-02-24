const multer = require('multer');
const path = require('path');
const File = require('../models/fileModele');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // ✅ Ajout d'un timestamp pour éviter les doublons
    },
});

const enregistrer = multer({ storage });

const upload = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ success: false, message: "Aucun fichier envoyé" });
        }

        const medias = await Promise.all(
            req.files.map((fichier) =>
                File.create({
                    nom: fichier.originalname, // ✅ Stocker le nom original du fichier
                    url: `uploads/${fichier.filename}`,
                    type: fichier.mimetype,
                    size: fichier.size
                })
            )
        );

        res.status(200).json({ success: true, medias});

    } catch (error) {
        res.status(500).json({ success: false, message: `Erreur d'enregistrement ${error}` });
    }
};

module.exports = {
    upload,
    enregistrer
};
