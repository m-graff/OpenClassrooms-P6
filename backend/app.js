// Importation du framework Node.JS Express
const express = require('express');

// Importation du package Mongoose pour faciliter les interactions avec notre base de données MongoDB
const mongoose = require('mongoose');

// Importation du package bodyParser
const bodyParser = require('body-parser');

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

const app = express();

// Connexion à la base de données MongoDB
mongoose.connect('mongodb+srv://Admin_P6:OpenClassrooms_P6_AdminCode@clusterp6.3kyh0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Ajout des headers permettant le Cross Origin Resource Sharing (CORS)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Accès autorisé pour tous
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // Accès autorisé sous certains en-têtes
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // Accès autorisé sous certaines méthodes
    next();
});

// Traitement des données via bodyParser
app.use(bodyParser.json());

app.use('/api/sauce', stuffRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;