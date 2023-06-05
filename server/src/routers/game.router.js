const router = require('express').Router();
const { CurrentQuestions } = require('../../db/models');
const { Questions } = require('../../db/models');
const { Topics } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const { user } = req.session;
    const currQuestionsDirty = (
      await CurrentQuestions.findAll({
        where: { user_id: user.id },
        order: [['score', 'ASC']],
        include: [
          {
            model: Questions,
            attributes: ['question', 'right_answer', 'score', 'topic_id'],
          },
        ],
      })
    ).map((el) => el.get({ plain: true }));

    const currQuestions = currQuestionsDirty.map((el) => el.Questions);

    const currQuestions2d = [];

    currQuestions.forEach((el) => {
      const repIndex = currQuestions2d.find((el2) => el2.title === el.topic_id);
      if (repIndex === -1) {
        const topic = { title: el.topic_id };
        topic.questions = [
          {
            question: el.question,
            right_answer: el.right_answer,
            score: el.score,
          },
        ];
      } else {
        currQuestions2d[repIndex].questions.push({
          question: el.question,
          right_answer: el.right_answer,
          score: el.score,
        });
      }
    });
    const topicsDirty = await Topics.findAll();
    const topics = topicsDirty.map((el) => el.get({ plain: true }));

    const gameArr = currQuestions2d.map((el) => {
      const title = topics.find((el2) => el2.id === el.title);
      el.title = title;
      return el;
    });

    res.json(gameArr);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
