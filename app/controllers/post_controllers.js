const Joi = require('joi');
const models = require('../models/index');

class PostControllers {
  static async createPost(req, res) {
    const body = req.body;
    const schema = Joi.object().keys({
      title: Joi.string().required().min(6).max(30),
      article: Joi.required(),
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
      await schema.validateAsync(body);
      const data = await models.td_post.create(payload);
      res.status(201).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ code: 500, error: error.message });
    }
  }

  static async getPosts(_, res) {
    try {
      const data = await models.td_post.findAll({});
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ code: 500, error: error.message });
    }
  }
}

module.exports = PostControllers;
