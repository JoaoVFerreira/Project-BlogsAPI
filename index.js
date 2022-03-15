const express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

const userRouter = require('./routes/userRouter');
const loginRouter = require('./routes/loginRouter');
const categoriesRouter = require('./routes/categoriesRouter');
const postRouter = require('./routes/postRouter');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(bodyParser.json());

app.use('/login', loginRouter);

app.use('/user', userRouter);

app.use('/categories', categoriesRouter);

app.use('/post', postRouter);

app.use(errorHandler);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
