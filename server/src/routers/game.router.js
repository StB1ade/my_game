const router = require('express').Router();
const { CurrentQuestions } = require('../../db/models');
const { Questions } = require('../../db/models');
const { Topics } = require('../../db/models');
const { Results } = require('../../db/models');

router.get('/new', async (req, res) => {
  try {
    const { user } = req.session;
    await CurrentQuestions.destroy({
      where: { user_id: user.id },
    });
    await Results.destroy({ where: { user_id: user.id, finished: false } });
    await Results.create({ user_id: user.id });

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
    res.json({ newGame: true });
  } catch (error) {
    console.log(error);
  }
});

router.get('/questions', async (req, res) => {
  try {
    const { user } = req.session;
    // console.log('user=====>', user);
    const continueGame = await CurrentQuestions.findOne({
      where: { answered: false },
    });

    if (continueGame) {
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
              id: el.id,
              questionId: el.question_id,
              question: el.question,
              right_answer: el.right_answer,
              score: el.score,
              answered: el.answered,
            },
          ];
          currQuestions2d.push(topic);
        } else {
          currQuestions2d[repIndex]?.questions.push({
            id: el.id,
            questionId: el.question_id,
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
      // console.log('gameArr======>', gameArr);

      res.json({ gameArr });
    } else {
      res.json({ endGame: true });
    }
  } catch (error) {
    console.log(error);
  }
});

router.put('/questions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req.session;
    const { answer, questionId } = req.body;
    const result = await Results.findOne({
      where: { user_id: user.id, finished: false },
      plain: true,
    });

    const question = await Questions.findOne({
      where: { question_id: questionId },
      plain: true,
    });

    if (
      question.right_answer.toLowerCase().split(' ').join('') ===
      answer.toLowerCase().split(' ').join('')
    ) {
      result.score += question.score;
    } else {
      result.score -= question.score;
    }

    await Results.update(
      {
        total_score: result.score,
      },
      {
        where: {
          user_id: user.id,
          finished: false,
        },
      }
    );

    await CurrentQuestions.update(
      {
        answered: true,
      },
      {
        where: {
          user_id: user.id,
          id,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
