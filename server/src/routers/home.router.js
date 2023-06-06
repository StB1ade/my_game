const router = require('express').Router();
const { Results } = require('../../db/models');
const { Users } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const resultData = (await Results.findAll({
      order: [['total_score', 'DESC']],
      include: [
        {
          model: Users,
          attributes: ['userName'],
        }],
    })).map((el) => el.get({ plain: true }));
    // console.log(resultData);
    res.json(resultData);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
