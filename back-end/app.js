const express = require('express');
const bodyParser = require('body-parser');// Permet d'extraire l'objet JSON de la requête
const mongoose = require('mongoose');

const path = require('path'); // donne accès au chemin de notre système de fichier

const helmet = require('helmet'); // package nous aide à sécuriser en definissant divers headers http
const rateLimit = require("express-rate-limit"); // pour limiter les requêtes répétées

const saucesRoutes = require('./routes/sauces'); // récupération des routes sauce
const userRoutes = require('./routes/user'); // récupération des routes user

// utilisation du module 'dotenv' pour masquer les informations de connexion à la base de données
require('dotenv').config();

mongoose.connect(`mongodb+srv://${process.env.DBUser}:${process.env.DBPassword}@${process.env.DBHost}?retryWrites=true&w=majority`,
{useNewUrlParser: true,
  useUnifiedTopology: true})
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {//middleware général, appliquer à toutes les routes à toutes les requêtes envoyées à notre serveur
    res.setHeader('Access-Control-Allow-Origin', '*');//tout le monde peux accéder à notre API
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');//on donne l'autorisation d'utiliser certains entêtes sur l'objet requête
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');//on autorise certaines méthodes
    next();//passer l'execution au prochain middleware
  });

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // Voici l’équivalent de 10 minutes
  max: 100 // Le client pourra donc faire 100 requêtes toutes les 10 minutes
});

app.use(bodyParser.json());
app.use(helmet());
app.use(limiter); // s'applique à toutes les requêtes
 
app.use('/images', express.static(path.join(__dirname, 'images')));// nous permet de charger les images dans le dossier images

app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;
