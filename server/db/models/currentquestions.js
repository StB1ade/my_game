'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CurrentQuestions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Users, { foreignKey: 'user_id' });
      this.belongsTo(models.Questions, { foreignKey: 'question_id' });
    }
  }
  CurrentQuestions.init(
    {
      user_id: DataTypes.INTEGER,
      question_id: DataTypes.INTEGER,
      answered: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'CurrentQuestions',
    }
  );
  return CurrentQuestions;
};
