import mongoose, { Schema } from 'mongoose';

const tasksSchema = new mongoose.Schema({
    task: {type:String, required: true},
    date: {type: Date, default: Date.now},
    completed: {type:Boolean, default: false},
//    userId: {type:Schema.Types.ObjectId, ref: "users"}
})

const TasksCollection = mongoose.model("tasks", tasksSchema);

export default TasksCollection;