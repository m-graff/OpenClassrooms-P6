// Importation du package express-rate-limit pour contrer les attaques de force brute en limitant le nombre d'essai de mot de passe
const rateLimit = require('express-rate-limit');

// Limitation du nombre de requêtes à l'API
const apiLimiter = rateLimit({
    windowMs: 2 * 60 * 1000,    // 2 minutes
    max: 100,                   // limite chaque adresse IP à 100 requêtes par windowMs
    message: 'Vous avez dépassé le nombre de tentatives de connexion, merci de réessayer plus tard !'
});

module.exports = apiLimiter;
