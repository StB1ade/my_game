'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Topics extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Questions, { foreignKey: 'topic_id' });
    }
  }
  Topics.init({
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Topics',
  });
  return Topics;
};