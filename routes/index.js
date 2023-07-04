const express = require('express');
const router = express.Router();

const postRouter = require('./posts');
const commentRouter = require('./comments');
const userRouter = require('./users');

router.use('/posts', postRouter);
router.use('/comments', commentRouter);
router.use('/', userRouter);

module.exports = router;
