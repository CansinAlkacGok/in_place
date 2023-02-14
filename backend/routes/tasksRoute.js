import express from 'express';
import {getAllTasks, getAllCompletedTasks, getSingleTask, completeTask, createNewTask, updateTask, deleteTask, deleteCompletedTask} from '../controllers/tasksController.js';
import verifyToken from '../middlewares/verification.js';

const route = express.Router();

route.get("/",verifyToken, getAllTasks);

route.get("/completed", verifyToken, getAllCompletedTasks)

route.post("/", verifyToken, createNewTask);

route.get("/:id", verifyToken, getSingleTask);

route.patch("/completed/:id", verifyToken, completeTask)

route.patch("/:id",verifyToken, updateTask);

route.delete("/:id", verifyToken, deleteTask);

route.delete ("/completed/:id", verifyToken, deleteCompletedTask)

export default route;