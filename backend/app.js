// IMPORTS // 
const express = require('express');
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const bodyParser = require('body-parser');
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');
const apiLimiter = require("./middleware/limits-rate");
const path = require('path');

// Importation du package dotenv
require('dotenv').config();

// Connexion à la base de données MongoDB
mongoose.connect(`mongodb+srv://${process.env.ID}:${process.env.PASS}@clusterp6.3kyh0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

// Ajout des headers permettant le Cross Origin Resource Sharing (CORS)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Accès autorisé pour tous
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // Accès autorisé sous certains en-têtes
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // Accès autorisé sous certaines méthodes
  next();
});

// Traitement des données via bodyParser
app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', apiLimiter, sauceRoutes);
app.use('/api/auth', apiLimiter, userRoutes);

module.exports = app;



/*
// Importation du package dotenv
require('dotenv').config();

// Importation du framework Node.JS Express
const express = require('express');
const app = express();

// Importation du package Mongoose pour faciliter les interactions avec notre base de données MongoDB
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

// Importation du package bodyParser
const bodyParser = require('body-parser');

const path = require('path');

// Importation du package express-rate-limit pour contrer les attaques de force brute en limitant le nombre d'essai de mot de passe
const apiLimiter = require('./middleware/limits-rate');

// Connexion à la base de données MongoDB
mongoose.connect(`mongodb+srv://${process.env.ID}:${process.env.PASS}@clusterp6.3kyh0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
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

app.use('/images', express.static(path.join(__dirname, 'images')));

// Routes
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

app.use('/api/sauces', apiLimiter, sauceRoutes);
app.use('/api/auth', apiLimiter, userRoutes);

module.exports = app;
*/