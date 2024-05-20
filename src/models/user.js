import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  id: { type: String, required: true },
  name: {
    type: String,
    required: true,
    match: [/^[A-Z][a-zA-Z]*$/, "Name must start with capital letter "],
  },

  email:{
    type:String, required: true, match: [/^\S+@\S+\.\S+$/, "Please, check your email address"]
  },

  password: {
    type: String,
    required: true,
    match: [
        /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/,
      "Password must contain at least 8 characters, at least one number, at least one symbol",
    ],
  },

  createdQuestions:{type:Array, required:false}
});

export default mongoose.model("User", userSchema)