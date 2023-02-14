import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
 
const usersSchema = new mongoose.Schema({
    firstName: {type: String, required:true},
    lastName: {type: String, required:true},
    email: {type: String, required:true},
    password: {type: String, required:true},
    notes: [{type: Schema.Types.ObjectId, ref: "notes"}],
    tasks: [{type: Schema.Types.ObjectId, ref: "tasks"}],
    kanban: [{type: Schema.Types.ObjectId, ref: "kanbans"}]
})

usersSchema.pre("save", function (next) {

    if(this.isModified("password")){
        
        const hashedPassword = bcrypt.hashSync(this.password, 10)
        this.password = hashedPassword;
        
         console.log("password hashed and store into DB")
    }

        next();
})

const UsersCollection = mongoose.model("users", usersSchema);

UsersCollection.createIndexes({email: -1})

export default UsersCollection;