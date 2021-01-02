const models = require('../models/index');
const { errorMessage, status, successMessage } = require('../helpers/status');

class UserController {
  static async getUser(_, res) {
    try {
      const data = await models.td_user.findAll({
        include: [{ model: models.td_post }],
      });
      successMessage.content = data;
      res.status(status.success).json(successMessage);
    } catch (error) {
      console.error(error.message);
      errorMessage.message = error.message;
      res.status(status.error).json(errorMessage);
    }
  }
  static async deleteUserById(req, res) {
    const { id } = req.params;
    try {
      const deleted = await models.td_user.destroy({
        where: {
          id : id
        }
      })
      console.log(deleted)
    } catch (error) {
      console.log(error.message)
    }
  }
}

module.exports = UserController;
