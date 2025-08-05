const express = require('express');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const sequelize = require('./sequelize');
require('dotenv').config();
require('./auth/googleStrategy');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


app.use('/auth', authRoutes);


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/dashboard', isLoggedIn, (req, res) => {
  res.send(`<h1>Hello, ${req.user.username}</h1> <a href="/auth/logout">Logout</a>`);
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/');
}

sequelize.sync({ alter: true }).then(() => {
  app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
  });
});
