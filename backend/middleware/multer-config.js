// Importation du package multer
const multer = require('multer');

// Gestion du MIME type des fichiers images
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

// Objet de configuration de multer en charge de l'enregistrement des images
const storage = multer.diskStorage({
    // Destination des fichiers
    destination: (req, file, callback) => {
        callback(null, 'images');
    },

    // Création du nom et de l'extension du fichier
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({ storage: storage }).single('image');
