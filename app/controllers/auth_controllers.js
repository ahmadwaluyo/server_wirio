const Joi = require('joi');
const models = require('../models/index');
const { decrypt } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');
const { errorMessage, successMessage, status } = require('../helpers/status');

class AuthControllers {
  static async register(req, res) {
    const body = req.body;
    const schema = Joi.object().keys({
      username: Joi.string().required().alphanum().min(6).max(16),
      email: Joi.string().email().lowercase().required(),
      password: Joi.string().min(7).required().strict(),
      fullname: Joi.string().required(),
      role: Joi.string(),
    });

    let payload = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      fullname: req.body.fullname,
      role: req.body.role || 'wali_santri',
    };

    try {
      await schema.validateAsync(body);
      const data = await models.td_user.create(payload);
      successMessage.status = status.created;
      successMessage.content = data;
      res.status(status.created).json(successMessage);
    } catch (error) {
      console.error(error.message);
      errorMessage.message = error.message;
      res.status(status.error).json(errorMessage);
    }
  }

  static async login(req, res) {
    try {
      const { username, password, email } = req.body;
      const data = await models.td_user.findOne({
        where: {
          username,
          email,
        },
      });

      if (!data) {
        errorMessage.status = status.bad;
        errorMessage.message = 'Invalid credential';
        return res.status(status.bad).json(errorMessage);
      }

      const payload = {
        id: data.dataValues.id,
        username: data.dataValues.username,
        fullname: data.dataValues.fullname,
        email: data.dataValues.email,
        role: data.dataValues.role,
      };
      const token = generateToken(payload);
      if (data) {
        let verify = decrypt(password, data.dataValues.password);
        if (verify) {
          successMessage.message = 'login successfuly';
          successMessage.content = { ...payload, token };
          res.status(status.success).json(successMessage);
        } else {
          errorMessage.status = status.unauthorize;
          errorMessage.message = 'Unauthorized user';
          res.status(status.unauthorize).json(errorMessage);
        }
      } else {
        errorMessage.status = status.bad;
        errorMessage.message = 'Invalid credential';
        res.status(status.bad).json(errorMessage);
      }
    } catch (error) {
      console.error(error.message);
      errorMessage.message = error.message;
      res.status(status.error).json(errorMessage);
    }
  }
}

module.exports = AuthControllers;
