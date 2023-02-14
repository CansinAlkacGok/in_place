import UsersCollection from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await UsersCollection.find();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

export const createNewUser = async (req, res, next) => {
  console.log(req.body);
  try {
    const createUser = new UsersCollection(req.body);
    await createUser.save();
    res.json({ success: true, users: createUser });
  } catch (err) {
    next(err);
  }
};

export const getSingleUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const singleUser = await UsersCollection.findById(id).populate("kanban").populate("tasks").populate("notes");
    res.json({ success: true, user: singleUser });
  } catch (err) {
    const error = new Error("Id doesn't exist");
    error.status = 404;
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    let user = await UsersCollection.findById(req.params.id);

    if (req.body.password) {
      user.password = req.body.password;
    }
    await user.save();

    let body = {};
    for (const key in req.body) {
      if (req.body[key] !== "" && key !== "password") {
        body[key] = req.body[key];
      }
    }

    const updatedUser = await UsersCollection.findByIdAndUpdate(req.params.id, body,{ new: true }).populate("tasks").populate("kanban").populate("notes");

 //   const updatedUser = await UsersCollection.findByIdAndUpdate(
 //     req.params.id,
 //     body,
 //     { new: true }
 //   ).populate({ path: "tasks", model: "tasks" }).populate("kanban");

    res.json({ success: true, data: updatedUser });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingUser = await UsersCollection.findById(id);

    if (existingUser) {
      const deleteStatus = await UsersCollection.deleteOne({
        _id: existingUser._id,
      });
      res.json({ success: true, status: deleteStatus });
    } else {
      throw new Error("User id does not exist");
    }
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const user = await UsersCollection.findOne({ email: req.body.email });

    if (user) {
      const password = await bcrypt.compare(req.body.password, user.password);

      if (password) {
        let token = jwt.sign(
          { _id: user._id, firstName: user.firstName },
          process.env.TOKEN_SECRET_KEY,
          { expiresIn: "50 days", issuer: "CDT", audience: "users" }
        );

        const updatedUser = await UsersCollection.findByIdAndUpdate(
          user._id,
          { token: token },
          { new: true }
        ).populate("tasks").populate("kanban").populate("notes")

        res.header("token", token);

        res.json({ success: true, data: updatedUser });
      } else {
        throw new Error("password doesn't match");
      }
    } else {
      throw new Error("Email doesn't exist");
    }
  } catch (err) {
    next(err);
  }
};

export const checkUserToken = async (req, res, next) => {
  try {
    const token = req.headers.token;
    const payload = jwt.verify(token, process.env.TOKEN_SECRET_KEY);


      const user = await UsersCollection.findById(payload._id).populate("tasks").populate("kanban").populate("notes")

  //  const user = await UsersCollection.findById(payload._id).populate("kanban");


    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};
