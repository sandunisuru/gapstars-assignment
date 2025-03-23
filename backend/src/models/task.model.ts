import mongoose, { Mongoose, Schema } from "mongoose";
import { Task } from "../helpers/types/task.types";

const TaskSchema: Schema = new Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
    depends_on: { type: Array },
    priority: { type: Number, required: true }
},
    {
        timestamps: true, 
        versionKey: false, 
    }
);

export default mongoose.model<Task>('Task', TaskSchema);