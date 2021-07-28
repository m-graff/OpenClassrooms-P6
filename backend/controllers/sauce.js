// Importation du modèle de sauce
const Sauce = require('../models/sauce');

// Création d'une nouvelle sauce transformée en objet JS
exports.createSauce = (req, res, next) => {
    const sauceObjet = JSON.parse(req.body.sauce);
    delete sauceObject._id; // Suppression de l'id envoyé par le front
    const sauce = new Sauce ({ // Création du modèle de sauce
        ...sauceObject,
        imageUrl : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes
    })
    // Sauvegarde du modèle de sauce dans la base de données
    sauce.save() 
        .then(() => res.status(201).json({ message: 'Sauce enregistrées !' }))
        .catch(error => res.status(400).json({ error }));
};

// Modification d'une sauce
exports.modifySauce = (req, res, next) => {
    // Vérification avec l'opérateur ternaire s'il y a ou non modification du fichier image
    const sauceObject = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
        Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
            .catch(error => res.status(400).json({ error }));
};

// Suppression d'une sauce
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            // Récupération du fichier image à supprimer
            const filename = sauce.imageUrl.split('/images')[1];
            // Suppression du fichier image puis de la sauce
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};
