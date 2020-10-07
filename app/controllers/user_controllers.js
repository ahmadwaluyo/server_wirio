const models = require('../models/index');
const { decrypt } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");

class UserController {
  static async getUser(req, res) {
    try {
      const data = await models.td_user.findAll({
        include: [{ model: models.td_post }],
      });
      res.status(200).json(data);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  }
  static async login(req, res) {
    try {
      const { username, password, email } = req.body;
      const data = await models.td_user.findOne({
        where: {
          username,
          email
        }
      })
      const payload = {
        id: data.dataValues.id,
        username: data.dataValues.username,
        fullname: data.dataValues.fullname,
        email: data.dataValues.email
      }
      const token = generateToken(payload)
      if(data) {
        let verify = decrypt(password, data.dataValues.password);
        if (verify) {
          res.status(200).json({
            token,
            payload
          }) 
        } else {
          res.status(400).json({
            error: 'Unauthorized user'
          })
        }
      } else {
        res.status(400).json({
          error: 'Invalid username/password/email'
        })
      }
    }
    catch (error) {
      console.log(error.message);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = UserController;
