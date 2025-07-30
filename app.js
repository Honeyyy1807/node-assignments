const express = require('express');
const path = require('path');
const User = require('./models/user');
const sequelize = require('./sequelize');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');

app.get('/users', async (req, res) => {
  await sequelize.sync(); 
  const users = await User.findAll({ raw: true });
  res.render('users', { users });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
