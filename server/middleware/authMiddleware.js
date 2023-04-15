const mongoose = require('mongoose');
const User = require('../models/User/UserModel').User;

const protect = async (req, res, next) => {
  
  if (req.session.user) {
    
    const { user } = req.session;

    req.user = await User.findById(new mongoose.Types.ObjectId(user)).select('-password').exec();

    return next();
  }

  res.status(401).json({ error: 'Not authorized, please login to access this resource' });

}

const admin = async (req, res, next) => {

  if (req.user && req.user.role === 'Project-Manager') {
    return next();
  }

  res.sendStatus(401);

}

module.exports = {
  protect,
  admin
};
