const httpCodes = require('../utils/constants');

module.exports = class ErrorValidation extends Error {
  constructor(message) {
    super(message);
    this.code = httpCodes.badRequest;
  }
};
