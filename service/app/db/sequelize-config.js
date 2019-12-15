const config = require('../../config');

module.exports = {
  development: {
    url: config.get('POSTGRES_CONNECTION_STRING'),
    dialect: 'postgres',
    dialectOptions: {
      ssl: false,
    },
    migrationStorageTableSchema: config.get('POSTGRES_SCHEMA'),
  },
  test: {
    url: config.get('POSTGRES_CONNECTION_STRING'),
    dialect: 'postgres',
    dialectOptions: {
      ssl: false,
    },
    migrationStorageTableSchema: config.get('POSTGRES_SCHEMA'),
  },
  production: {
    url: config.get('POSTGRES_CONNECTION_STRING'),
    dialect: 'postgres',
    dialectOptions: {
      ssl: false,
    },
    migrationStorageTableSchema: config.get('POSTGRES_SCHEMA'),
  },
};
