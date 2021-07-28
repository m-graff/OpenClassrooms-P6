const bcrypt = require('bcrypt');

const User = require('../models/User');


// Enregistrement de nouveaux utilisateurs
exports.signup = (req, res, next) => {
    // Hashage du mot de passe via Bcrypt (10 passages)
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User ({
                email: req.body.email,
                password: hash
            });
            // Sauvegarde du nouvel utilisateurs dans la base de données
            user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};


// Connexion d'utilisateurs existants
exports.login = (req, res, next) => {
    // Recherche de l'utilisateur via son mail
    User.findOne({ email: req.body.email })
      .then(user => {
        // Si l'utilisateur n'a pas été trouvé, envoi d'un message d'erreur
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        // Utilisation de bcrypt pour comparer le hashage du mot de passe
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            // Si le mot de passe ne correspond pas, envoi d'un message d'erreur
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            // Si le mot de passe correspond, attribution d'un token d'identification d'une durée de 24h
            res.status(200).json({
              userId: user._id,
              token: 'TOKEN'
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };