const User = require('../../models/User/UserModel').User;

const register = async (req, res) => {

  try {
    
    // destructure name, email, and password from req.body object
    const { name, email, password } = req.body; 

    // check if email exists 
    const userExists = await User.findOne({ email });
    
    // throw error if user exists
    if (userExists) {
      res.sendStatus(400);
      throw new Error('Email already in use');
      
    }
    
    // if user does not exist, create user with body of request
    await User.create({
      name: name,
      email: email,
      password: password
    })
    
    // test response with name and email
    res.json({
      name,
      email
    })

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
      
      // success
      res.json({
        email: user.email,
        name: user.name
      })

    } else {
      
      // rejected
      res.sendStatus(400);
      throw new Error ('invalid credentials');
    
    }

  } catch (err) {

    console.log(err);

  }

}

module.exports = {
  register,
  login
}
