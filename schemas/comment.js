const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
// 객체 분해 할당을 사용하여 속성을 추출하고 개별 변수에 할당함
// 객체 분해 할당은 객체에서 필요한 속성만 추출하여 사용할 때 유용하고, 함수의 매개변수로 객체를 전달할때도 사용
// 'mongoose.Types'객체의 'ObjectId'속성을 'ObjectId'변수에 할당함

const commentSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    postId: {
      type: ObjectId,
      required: true,
    },
    nickname: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);
commentSchema.set('timestamps', true);

module.exports = mongoose.model('Comment', commentSchema);
