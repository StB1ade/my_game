'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Results extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Users, { foreignKey: 'user_id' });
    }
  }
  Results.init({
    total_score: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    finished: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Results',
  });
  return Results;
};