const express = require('express')
const mongoose = require('mongoose');

const app = express()

const cookieParser = require('cookie-parser')
const postRouter = require('./routes/posts');
const commentRouter = require('./routes/comments');
const userRouter = require('./routes/users');

// mongoose.connect("mongodb+srv://id:pw@cluster0.3tc0dmy.mongodb.net/sign?retryWrites=true")
mongoose.connect("mongodb://127.0.0.1:27017/hs_users")
const db = mongoose.connection
db.on("error", err => console.log(err));
db.once('open', () => console.log("db connected!"))

app.use(express.json());
app.use(cookieParser());
app.use('/posts', postRouter);
app.use('/comments', commentRouter);
app.use('/', userRouter);

app.listen(3000, () => {console.log('서버가 열렸어요!');});
