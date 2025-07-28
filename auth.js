
const bcrypt = require('bcrypt');
const User = require('./models/user');
const sequelize = require('./sequelize');
const SALT_ROUNDS = 10;

async function init() {
  await sequelize.sync(); 
}

async function signup(username, password) {
  await init();
  const existingUser = await User.findOne({ where: { username } });

  if (existingUser) {
    console.log('Username already exists.');
    return;
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  await User.create({ username, password: hashedPassword });
  console.log('Signup successful!');
}

async function login(username, password) {
  await init();
  const user = await User.findOne({ where: { username } });

  if (!user) {
    console.log('User not found.');
    return;
  }

  const match = await bcrypt.compare(password, user.password);
  if (match) {
    console.log('Login successful!');
  } else {
    console.log('Incorrect password.');
  }
}

module.exports = { signup, login };
