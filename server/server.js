require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const path = require('path');

const expressSession = require('express-session');
const FileStore = require('session-file-store')(expressSession);

const sessionConfig = {
  name: 'Name',
  store: new FileStore(), // добавить после установки session-file-store
  secret: process.env.COOKIE_SECRET || 'some text',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 10 * 60 * 1000, // устанавливаем сколько живет кука
    httpOnly: false,
  },
};

const PORT = process.env.PORT || 3001;
const app = express();

app.use(expressSession(sessionConfig));

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public/')));

app.listen(PORT, () => console.log(`Сервер крутится на ${PORT} порту!`));