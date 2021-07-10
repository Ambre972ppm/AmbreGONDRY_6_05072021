const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const path = require('path');

const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

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

app.use(bodyParser.json());
app.use(helmet());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;
