const express = require('express');
const mongoose = require("mongoose");
const app = express();
const userRoutes = require('./routes/user.js');
const saucesRoutes = require('./routes/sauces.js');
const rateLimit = require("express-rate-limit");
const path = require('path');
require('dotenv').config();
app.use(express.json());
const mongoUser = process.env.MONGODB_USER;
const mongoPassword = process.env.MONGODB_PASSWORD;
mongoose.connect(`mongodb+srv://${mongoUser}:${mongoPassword}@cluster0.cltbshu.mongodb.net/?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch((error) => {
        console.log('Connexion à MongoDB échouée !', error)
    });
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // Voici l’équivalent de 10 minutes
    max: 100 // Le client pourra donc faire 100 requêtes toutes les 10 minutes
});

//  Cette limite de 100 requêtes toutes les 10 minutes sera effective sur toutes les routes.
app.use(limiter);
app.use('/api/auth', userRoutes);
app.use("/api/sauces", saucesRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));
module.exports = app;