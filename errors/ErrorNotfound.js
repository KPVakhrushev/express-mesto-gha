const httpCodes = require('../utils/constants');

module.exports = class ErrorNotfound extends Error {
  constructor(message) {
    super(message);
    this.code = httpCodes.notfound;
  }
};
