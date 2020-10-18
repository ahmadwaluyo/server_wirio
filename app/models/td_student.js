'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class td_student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  td_student.init({
    nama: DataTypes.STRING,
    alamat: DataTypes.STRING,
    kelas: DataTypes.STRING,
    nama_wali: DataTypes.STRING,
    no_telp_wali: DataTypes.STRING,
    rekap_nilai: DataTypes.STRING,
    rekap_pembayaran: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'td_student',
  });
  return td_student;
};