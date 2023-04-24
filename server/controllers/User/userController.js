const User = require('../../models/User/UserModel').User;

const register = async (req, res) => {
  console.log("Registering user");
  try {
    // destructure name, email, and password from req.body object
    const { name, email, password, confirmPassword } = req.body;

    // check if email exists 
    const userExists = await User.findOne({ email });

    // throw error if user exists
    if (userExists) {
      console.log("User already exists");
      return res.status(409).json({ error: 'An account with that email address already exists' });
    }

    // check if password and confirm password match
    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    // if user does not exist, create user with body of request
    const user = await User.create({
      name: name,
      email: email,
      password: password
    });

    // save user to database
    await user.save();

    // save user id in cookie session
    if (user) {
      req.session.user = user._id.toString();
      req.session.save(function (err) {
        if (err) {
          console.log("Session save error: " + err);
          return res.status(500).json({ error: err });
        }
        // success
        console.log("User registered: " + user.name + " with cookie: " + req.session.user);
        return res.status(201).json({
          name: user.name,
          email: user.email
        });
      })
    }

  } catch (err) {
    console.log("Registration error: " + err);
    return res.status(500).json({ error: 'Server error' });
  }
};

const login = async (req, res) => {
  try {
    // destructure email and password from req object
    const { email, password } = req.body;

    // find user by email
    const user = await User.findOne({ email });

    // check if user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // if user exists, call compare password method on user model with password from request
    if (await user.isValidPassword(password)) {
      // set user id in cookie
      req.session.user = user._id.toString();
      req.session.save(function (err) {
        if (err) return next(err)
        // success
        return res.json({
          name: user.name,
          email: user.email
        });
      })
    } else {
      // rejected
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

const getMe = async (req, res) => {
  try {
    if (req.session.user) {
      const user = await User.findById(req.session.user);

      if (user) {
        return res.json({
          name: user.name,
          email: user.email
        });
      } else {
        return res.status(404).json({ error: 'User not found' });
      }
    } else {
      return res.status(401).json({ error: 'Not authorized, please login again' });
    }
  } catch (err) {
    console.log("User info retrieval err: " + err);
  }
};

const logout = async (req, res) => {
  req.session.user = null;
  req.session.save(function (err) {
    if (err) next(err);
    req.session.regenerate(function (err) {
      if (err) next(err);
      res.redirect('/');
    })
  })
};

module.exports = {
  register,
  login,
  logout,
  getMe
};
