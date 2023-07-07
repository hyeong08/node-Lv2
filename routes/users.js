const express = require('express');
const router = express.Router();
require('dotenv').config();
const User = require('../schemas/user');
const jwt = require('jsonwebtoken')


// 회원가입 API
router.post('/signup', async (req, res) => {
  const { nickname, password, confirmPassword } = req.body;

  // 닉네임은 최소 3자 이상, 알파벳 대소문자(a~z, A~Z), 숫자(0~9)로 구성
  const nickCheck = /(?=.*\d)(?=.*[a-zA-Z])/;
  if (nickname.length < 3 || !nickCheck.test(nickname)) {
    res.status(400).send({errorMessage:'닉네임은 최소 3자 이상, 알파벳 대소문자, 숫자로 구성해야 합니다.'});
    return;
  }

  // 비밀번호는 최소 4자 이상, 닉네임과 같은 값이 포함된 경우 실패
  if (password.length < 4 || password.includes(nickname)) {
    res.status(400).send({ errorMessage:'패스워드는 최소 4자 이상, 닉네임과 같은 값이 포함되지 않아야 합니다.'});
    return;
  }

  // 비밀번호 확인은 비밀번호와 정확하게 일치하기
  if (password !== confirmPassword) {
    res.status(400).send({ errorMessage: '패스워드가 패스워드 확인란과 다릅니다.'});
    return;
  }

  // nickname이 동일한게 이미 있는지 확인하기 위해 가져온다.
  const existsUsers = await User.findOne({ nickname });
  if (existsUsers) {
		res.status(400).send({ errorMessage: '중복된 닉네임입니다.'});
    return;
  }

  await User.create({ nickname, password });
  res.status(201).send({ message: '회원가입 성공' });
});

// 로그인 API
router.post('/login', async (req, res) => {
  const { nickname, password } = req.body;
  try {
    const user = await User.findOne({ nickname });
    if (!user || user.password !== password) {
			res.status(400).json({ errorMessage: '닉네임 또는 패스워드가 잘못됐습니다.' });
    }

    const token = jwt.sign({ userId: user.userId },process.env.SECRET_KEY);
    res.cookie('Authorization', `Bearer ${token}`);
    res.status(200).json({ message: '로그인 성공' });
  } catch (err) {
		res.status(400).json({errorMessage: '로그인에 실패하였습니다.'});
  }
});

module.exports = router;
