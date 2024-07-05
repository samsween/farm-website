
import { Schema, model, models } from "mongoose";
export interface ITodoCategory {
	_id: string;
	name: string;
}
const todoCategory = new Schema<ITodoCategory>({
	name: { type: String, required: true }
});

export const TodoCategory = models.TodoCategory || model("TodoCategory", todoCategory);
