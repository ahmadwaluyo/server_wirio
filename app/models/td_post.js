'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class td_post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      td_post.belongsTo(models.td_user);
    }
  }
  td_post.init(
    {
      title: DataTypes.STRING,
      article: DataTypes.STRING,
      author: DataTypes.STRING,
      image_url: DataTypes.STRING,
      tags: DataTypes.STRING,
      tdUserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'td_post',
    }
  );
  return td_post;
};
