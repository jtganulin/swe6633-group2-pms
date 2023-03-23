const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();
const port = process.env.PORT;
connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/api/users', require('./routes/userRoutes'));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
})
