const successMessage = { status: 200, content: {} };
const errorMessage = { status: 500 };
const status = {
  success: 200,
  created: 201,
  ongoing: 202,
  bad: 400,
  unauthorize: 401,
  notFound: 404,
  unprocessable: 422,
  error: 500,
  badGateway: 502,
};

module.exports = { successMessage, errorMessage, status };
