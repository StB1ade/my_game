require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const expressSession = require('express-session');
const FileStore = require('session-file-store')(expressSession);
const gameRouter = require('./src/routers/game.router');

const UserApiRoter = require('./src/routers/UserApiRouter');

const profileRouter = require('./src/routers/profile.router');
const homeRouter = require('./src/routers/home.router');

const sessionConfig = {
  name: 'MyGame',
  store: new FileStore(), // добавить после установки session-file-store
  secret: process.env.COOKIE_SECRET || 'sometext',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 10 * 60 * 1000, // устанавливаем сколько живет кука
    httpOnly: false,
  },
};

const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true,
}));

app.use(expressSession(sessionConfig));

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public/')));

app.use('/', homeRouter);

app.use('/game', gameRouter);

app.use('/userapi', UserApiRoter);

app.use('/profile', profileRouter);

app.listen(PORT, () => console.log(`Сервер крутится на ${PORT} порту!`));
