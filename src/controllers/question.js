import { v4 as uuidv4 } from "uuid";
import QuestionModel from "../models/question.js";
import UserModel from "../models/user.js";

export const POST_QUESTION = async (req, res) => {
  try {
    const { userId, title, questionText } = req.body;

    if (!userId || !title || !questionText) {
      return res.status(400).json({ error: "Please fill required inputs" });
    }

    const createdUser = await UserModel.findOne({ id: userId });

    if (!createdUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const question = new QuestionModel({
      id: uuidv4(),
      userId: userId,
      title: title,
      questionText: questionText,
      date: new Date().toISOString(),
    });

    const savedQuestion = await question.save();
    createdUser.createdQuestions.push(savedQuestion.id);
    await createdUser.save();

    return res
      .status(200)
      .json({ question: savedQuestion, message: "Question posted" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Failed to post question" });
  }
};

export const GET_QUESTIONS = async (req, res) => {
  try {
    const questions = await QuestionModel.find();
    return res.status(200).json({ questions });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed get questions" });
  }
};

export const DELETE_QUESTION = async (req, res) => {
  try {
    const question = await QuestionModel.findOne({ id: req.params.id });

    if (!question) {
      return res.status(404).json({ message: "Question does not exists" });
    }
    if (question.userId !== req.body.userId) {
      return res
        .status(401)
        .json({ message: "You are unauthorized to delete question" });
    }

    await QuestionModel.deleteOne({ id: req.params.id });
    return res.status(200).json({ message: "Question deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
