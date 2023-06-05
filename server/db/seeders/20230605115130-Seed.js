/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Topics',
      [
        {
          title: 'Космос',
        },
        {
          title: 'Стихийные бедствия',
        },
        {
          title: 'Города России',
        },
        {
          title: 'Пиво',
        },
      ],
      {}
    );
    await queryInterface.bulkInsert(
      'Questions',
      [
        {
          question:
            'Какая планета известна под именем утренней или вечерней звезды?',
          right_answer: 'Венера',
          score: 100,
          topic_id: 1,
        },
        {
          question: 'Имя первой собаки-космонавта?',
          right_answer: 'Лайка',
          score: 200,
          topic_id: 1,
        },
        {
          question: 'В каком созвездии находится полярная звезда?',
          right_answer: 'Малая медведица',
          score: 300,
          topic_id: 1,
        },
        {
          question:
            'Как называется советский многоразовый космический корабль, по аналогу которого был построен Space Shuttle?',
          right_answer: 'Буран',
          score: 500,
          topic_id: 1,
        },
        {
          question:
            'Как называется самая мощная сверхтяжелая ракета, впервые запущенная 20 апреля 2023 года?',
          right_answer: 'Starship',
          score: 1000,
          topic_id: 1,
        },
        {
          question: 'Причиной этой катастрофы стал айсберг',
          right_answer: 'Титаник',
          score: 100,
          topic_id: 2,
        },
        {
          question: 'Какое стихийное явления измеряют по шкале Рихтера',
          right_answer: 'Землетрясение',
          score: 200,
          topic_id: 2,
        },
        {
          question: 'Если скорость ветра достигает 32 м / с, то это —',
          right_answer: 'Ураган',
          score: 300,
          topic_id: 2,
        },
        {
          question:
            'Этот контр – адмирал английского флота в 1806г. Предложил шкалу для оценки силы ветра. Моряки пользуются ею по ныне.',
          right_answer: 'Бофорт',
          score: 500,
          topic_id: 2,
        },
        {
          question: 'Где происходят самые мощные в мире снежные лавины?',
          right_answer: 'В Гималаях',
          score: 1000,
          topic_id: 2,
        },
        {
          question: 'Какой город в старину называли «третьим Римом»?',
          right_answer: 'Москва',
          score: 100,
          topic_id: 3,
        },
        {
          question: 'Город пряников, самоваров, гармошек и ружей',
          right_answer: 'Тула',
          score: 200,
          topic_id: 3,
        },
        {
          question:
            'В честь этой императрицы названы были многие города России, но их переименовали, а вот городу на Урале вернули свое прежнее название. Какое? ',
          right_answer: 'Екатеринбург',
          score: 300,
          topic_id: 3,
        },
        {
          question:
            'Какой древний российский город считается родиной Деда Мороза?',
          right_answer: 'Великий Устюг',
          score: 500,
          topic_id: 3,
        },
        {
          question:
            'Вид и герб какого города можно увидеть на российской купюре 1000  рублей?',
          right_answer: 'Ярославль',
          score: 1000,
          topic_id: 3,
        },
        {
          question: 'Какой самый популярный в мире напиток после воды и чая?',
          right_answer: 'Пиво',
          score: 100,
          topic_id: 4,
        },
        {
          question:
            'Какой алкогольный напиток, по мнению ученых Мюнхенского института, в 10 раз полезнее молока?',
          right_answer: 'Пиво',
          score: 200,
          topic_id: 4,
        },
        {
          question: 'В какой стране впервые начали варить пиво?',
          right_answer: 'Вавилон',
          score: 300,
          topic_id: 4,
        },
        {
          question: 'Как древние вавилоняне наказывали плохих пивоваров?',
          right_answer: 'Топили в пиве',
          score: 500,
          topic_id: 4,
        },
        {
          question: 'Как называется самое крепкое пиво в мире?',
          right_answer: 'Змеиный яд',
          score: 1000,
          topic_id: 4,
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      'CurrentQuestions',
      [
        {
          user_id: 1,
          question_id: 1,
        },
        {
          user_id: 1,
          question_id: 2,
        },
        {
          user_id: 1,
          question_id: 3,
        },
        {
          user_id: 1,
          question_id: 4,
        },
        {
          user_id: 1,
          question_id: 5,
        },
        {
          user_id: 1,
          question_id: 6,
        },
        {
          user_id: 1,
          question_id: 7,
        },
        {
          user_id: 1,
          question_id: 8,
        },
        {
          user_id: 1,
          question_id: 9,
        },
        {
          user_id: 1,
          question_id: 10,
        },
        {
          user_id: 1,
          question_id: 11,
        },
        {
          user_id: 1,
          question_id: 12,
        },
        {
          user_id: 1,
          question_id: 13,
        },
        {
          user_id: 1,
          question_id: 14,
        },
        {
          user_id: 1,
          question_id: 15,
        },
        {
          user_id: 1,
          question_id: 16,
        },
        {
          user_id: 1,
          question_id: 17,
        },
        {
          user_id: 1,
          question_id: 18,
        },
        {
          user_id: 1,
          question_id: 19,
        },
        {
          user_id: 1,
          question_id: 20,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Topics', null, {});
  },
};
