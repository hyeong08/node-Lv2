const express = require('express');
const cookieParser = require('cookie-parser');
const connect = require('./schemas/index')

const app = express();
const router = require('./routes');

require('dotenv').config();

connect();

app.use(express.json());
app.use(cookieParser());

app.use('/', router)

app.listen(process.env.PORT, () => {
  console.log('포트로 서버가 열렸어요!');
});

module.exports = router;
