const models = require('../models/index');

class UserController {
  static async getUser(req, res) {
    try {
      const data = await models.td_user.findAll({
        include: [{ model: models.td_post }],
      });
      res.status(200).json(data);
    } catch (error) {
      console.error(error.message);
      res.status(50).json({ error: error.message });
    }
  }
}

module.exports = UserController;
