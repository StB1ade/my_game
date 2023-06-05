const router = require('express').Router();
const bcrypt = require('bcrypt');

const { Users } = require('../../db/models');

router.get('/check', async (req, res) => {
  if (req.session.user) {
    const userCheck = { id: req.session.user.id, userName: req.session.user.userName };
    res.json(userCheck);
  } else { res.json({ msg: 'Войдите в систему или зарегестрируйтесь!' }); }
});

router.post('/reg', async (req, res) => {
  const {
    userName, email, password,
  } = req.body;
  try {
    const userExistEmail = await Users.findOne({ where: { email } });
    if (userExistEmail) {
      res.json({ msg: 'Пользователь с таким Email уже существует!' });
    } else {
      const hashPassword = await bcrypt.hash(password, 10);
      const userReg = await Users.create({
        userName, email, password: hashPassword,
      });
      const user = userReg.get({ plain: true });
      req.session.user = user;
      const answerUserReg = { id: req.session.user.id, userName: req.session.user.userName };
      res.json(answerUserReg);
    }
  } catch (error) {
    console.log(error);
  }
});

router.post('/login', async (req, res) => {
  const {
    email, password,
  } = req.body;
  try {
    const userLog = await Users.findOne({ where: { email } });
    if (!userLog) {
      res.json({ msg: 'Пользователь с таким Email не зарегестрирован! Пожалуйста, зарегестрируйтесь.' });
    }
    const userData = userLog.get({ plain: true });
    if (userData) {
      const passwordChek = await bcrypt.compare(password, userData.password);
      if (!passwordChek) {
        res.json({ msg: 'Неверный пароль!' });
      }
      if (passwordChek) {
        req.session.user = userData;
        const answerUserLog = { id: req.session.user.id, userName: req.session.user.userName };
        res.json(answerUserLog);
      }
    }
  } catch (error) {
    console.log(error);
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('MyGame');
    res.sendStatus(200);
  });
  // res.json({ msg: 'Вы вышли!' });
});

module.exports = router;
