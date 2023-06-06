const router = require('express').Router();
const { Results } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const { user } = req.session;
    const resultData = await Results.findAll({
      where: { user_id: user.id, finished: true },
      order: [['createdAt', 'DESC']],
      raw: true,
    });
    // console.log(user);
    res.json(resultData);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
