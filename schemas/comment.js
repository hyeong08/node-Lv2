const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

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
