import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
  health: [
    {
      title: [{ type: String, required: true }],
      note: [{ type: String, required: true }],
    },
  ],
  personal: [
    {
      title: [{ type: String, required: true }],
      note: [{ type: String, required: true }],
    },
  ],
  business: [
    {
      title: [{ type: String, required: true }],
      note: [{ type: String, required: true }],
    },
  ],
  inspirations: [
    {
      title: [{ type: String, required: true }],
      note: [{ type: String, required: true }],
    },
  ],
});

const NotesCollection = mongoose.model("notes", notesSchema);

export default NotesCollection;

/* const notesSchema = new mongoose.Schema({
    category: {
        type: String,
        required:true
    },
    title: {
        type: String,
        required:true
    },
    text: {
        type: String,
        required:true
    }
}) */
