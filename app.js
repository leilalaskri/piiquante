const express = require('express');
const user = require('./models/user');
const sauces = require('./models/sauce');
const app = express();
const userRoutes = require('./routes/user');
const saucesRoutes = require('./routes/sauces');
app.use(express.json());
mongoose.connect('mongodb+srv://leila:<08061985tonneR.>@cluster0-pme76.mongodb.net/test?retryWrites=true&w=majority', {
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
app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);
module.exports = app;
const mongoose = require('mongoose');