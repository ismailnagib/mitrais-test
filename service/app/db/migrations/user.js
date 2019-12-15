const config = require('../../../config');
const schema = config.get('POSTGRES_SCHEMA');
const tableName = 'user';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(tableName, {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    mobileNumber: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    firstName: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    lastName: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    dateOfBirth: {
      allowNull: true,
      type: Sequelize.DATE,
    },
    gender: {
      allowNull: true,
      type: Sequelize.ENUM('MALE', 'FEMALE'),
    },
    email: {
      allowNull: false,
      type: Sequelize.STRING,
    }
  }, {
    schema,
  }),
  down: queryInterface => queryInterface.dropTable({ schema, tableName }),
};
