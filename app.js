const express = require('express');
const mongoose = require("mongoose");
const app = express();
const userRoutes = require('./routes/user.js');
const saucesRoutes = require('./routes/sauces.js');
const path = require('path');
require('dotenv').config();
app.use(express.json());
const sqlUser = process.env.SQL_USER;
const sqlPassword = process.env.SQL_PASSWORD;
mongoose.connect('mongodb+srv://sqlUser:sqlPassword@cluster0-pme76.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use((req, res) => {
    res.json({ message: 'Votre requête a bien été reçue !' });
});

app.use('/api/auth', userRoutes);
app.use("/api/sauces", saucesRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));
module.exports = app;