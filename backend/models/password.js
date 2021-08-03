// Middleware de validation de mot de passe
const passwordValidator = require('password-validator');

// Création d'un schéma de sécurité
const passwordSchema = new passwordValidator();

// Ajout de conditions qui seront vérifiées à la création du mot de passe
passwordSchema
.is().min(8)            // Minimum de 8 caractères
.is().max(100)          // Maximum de 100 caractères
.has().uppercase()      // Présence d'une lettre majuscule
.has().lowercase()      // Présence d'une lettre minuscule
.has().digits(2)        // Présence d'au moins 2 chiffres
.has().not().spaces()   // Ne contient aucun espace
.is().not().oneOf(['Passw0rd', 'Password123']);     // Interdit ces valeurs

module.exports = passwordSchema;