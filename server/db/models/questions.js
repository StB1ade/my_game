'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Questions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Topics, { foreignKey: 'topic_id' });
      this.hasMany(models.CurrentQuestions, { foreignKey: 'question_id' });
    }
  }
  Questions.init({
    question: DataTypes.STRING,
    right_answer: DataTypes.STRING,
    score: DataTypes.INTEGER,
    topic_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Questions',
  });
  return Questions;
};