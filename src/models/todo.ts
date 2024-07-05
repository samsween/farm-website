
import { Schema, model, models } from "mongoose";
import { ITodoCategory } from "./todo-category";
import "./todo-category";

export interface ITodo {
	_id: string;
	title: string;
	category: ITodoCategory | string
}

const todoSchema = new Schema<ITodo>({
	title: { type: String, required: true },
	category: { type: Schema.Types.ObjectId, ref: "TodoCategory", required: true }
});

export const Todo = models.Todo || model("Todo", todoSchema);
