const Sequelize = require('sequelize');
const config = require('../../../config');

const CONNECTION_STRING = config.get('POSTGRES_CONNECTION_STRING');
const SCHEMA = config.get('POSTGRES_SCHEMA');

const params = {
  logging: false,
  dialect: 'postgres',
  operatorsAliases: Sequelize.Op,
  dialectOptions: {
    ssl: false,
  },
  schema: SCHEMA,
};

if (process.env.NODE_ENV === 'production') {
  params.ssl = true;
  params.dialectOptions = {
    ssl: true,
  };
}

const sequelize = new Sequelize(CONNECTION_STRING, params);

module.exports = sequelize;
