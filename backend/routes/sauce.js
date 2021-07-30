// Création d'un routeur Express
const express = require('express')
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// Controleurs de nos routes sauce
const sauceCtrl = require('../controllers/sauce');

// Différentes routes 
router.post('/', auth, multer, sauceCtrl.createSauce); // Enregistrement d'une nouvelle sauce
router.put('/:id', auth, multer, sauceCtrl.modifySauce); // Modification d'une sauce
router.delete('/:id', auth, sauceCtrl.deleteSauce); // Suppression d'une sauce
router.get('/:id', auth, sauceCtrl.getOneSauce); // Récupération d'une sauce
router.get('/', auth, sauceCtrl.getAllSauces); // Récupération de la liste de toutes les sauces
router.post('/:id/like', auth, sauceCtrl.likeSauce); // Modification d'un like ou d'un dislike

module.exports = router;