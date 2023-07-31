const { httpCodes } = require('../utils/constants');

module.exports = class ErrorVlidation extends Error {
  constructor(message = 'На сервере произошла ошибка') {
    super(message);
    this.code = httpCodes.serverError;
  }
};
