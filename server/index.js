const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const path = require('path');
/* const https = require('https');
const fs = require('fs'); */

const app = express();
const port = process.env.PORT;
const allowedOrigins = ["http://localhost:3000"];

connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: allowedOrigins,
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
    // sameSite: 'none',
    // secure: true,
    // domain: '127.0.0.1',
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24,
    expires: new Date(Date.now() + 3600000 * 24)
  }
}))

// Output info on the incoming request
app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.url}`);
  console.log(`Session: ${req.session.user}`)
  console.log(`Cookies: ${req.cookies}`)
  console.log(`Body: ${JSON.stringify(req.body)}`)
  res.header('Access-Control-Allow-Origin', allowedOrigins);
  next();
});

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));

// Serve static assets in production
/* app.use(express.static(path.join(__dirname, '../client/build')));
app.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
}); */

/* const httpsOptions = {
  key: fs.readFileSync('./server/security/cert.key'),
  cert: fs.readFileSync('./server/security/cert.pem')
} */
/* const server = https.createServer(httpsOptions, app)
  .listen(port, () => {
    console.log('server running at ' + port)
  }); */

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
