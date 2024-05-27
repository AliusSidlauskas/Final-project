import mongoose from "mongoose";

const answerSchema = mongoose.Schema({
    id:{type:String, required: true},
    questionId:{type:String, required:true},
    userId:{type:String, required:true},
    answerText:{type: String, required:true},
    date:{type: String, required: true},
    likeCount: { type: Number, default: 0 },
    dislikeCount: { type: Number, default: 0 }

})

export default mongoose.model("Answer", answerSchema)