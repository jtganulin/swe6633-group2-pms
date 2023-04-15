const User = require('../../models/User/UserModel').User;

const register = async (req, res) => {

  try {
    
    // destructure name, email, and password from req.body object
    const { name, email, password, role } = req.body; 

    // check if email exists 
    const userExists = await User.findOne({ email });
    
    // throw error if user exists
    if (userExists) {
      res.sendStatus(400);
      throw new Error('Email already in use');
      
    }
    
    // if user does not exist, create user with body of request
    const user = await User.create({
      name: name,
      email: email,
      password: password,
      role: role
    })
    
    // save user id in cookie session
    if (user) {
      req.session.user = user._id.toString();
    } 

    // test response with name and Email
    res.sendStatus(201);

  } catch (err) {
    console.log(err);
  }

}

const login = async (req, res) => {

  try {
    // destructure email and password from req object
    const { email, password } = req.body;

    // find user by email
    const user = await User.findOne({ email });

    // check if user exists
    if (!user) {
      res.sendStatus(400);
      throw new Error ('User not found');
    }
    
    // if user exists, call compare password method on user model with password from request
    if (await user.isValidPassword(password)) {
      
      // set user id in cookie
      req.session.user = user._id.toString();

      // success
      res.sendStatus(200); 

    } else {
      
      // rejected
      res.sendStatus(400);
      throw new Error ('invalid credentials');
    
    }

  } catch (err) {

    console.log(err);

  }

}

const getMe = async (req, res) => {

  try {

    if (req.session.user) {
      const user = await User.findById(req.session.user);
      if (user) {
        res.json({
          name: user.name,
          email: user.email
        })
      }
      
      res.sendStatus(404);
      throw new Error('Not Authorized');
    } else {

      res.sendStatus(404);
      throw new Error('No cookie'); // change later

    }

  } catch(err) {

    console.log(err);
  
  }

}

module.exports = {
  register,
  login,
  getMe
}
