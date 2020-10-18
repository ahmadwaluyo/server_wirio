'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('td_students', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama: {
        type: Sequelize.STRING
      },
      alamat: {
        type: Sequelize.STRING
      },
      kelas: {
        type: Sequelize.STRING
      },
      nama_wali: {
        type: Sequelize.STRING
      },
      no_telp_wali: {
        type: Sequelize.STRING
      },
      rekap_nilai: {
        type: Sequelize.STRING
      },
      rekap_pembayaran: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('td_students');
  }
};