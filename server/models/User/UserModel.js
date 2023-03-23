const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  // give userSchema a name
  name: {
    type: String,
    required: [true, 'Please add a valid name']
  },

  // give userSchema an email
  email: {
    type: String,
    required: [true, 'Please add a valid Email'],
    unique: true
  },

  // give userSchema a password
  password: {
    type: String,
    required: [true, 'Please a valid password']
  }

})

// middleware that runs before a user is saved
userSchema.pre('save', async function(next) {
  
  // if password is not modified, call next() and continue
  if (!this.isModified('password')) {
    // return next so that code below condition does not run
    return next();
  }
  
  // if password is modified, hash password
  
  // create salt with 10 rounds
  const salt = await bcrypt.genSalt(10);
  
  // hash the password with the salt
  const hash = await bcrypt.hash(this.password, salt);
  
  // store the value of hash with the password
  this.password = hash;

  // after password is hashed, call next function
  next();

})

// compare password param to hashed password stored in db, return true or false
// gives method to userSchema object
userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
}

// create a user model with the name User
const User = mongoose.model('User', userSchema);

// export schema for embedding, and model for query
module.exports = {
  userSchema,
  User
}

