const Joi = require('joi');
const models = require('../models/index');
const { errorMessage, successMessage, status } = require('../helpers/status');
const ErrorResponse = require('../helpers/errorResponse');

class PostControllers {
  static async createPost(req, res) {
    const body = req.body;
    const schema = Joi.object().keys({
      title: Joi.string().required().min(6).max(100),
      article: Joi.any(),
      author: Joi.string().required(),
      img_url: Joi.string().uri(),
      tags: Joi.string(),
      userid: Joi.number().required(),
    });

    let payload = {
      title: req.body.title,
      article: req.body.article,
      author: req.body.author,
      image_url: req.body.img_url,
      tags: req.body.tags,
      tdUserId: req.body.userid,
    };

    try {
      const validation = await schema.validateAsync(body);
      console.log(validation);
      const data = await models.td_post.create(payload);
      successMessage.status = 201;
      successMessage.content = data;
      res.status(status.created).json(successMessage);
    } catch (error) {
      console.error(error.message);
      errorMessage.message = error.message;
      res.status(status.error).json(errorMessage);
    }
  }

  static async getPosts(_, res) {
    try {
      const data = await models.td_post.findAll({});
      successMessage.content = data;
      res.status(status.success).json(successMessage);
    } catch (error) {
      console.error(error.message);
      errorMessage.message = error.message;
      res.status(status.error).json(errorMessage);
    }
  }

  static async getPostById (req, res, next) {
    const {id} = req.params;

    try {
      const data = await models.td_post.findAll({
        where: { id }
      });
      
      if (data.length === 0) return next(new ErrorResponse(`Not Found`, status.notFound));
      
      successMessage.content = data[0];
      res.status(status.success).json(successMessage);
    } catch (error) {
      console.error(error.message);
      errorMessage.message = error.message;
      res.status(status.error).json(errorMessage);
    }
  }

  static async updatePost (req, res) {
    const {id} = req.params;
    const payload = req.body;

    try {
      const data = models.td_post.update(payload, {
        where: { id },
        returning: true,
        plain: true
      });
      successMessage.content = data;
      res.status(status.success).json(successMessage);
    } catch (error) {
      console.error(error.message);
      errorMessage.message = error.message;
      res.status(status.error).json(errorMessage);
    }
  }

  static async deletePost (req, res) {
    const {id} = req.params;
    
    try {
      await models.td_post.destroy({
        where: {id}
      });
      successMessage.content = {};
      res.status(status.success).json(successMessage);
    } catch (error) {
      console.error(error.message);
      errorMessage.message = error.message;
      res.status(status.error).json(errorMessage);
    }
  }
}

module.exports = PostControllers;
