import express from "express";
import {
  getSingleToDo,
  getAllTasks,
  createNewTask,
  getAllDoingTasks,
  getAllDoneTasks,
  updateTask,
  deleteTask,
} from "../controllers/kanbanController.js";
import verifyToken from '../middlewares/verification.js';

const route = express.Router();


route.get("/", verifyToken, getAllTasks);

route.get("/doing", verifyToken, getAllDoingTasks);

route.get("/done", verifyToken, getAllDoneTasks);

route.post("/", verifyToken, createNewTask);

route.get("/:id", verifyToken, getSingleToDo);

route.patch("/:id", verifyToken, updateTask); 
// Error code 500 while dragging and dropping when using "verifyToken"  -> check

route.delete("/:id", verifyToken, deleteTask);

export default route;
