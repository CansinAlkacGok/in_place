import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import morgan from 'morgan';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fileUpload from 'express-fileupload';
import usersRoute from './routes/usersRoute.js';
import kanbanRoute from './routes/kanbanRoute.js'
import tasksRoute from './routes/tasksRoute.js';
import notesRoute from './routes/notesRoute.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

const PORT = process.env.PORT;

mongoose.set("strictQuery", false);

mongoose.connect(`${process.env.MONGO_URI}`, () => {
    console.log("connection established")
})

app.use(morgan("dev"));

app.use(express.json());

app.use(express.static(__dirname + '/views/build'))

app.use(express.urlencoded({extended:true}))

app.use(fileUpload());

app.use((req,res,next)=> {

    console.log(req.body)
    next();
})

app.get('/', (req,res,next) => {
    res.sendFile(__dirname + '/views/build/index.html')
})

app.use("/users", usersRoute);

app.use("/kanban", kanbanRoute);

app.use("/tasks", tasksRoute);

app.use("/notes", notesRoute);


app.use((err, req, res, next)=> { 
    
    res.status(err.status || 500);
    res.json({success:false, message: err.message})

}) 

app.listen(PORT, ()=> console.log("server is running"));
