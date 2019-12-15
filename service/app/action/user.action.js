const { user } = require('../db/models/Postgres');

const getUser = async (parameter = {}, projection = {}, option = {}) => {
  try {
    const data = await user.findAll(parameter, projection, option);
    return data;
  } catch (err) {
    throw err;
  }
};

const createUser = async (parameter = {}) => {
  try {
    const data = await user.create(parameter);
    return data;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getUser,
  createUser,
};
