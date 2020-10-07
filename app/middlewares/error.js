const ErrorResponse = require('../helpers/errorResponse');
const { status, errorMessage } = require('../helpers/status');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  // log to console for dev
  console.error(err.stack);

  errorMessage.status = error.statusCode || status.error;
  errorMessage.message = error.message || 'An error occurred';
  res.status(errorMessage.status).json(errorMessage);
};

module.exports = errorHandler;
