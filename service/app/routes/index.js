const result = require('lodash/result');
const joi = require('@hapi/joi');
const userAction = require('../action/user.action');

const register = async (req, res) => {
  try {
    const validator = joi.object({
      mobileNumber: joi.string().required(),
      firstName: joi.string().required(),
      lastName: joi.string().required(),
      dateOfBirth: joi.string().required(),
      gender: joi.string().valid('MALE', 'FEMALE').required(),
      email: joi.string().required(),
    });

    const { error: validationError } = validator.validate(req.body);

    if (validationError) {
      const error = {
        success: false,
        message: result(validationError, 'details[0].message', 'Missing required parameter') + ' in request body',
      }

      return res.status(400).json(error);
    };

    const {
      mobileNumber,
      firstName,
      lastName,
      dateOfBirth,
      gender,
      email
    } = req.body;

    const mobileNumberDuplicate = await userAction.getUser({ where: { mobileNumber } });

    if (mobileNumberDuplicate.length > 0) {
      const error = {
        success: false,
        message: 'Mobile number has been registered before'
      }

      return res.status(400).json(error);
    }

    const emailDuplicate = await userAction.getUser({ where: { email } });

    if (emailDuplicate.length > 0) {
      const error = {
        success: false,
        message: 'Email has been registered before'
      }

      return res.status(400).json(error);
    }

    const parameter = {
      mobileNumber,
      firstName,
      lastName,
      dateOfBirth,
      gender,
      email
    };

    const data = await userAction.createUser(parameter);
    const response = {
      success: true,
      data,
    };

    return res.status(200).json(response);
  } catch (err) {
    const message = result(err, 'error.errors.message', err.message || String(err));
    const error = {
      success: false,
      message,
    };

    return res.status(500).json(error);
  }
};

const login = async (req, res) => {
  try {
    const validator = joi.object({
      mobileNumber: joi.string().required(),
      email: joi.string().required(),
    });

    const { error: validationError } = validator.validate(req.body);

    if (validationError) {
      const error = {
        success: false,
        message: result(validationError, 'details[0].message', 'Missing required parameter') + ' in request body',
      }

      return res.status(400).json(error);
    };

    const {
      mobileNumber,
      email
    } = req.body;

    const parameter = {
      where: {
        mobileNumber,
        email,
      }
    };

    const data = await userAction.getUser(parameter);

    if (data.length < 1) {
      const error = {
        success: false,
        message: 'Wrong mobile number and/or email'
      }

      return res.status(400).json(error);
    }

    const response = {
      success: true,
      data: result(data, '[0]', {}),
    };

    return res.status(200).json(response);
  } catch (err) {
    const message = result(err, 'error.errors.message', err.message || String(err));
    const error = {
      success: false,
      message,
    };

    return res.status(500).json(error);
  }
};

module.exports = (router) => {
  router.get('/ping', (req, res) => res.status(200).json({ message: 'Pong!' }));
  router.post('/register', register);
  router.post('/login', login);
};
