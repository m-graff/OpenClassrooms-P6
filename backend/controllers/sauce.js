// Importation du modèle de sauce
const Sauce = require('../models/sauce');

// Importation de la fonction fs permettant de supprimer un fichier
const fs = require('fs');

// Création d'une nouvelle sauce transformée en objet JS
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
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

// Récupération d'une sauce
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};

// Récupération de toutes les sauces 
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};

// Logique de likes et dislikes des sauces
exports.likeSauce = (req, res, next) => {
    switch (req.body.like) {

        // Cas de figure où l'utilisateur n'a pas déjà liké la sauce
        case 0:
            Sauce.findOne({ _id: req.params.id })
                .then((sauce) => {
                    if (sauce.usersLiked.find( user => user === req.body.userId)) {
                        Sauce.updateOne({ _id: req.params.id }, {
                            $inc: { likes: -1 },
                            $pull: { usersLiked: req.body.userId }
                        })
                        .then(() => res.status(201).json({ message: 'Like enregistré !'}))
                        .catch(error => res.status(400).json({ error }));
                    }

                    // Cas de figure où l'utilisateur n'a pas déjà disliké la sauce
                    else if (sauce.usersDisliked.find(user => user === req.body.userId)) {
                        Sauce.updateOne({ _id: req.params.id }, {
                            $inc: { dislikes: -1 },
                            $pull: { usersLiked: req.body.userId }
                        })
                        .then(() => res.status(201).json({ message: 'Dislike enregistré !'}))
                        .catch(error => res.status(400).json({ error }));
                    }
                })
                .catch(error => res.status(404).json({ error }));
            break;

        // Modifications likes - dislikes
        case 1: 
            Sauce.updateOne({ _id: req.params.id }, {
                $inc: { likes: 1 },
                $push: { usersLiked: req.body.userId }
            })
                .then(() => res.status(201).json({ message: 'Like enregistré !'}))
                .catch(error => res.status(400).json({ error }));
            break;

        case -1:
            Sauce.updateOne({ _id: req.params.id }, {
                $inc: { dislikes: 1 },
                $push: { usersDisliked: req.body.userId }
            })
                .then(() => res.status(201).json({ message: 'Dislike enregistré !'}))
                .catch(error => res.status(400).json({ error }));
            break;
        default: 
            console.error('Oups, une erreur est intervenue !');
    }
};