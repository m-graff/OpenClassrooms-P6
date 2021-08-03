// Importation du package password-validator
const passwordSchema = require('../models/password');

module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {
        res.writeHead(400, "! Mot de passe incorrect, veuillez respecter le schéma suivant : 8 caractères minimum, 1 majuscule, 2 chiffres !", {
            'content-type': 'application/json'
        });
        res.end('Mot de passe incorrect');
    } else {
        next();
    }
};