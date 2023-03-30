const bcrypt = require('bcrypt');
const Korisnik = require('./model/korisnik');

export const login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    // Find user in database
    const user = await Korisnik.findOne({ username });

    // If user not found, return error
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Compare password hashes
    const match = await bcrypt.compare(password, user.password_hash);

    // If password is incorrect, return error
    if (!match) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Set session data
    req.session.user = {
      id: user._id,
      username: user.username,
      role: user.role
    };

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  login
};