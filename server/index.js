const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');

const app = express();
const port = process.env.PORT;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  credentials: true
}));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: (process.env.NODE_ENV === 'production'), // set to true in prod
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    mongoOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      family: 4,
      serverSelectionTimeoutMS: 2000
    },
  }, {
    collectionName: 'sessions',
    autoRemove: 'native'
  }),
  cookie: {
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24,
    expires: new Date(Date.now() + 3600000 * 24)
  }
}))

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
})
