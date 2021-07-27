// Importation du framework Node.JS Express
const express = require('express');

// Importation du package Mongoose pour faciliter les interactions avec notre base de données MongoDB
const mongoose = require('mongoose');

const bodyParser = require('body-parser');

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




app.use((req, res, next) => {
    console.log('Requête reçue !');
    next();
});

app.use((req, res, next) => {
    res.status(201);
    next();
})

app.use((req, res, next) => {
    res.json({ message : 'Vore requête a bien été reçue !'});
    next();
});

app.use((req, res) => {
    console.log('Réponse envoyée ave succès !');
});

module.exports = app;