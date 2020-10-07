const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../helpers/errorResponse');
const { status } = require('../helpers/status');
const models = require('../models');

// protect routes
exports.protects = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  // make sure token exists
  if (!token) {
    return next(new ErrorResponse('Unauthorize user', status.unauthorize));
  }

  // verify user
  try {
    const decode = await jwt.verify(token, process.env.SECRET);

    const { dataValues } = await models.td_user.findOne({
      where: {
        id: decode.id,
      },
    });
    req.user = dataValues;
    next();
  } catch (error) {
    return next(
      new ErrorResponse(
        'Not authorize to access this route',
        status.unauthorize
      )
    );
  }
});
