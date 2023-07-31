module.exports = class ErrorVlidation extends Error {
  code = 500;

  constructor(message) {
    super('На сервере произошла ошибка');
  }
};
