const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

mongoose.connect('mongodb://localhost:27017/mestodb');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.user = {_id: '64c2b57f95a0a74cd12a02c2'};
  next();
});
app.use('/', usersRouter);
app.use('/', cardsRouter);
app.use((err, req, res, next) => {
  const {code=err.name=='ValidationError'?400:500, message} = err;
  res.status(code).send( {message} )
  next();
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
