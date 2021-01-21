const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const helmet = require('helmet');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const saucesRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');
const app = express();

app.use(helmet());
app.use(cors());

mongoose.connect(process.env.MONGO_URI,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.ORIGIN || "*");
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
  });

app.use(bodyParser.json());
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;