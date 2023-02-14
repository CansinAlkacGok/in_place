
import express from 'express';
import {
    getAllUsers,
    createNewUser,
    loginUser,
    checkUserToken,
    deleteUser,
    getSingleUser,
    updateUser,
} from "../controllers/usersController.js";;
import verifyToken from '../middlewares/verification.js';
import usersValidation from '../middlewares/validation.js';

const route = express.Router();

route.get("/", verifyToken, getAllUsers);

route.post("/", usersValidation, createNewUser);

route.get("/checkusertoken", checkUserToken)

route.post("/login", loginUser);

route.get("/:id", getSingleUser);

route.patch("/:id", verifyToken, updateUser);

route.delete("/:id", deleteUser);

export default route;
