const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const session = require('express-session');
const cors = require('cors');
const MongoStore = require('connect-mongo');

const app = express();
const port = process.env.PORT;

connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors({
  credentials: true
}));
app.use(session({
  secret: 'coolprojectmanagementSystem',
  resave: false,
  saveUninitialized: false, // set to true in prod
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
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
