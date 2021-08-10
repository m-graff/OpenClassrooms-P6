// Importations
const express = require('express'); // permet de deployer rapidement l'API 
const mongoose = require('mongoose'); // facilite l'accès et les opérations liées à la base de données MongoDB
mongoose.set('useCreateIndex', true);
const helmet = require('helmet'); // sécurise notre application Express en ajoutant des en-têtes HTTP diverses
const bodyParser = require('body-parser'); // middleware express lisant l'entrée d'un formulaire, le stockant en tant qu'objet javascript accessible via req.body
const mongoSanitize = require('express-mongo-sanitize'); // middleware nettoyant les données utilisateur pour empêcher les attaques d'injection NoSQL
const apiLimiter = require("./middleware/limits-rate"); // middleware limitant les demandes répétées à l'API 
const path = require('path'); // module donnant accès au chemin du système de fichiers
const sauceRoutes = require('./routes/sauce'); // route sauce
const userRoutes = require('./routes/user'); // route user


// Importation du package dotenv sécurisant les informations sensibles liées à la base de donnnées MongoDB
require('dotenv').config();

// Création de l'application Express, sécurisée par le package Helmet via la définition d'en-têtes HTTP diverses 
const app = express();
app.use(helmet());

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

// Traitement des données via bodyParser rendant celles-ci exploitables
app.use(bodyParser.json());

// Data sanitization contre les injections NoSQL
app.use(mongoSanitize());

// Définition des différentes routes
app.use('/api/sauces', apiLimiter, sauceRoutes);
app.use('/api/auth', apiLimiter, userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

// Exportation de l'application
module.exports = app;
