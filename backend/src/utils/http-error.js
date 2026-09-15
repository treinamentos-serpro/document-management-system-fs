// Cria erros com statusCode para serem tratados pelo middleware central em app.js.
function createHttpError(message, statusCode) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

module.exports = { createHttpError };
