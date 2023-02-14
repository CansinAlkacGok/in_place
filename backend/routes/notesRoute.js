import express from 'express';
import {getAllNotes, getAllHealthNotes,getAllPersonalNotes,getAllBusinessNotes,getAllInspirationsNotes, createHealthNotes, createPersonalNotes, createBusinessNotes, createInspirationsNotes, getSingleHealthNote, getSinglePersonalNote, getSingleBusinessNote, getSingleInspirationsNote, updateHealthNote, updatePersonalNote, updateBusinessNote, updateInspirationsNote, deleteHealthNote, deletePersonalNote, deleteBusinessNote, deleteInspirationsNote } from '../controllers/notesController.js'
import verifyToken from '../middlewares/verification.js';

const route = express.Router();

route.get("/", verifyToken, getAllNotes)

route.get("/health", verifyToken, getAllHealthNotes);

route.get("/personal", verifyToken, getAllPersonalNotes);

route.get("/business", verifyToken, getAllBusinessNotes);

route.get("/inspirations", verifyToken, getAllInspirationsNotes);

route.post("/health", verifyToken, createHealthNotes);

route.post("/personal", verifyToken, createPersonalNotes);

route.post("/business", verifyToken, createBusinessNotes);

route.post("/inspirations", verifyToken, createInspirationsNotes);

route.get("/health/:id", verifyToken, getSingleHealthNote);

route.get("/personal/:id", verifyToken, getSinglePersonalNote);

route.get("/business/:id", verifyToken, getSingleBusinessNote);

route.get("/inspirations/:id", verifyToken, getSingleInspirationsNote);

route.patch("/health/:id", verifyToken, updateHealthNote);

route.patch("/personal/:id", verifyToken, updatePersonalNote);

route.patch("/business/:id", verifyToken, updateBusinessNote);

route.patch("/inspirations/:id", verifyToken, updateInspirationsNote);

route.delete("/health/:id", verifyToken, deleteHealthNote);

route.delete("/personal/:id", verifyToken, deletePersonalNote);

route.delete("/business/:id", verifyToken, deleteBusinessNote);

route.delete("/inspirations/:id", verifyToken, deleteInspirationsNote);


export default route