const mongoose = require('mongoose');

// id가 따로 필요가 없는 이유는 post가 생성이 될때마다 자동으로 uuid가 설정이 되기때문
const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);
postSchema.set('timestamps',true);

module.exports = mongoose.model('Post', postSchema);
