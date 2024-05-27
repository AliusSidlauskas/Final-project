import mongoose from 'mongoose';

const AnswerLikeSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  answerId: { type: String, required: true },
  action: { type: String, enum: ['like', 'dislike'], required: true }
});

const AnswerLikeModel = mongoose.model('AnswerLike', AnswerLikeSchema);

export default AnswerLikeModel;
