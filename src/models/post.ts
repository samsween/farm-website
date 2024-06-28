import { Schema, model, models } from "mongoose";
export interface IPost {
	_id: string;
	title: string;
	content: string;
	image_url?: string
	author: string;
	timestamp: Date;
}

const postSchema = new Schema<IPost>({
	title: { type: String, required: true },
	content: { type: String, required: true },
	author: { type: String, required: true },
	image_url: { type: String, required: false },
	timestamp: { type: Date, required: true, default: Date.now() },
});

export const Post = models.Post || model("Post", postSchema);
