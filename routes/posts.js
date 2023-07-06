const express = require('express');
const router = express.Router();
const Post = require('../schemas/post');
const authMiddleware = require('../middlewares/auth-middleware');

// 전체 게시글 조회 API
router.get('/', async (_, res) => {
  try {
    const posts = await Post.find().select('-content').sort().exec();
    const data = posts.map((post) => {
      return {
        postId: post._id,
        userId: post.userId,
        nickname: post.nickname,
        title: post.title,
      };
    });
    res.json({ data: data });
  } catch (err) {
    res.status(400).json({ message: '게시글 조회에 실패하였습니다.' });
  }
});

// 게시글 작성 API
router.post('/', authMiddleware, async (req, res) => {
  const { title, content } = req.body;
  const { userId, nickname } = res.locals.user;
  console.log(userId,nickname)
  try {
    await Post.create({ userId, nickname, title, content });
    res.json({ message: '게시글을 생성하였습니다.' });
  } catch (err) {
    res.status(400).json({ message: '게시글 작성에 실패하였습니다.' });
  }
});

// 게시글 상세조회 API
router.get('/:postId', async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await Post.findById({ _id: postId });
    const data = {
      postId: post._id,
      userId: post.userId,
      nickname: post.nickname,
      title: post.title,
      content: post.content,
    };
    res.json({ data: data });
  } catch (err) {
    res.status(400).json({ message: '게시글 조회에 실패하였습니다.' });
  }
});

// 게시글 수정 API
router.put('/:postId', authMiddleware, async (req, res) => {
  const { postId } = req.params;
  const { userId } = res.locals.user;
  const { title, content } = req.body;
  const post = await Post.findById({ _id: postId });
  try {
    if (userId !== post.userId) {
      return res.status(403).json({ errorMessage: '게시글 수정의 권한이 존재하지 않습니다.' });
    }
    await Post.updateOne({ _id: postId }, { $set: { title, content } });
    res.json({ message: '게시글을 수정하였습니다.' });
  } catch (err) {
    res.status(400).json({ message: '게시글 수정에 실패하였습니다.' });
  }
});

// 게시글 삭제 API
router.delete('/:postId', authMiddleware, async (req, res) => {
  const { postId } = req.params;
  const { userId } = res.locals.user;

  const post = await Post.findById({ _id: postId });

  if (!post) {
    return res.json({ messgae: '게시글이 존재하지 않습니다.' });
  }
  try {
    if (userId !== post.userId) {
      return res.status(403).json({ errorMessage: '게시글 수정의 권한이 존재하지 않습니다.' });
    }
    await Post.deleteOne({ _id: postId });
    res.json({ messgae: '게시글을 삭제하였습니다.' });
  } catch (err) {
    res.status(400).json({ message: '게시글 삭제에 실패하였습니다.' });
  }
});

module.exports = router;
