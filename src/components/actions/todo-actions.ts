"use server"
import connectMongo from "@/lib/connect-mongo";
import { Todo } from "@/models/todo";
import { TodoCategory } from "@/models/todo-category";

export async function addTodo(todo: { title: string, category: string }) {
	await connectMongo();
	await Todo.create({
		title: todo.title,
		category: todo.category
	})
}
export async function addCateogry(name: string) {
	await connectMongo();
	await TodoCategory.create({
		name: name
	})
}
