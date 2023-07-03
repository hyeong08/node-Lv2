// const jwt = require('jsonwebtoken');
// const User = require('../schemas/user.js');

// module.exports = async (req, res, next) => {
//   const { Authorization } = req.cookies;
//   const [authType, authToken] = (Authorization ?? '').split(' ');

//   if (authType !== 'Bearer' || !authToken) {
//     res.status(403).json({
//       errroMessage: '로그인이 필요한 기능입니다.',
//     });
//     return;
//   }

//   try {
//     const { userId } = jwt.verify(authToken, 'customized-secret-key');

//     const user = await User.findById(userId);
//     res.locals.user = user;
//     next();
//   } catch (err) {
//     console.error(err.message);
//     res
//       .status(403)
//       .json({ errorMessage: '전달된 쿠키에서 오류가 발생하였습니다.' });
//     return;
//   }
// };
