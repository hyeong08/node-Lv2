const jwt = require('jsonwebtoken');
const User = require('../schemas/user');

module.exports = async (req, res, next) => {
  const { Authorization } = req.cookies;
  const [authType, authToken] = (Authorization || '').split(' ');

  if (!authToken || authType !== 'Bearer') {
    res.status(401).send({ errroMessage: '로그인이 필요한 기능입니다.' });
    return;
  }

  try {
    const { userId } = jwt.verify(authToken, process.env.SECRET_KEY);
    const user = await User.findById(userId);
    res.locals.user = user;
    next();
  } catch (err) {
    res.status(401).send({ errorMessage: '로그인 후 이용 가능한 기능입니다.' });
  }
};
