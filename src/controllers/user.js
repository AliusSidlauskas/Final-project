import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import UserModel from "../models/user.js";

export const CREATE_USER = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new UserModel({
      id: uuidv4(),
      name: req.body.name,
      email: req.body.email,
      password: hash,
      createdQuestions: [],
    });

    const createdUser = await newUser.save();

    const jwt_token = jwt.sign(
      { userId: createdUser.id },
      process.env.JWT_SECRET,
      { expiresIn: "5h" }
    );

    const jwt_refresh_token = jwt.sign(
      { userId: createdUser.id },
      process.env.JWT_SECRET,
      {
        expiresIn: "72h",
      }
    );

    return res
      .status(200)
      .json({
        message: "User created successfully",
        user: createdUser,
        jwt_token,
        jwt_refresh_token,
      });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Check inputs" });
  }
};

export const LOGIN_USER = async (req, res) => {
    try{
        const createdUser = await UserModel.findOne({
            email:req.body.email
        })
        if (!createdUser){
            return res.status(400).json({message:"Check inputs"})
        }
        const isPasswordMatch = bcrypt.compareSync(
            req.body.password, createdUser.password
        )
        if (!isPasswordMatch){
            return res.status(400).json({message:"Check inputs"})
        }

        createdUser.isLoggedIn = true;
        createdUser.lastLoginAt = new  Date()
        await createdUser.save()

        const jwt_token = jwt.sign(
            { userId: createdUser.id },
            process.env.JWT_SECRET,
            { expiresIn: "5h" }
          );
      
          const jwt_refresh_token = jwt.sign(
            { userId: createdUser.id },
            process.env.JWT_SECRET,
            {
              expiresIn: "72h",
            }
          );
          return res
          .status(200)
          .json({ jwt_token: jwt_token, jwt_refresh_token: jwt_refresh_token });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error appeared" });
    }
};
