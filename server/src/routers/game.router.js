const router = require('express').Router();
const { CurrentQuestions } = require('../../db/models');
const { Questions } = require('../../db/models');
const { Topics } = require('../../db/models');

router.get('/new', async (req, res) => {
  try {
    const { user } = req.session;
    await CurrentQuestions.destroy({
      where: { user_id: user.id },
    });
    const questionArrDirty = await Questions.findAll();
    const questionArr = questionArrDirty.map((el) => el.get({ plain: true }));

    Promise.all(
      questionArr.map(async (el) => {
        await CurrentQuestions.create({
          user_id: user.id,
          question_id: el.id,
        });
      })
    );
    res.json({ msg: 'success' });
  } catch (error) {
    console.log(error);
  }
});

router.get('/questions', async (req, res) => {
  try {
    const { user } = req.session;
    // console.log('user=====>', user);
    const currQuestionsDirty = (
      await CurrentQuestions.findAll({
        where: { user_id: user.id },
        include: [
          {
            model: Questions,
            attributes: ['question', 'right_answer', 'score', 'topic_id'],
          },
        ],
      })
    ).map((el) => el.get({ plain: true }));

    // console.log('currQuestionsDirty', currQuestionsDirty);

    const currQuestions = currQuestionsDirty.map((el) => {
      el.question = el.Question.question;
      el.right_answer = el.Question.right_answer;
      el.score = el.Question.score;
      el.topic_id = el.Question.topic_id;
      delete el.Question;
      return el;
    });
    // console.log('currQuestions', currQuestions);

    const currQuestions2d = [];

    currQuestions.forEach((el) => {
      const repIndex = currQuestions2d.findIndex(
        (el2) => el2?.title === el.topic_id
      );
      if (repIndex === -1) {
        const topic = { title: el.topic_id, id: el.topic_id };
        topic.questions = [
          {
            id: el.question_id,
            question: el.question,
            right_answer: el.right_answer,
            score: el.score,
            answered: el.answered,
          },
        ];
        currQuestions2d.push(topic);
      } else {
        currQuestions2d[repIndex]?.questions.push({
          id: el.question_id,
          question: el.question,
          right_answer: el.right_answer,
          score: el.score,
          answered: el.answered,
        });
      }
    });
    // console.log('currQuestions2d======>', currQuestions2d);
    const topicsDirty = await Topics.findAll();
    const topics = topicsDirty.map((el) => el.get({ plain: true }));
    // console.log('topics======>', topics);

    const gameArr = currQuestions2d.map((el) => {
      const { title } = topics.find((el2) => el2.id === el.title);
      el.title = title;
      return el;
    });
    console.log('gameArr======>', gameArr);
    res.json({ gameArr });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
