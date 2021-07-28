// Importation de mongoose ainsi que du plugin unique-validator
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Schéma des informations utilisateurs à stocker
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true }, 
    password: { type: String, required: true }
})

// Application du plugin unique-validator permettant de nous assurer d'avoir un unique utilisateur pour une adresse mail
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('user', userSchema);