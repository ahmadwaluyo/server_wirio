'use strict';
const { encrypt } = require("../helpers/bcrypt");
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class td_user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      td_user.hasMany(models.td_post);
    }
  }
  td_user.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      fullname: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'td_user',
      hooks: {
        beforeCreate: (td_user, options) => {
          td_user.password = encrypt(td_user.password);
        }
      }
    }
  );
  return td_user;
};
