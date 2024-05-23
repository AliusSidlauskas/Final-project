import mongoose from "mongoose";

const answerSchema = mongoose.Schema({
    id:{type:String, required: true},
    questionId:{type:String, required:true},
    userId:{type:String, required:true},
    answerText:{type: String, required:true},
    // gainedLikesNumber:{type: Number, required:true},
    date:{type: String, required: true}
})

export default mongoose.model("Answer", answerSchema)