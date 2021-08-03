const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

const verifyPassword = require('../middleware/verifyPassword');

router.post('/signup', verifyPassword, userCtrl.signup); // Inscription
router.post('/login', userCtrl.login); // Connexion

module.exports = router;