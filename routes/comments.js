const express = require('express');
const router = express.Router();
const Comment = require('../schemas/comment');
const Post = require('../schemas/post');
const authMiddleware = require('../middlewares/auth-middleware');

// 댓글 목록 조회 API
router.get('/:postId', async (req, res) => {
  const { postId } = req.params;
  const comments = await Comment.find({ postId });
  const post = await Post.findOne({ _id: postId });
  try {
    if (!post)
      return res
        .status(404)
        .json({ errorMessage: '게시글이 존재하지 않습니다.' });

    const data = comments.map((comment) => {
      return {
        commentId: comment._id,
        userId: comment.userId,
        nickname: comment.nickname,
        comment: comment.comment,
      };
    });
    res.json({ data: data });
  } catch (err) {
    res.status(400).json({ errorMessage: '댓글 조회에 실패하였습니다.' });
  }
});

// 댓글 작성 API
router.post('/:postId', authMiddleware, async (req, res) => {
  const { postId } = req.params;
  const { userId, nickname } = res.locals.user;

  if (!req.body) {
    return res.json({ errorMessage: '데이터 형식이 올바르지 않습니다.' });
  }

  const { comment } = req.body;
  const post = await Post.findOne({ _id: postId });

  if (!post)
    return res
      .status(403)
      .json({ errorMessage: '게시글이 존재하지 않습니다.' });

  try {
    await Comment.create({
      postId,
      userId,
      nickname,
      comment,
    });
    res.json({ message: '댓글을 생성하였습니다.' });
  } catch (err) {
    res.status(400).json({ errorMessage: '댓글 작성에 실패하였습니다.' });
  }
});

// 댓글 수정 API
router.put('/:commentId', authMiddleware, async (req, res) => {
  const { commentId } = req.params;
  const { userId } = res.locals.user;
  const { comment } = req.body;

  const existComment = await Comment.findOne({ _id: commentId });

  if (userId !== existComment.userId) {
    return res
      .status(403)
      .json({ errorMessage: '댓글 수정의 권한이 존재하지 않습니다.' });
  }

  if (!existComment) {
    return res.json({ errorMessage: '댓글이 존재하지 않습니다.' });
  }

  try {
    await Comment.updateOne({ _id: commentId }, { $set: { comment: comment } });
    res.json({ messgae: '댓글을 수정하였습니다.' });
  } catch (err) {
    res.status(400).json({ errorMessage: '댓글 수정에 실패하였습니다.' });
  }
});

// 댓글 삭제 API
router.delete('/:commentId', authMiddleware, async (req, res) => {
  const { commentId } = req.params;
  const { userId } = res.locals.user;

  const comment = await Comment.findOne({ _id: commentId });

  if (userId !== comment.userId) {
    return res
      .status(403)
      .json({ errorMessage: '댓글 삭제 권한이 존재하지 않습니다.' });
  }

  if (!comment) {
    return res.json({ message: '댓글 조회에 실패하셨습니다.' });
  }

  try {
    await Comment.deleteOne({ _id: commentId });
    res.json({ message: '댓글을 삭제하였습니다.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
