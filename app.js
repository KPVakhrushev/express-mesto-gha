const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const ErrorValidation = require('./errors/ErrorValidation');
const ErrorNotfound = require('./errors/ErrorNotfound');
const ErrorDefault  = require('./errors/ErrorDefault');


const { PORT = 3000, DB_CONNECTION='mongodb://localhost:27017/mydb' } = process.env;
mongoose.connect(DB_CONNECTION);


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.user = {_id: '74c2b57f95a0a74cd12a02c2'};
  next();
});
app.use('/', usersRouter);
app.use('/', cardsRouter);
app.use(() => {throw new ErrorNotfound('Страница не найдена')});
app.use((err, req, res, next) => {
  console.log("ERROR: ", err.message);
  if(!err.code){
    if(err.name=='CastError'){
      throw new ErrorValidation(err.message);
    }
    if(err.name=='ValidationError'){
      throw new ErrorValidation(err.message);
    }
    throw new ErrorDefault();
  }
  else next(err);
})
app.use((err, req, res, next) => {
  res.status(err.code).send( {message:err.message} )
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
