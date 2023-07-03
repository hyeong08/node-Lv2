// const express = require('express');
// const router = express.Router();
// const Post = require('../schemas/post');

// // 전체 게시글 조회 API
// router.get('/', async (req, res) => {
//   try {
//     const posts = await Post.find().select(['-password', '-content']);
//     res.json({ data: posts });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // 게시글 작성 API
// router.post('/', async (req, res) => {
//   const { user, title, content, password } = req.body;
//   try {
//     const post = await Post.create({ user, title, content, password });
//     res.json({ message: '게시글을 생성하였습니다.' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // 게시글 상세조회 API
// router.get('/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     const post = await Post.findById(id).select(['-password']);
//     res.json({ data: post });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // 게시글 수정 API
// router.put('/:id', async (req, res) => {
//   const { id } = req.params;
//   if (!req.body || !id) {
//     return res.json({ message: '데이터 형식이 올바르지 않습니다.' });
//   }

//   const { title, content, password } = req.body;
//   const post = await Post.findById(id);
//   if (!post) {
//     return res.json({ message: '게시글 조회에 실패했습니다.' });
//   }
//   const isPasswordCorrect = post.password === password;

//   if (isPasswordCorrect) {
//     if (title) {
//       post.title = title;
//     }
//     if (content) {
//       post.content = content;
//     }
//     if (password) {
//       post.password = password;
//     }

//     try {
//       const updatedPost = await post.save();
//       res.json({ message: '게시글을 수정하였습니다.' });
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   } else {
//     res.status(401).json({ message: '비밀번호가 틀렸습니다.' });
//   }
// });

// // 게시글 삭제 API
// router.delete('/:id', async (req, res) => {
//   const { id } = req.params;
//   const { password } = req.body;

//   const post = await Post.findById(id);

//   if (!post) {
//     return res.json({ messgae: '게시글 조회에 실패했습니다.' });
//   }

//   const isPasswordCorrect = post.password === password;

//   if (isPasswordCorrect) {
//     try {
//       await post.deleteOne({ id });
//       // post.remove(); 적용이 되지않아서 deleteOne으로 바꿈
//       res.json({ messgae: '게시글을 삭제하였습니다.' });
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   } else {
//     res.status(401).json({ message: '비밀번호가 틀렸습니다.' });
//   }
// });

// module.exports = router;
