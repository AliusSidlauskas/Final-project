import { v4 as uuidv4 } from "uuid";
import AnswerModel from "../models/answer.js";
import QuestionModel from "../models/question.js";


export const GET_ANSWER = async (req, res) => {
  try {
    const questionId = req.params.id;
    const answers = await AnswerModel.find({ questionId: questionId });

    if (!answers || answers.length === 0) {
      return res.status(404).json({ message: "No answers found" });
    }
    return res.status(200).json({ answers });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to get answers" });
  }
};



export const POST_ANSWER = async (req, res) => {
  try {
    const questionId = req.params.id;
    const { 
      userId, 
      answerText, 
      // gainedLikesNumber = 0
     } = req.body;

    if (!userId || !answerText) {
      return res.status(400).json({ message: "Please fill required inputs" });
    }

    const question = await QuestionModel.findOne({ id: questionId });

    if (!question) {
      return res.status(404).json({ message: "Could not find such question" });
    }

    const answer = new AnswerModel({
      id: uuidv4(),
      questionId: questionId,
      userId: userId,
      answerText: answerText,
      // gainedLikesNumber: gainedLikesNumber,
      date: new Date().toISOString(),
    });

    const savedAnswer = await answer.save();

    return res
      .status(201)
      .json({ answer: savedAnswer, message: "Answer created" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Answer creation failed" });
  }
};


export const DELETE_ANSWER = async (req, res) => {
    try{
        const answer = await AnswerModel.findOne({id: req.params.id})
        if(!answer){
            return res.status(404).json({message:"Answer does not exists"})
        } 
        if (answer.userId !== req.body.userId){
            return res.status(401).json({message:"You are unauthorized to delete answer"})
        }

        await AnswerModel.deleteOne({id:req.params.id})
        return res.status(200).json({message:"Answer deleted successfully"})
    }catch(err){
        console.log(err) 
    return res.status(500).json({message:"Internal Server Error"})}
}
