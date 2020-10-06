const Joi = require('joi');
const models = require('../models/index');

class AuthControllers {
  static async register(req, res) {
    const body = req.body;
    const schema = Joi.object().keys({
      username: Joi.string().required().alphanum().min(6).max(16),
      email: Joi.string().email().lowercase().required(),
      password: Joi.string().min(7).required().strict(),
      confirmPassword: Joi.string()
        .valid(Joi.ref('password'))
        .required()
        .strict(),
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
      res.status(201).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ code: 500, error: error.message });
    }
  }
}

module.exports = AuthControllers;
