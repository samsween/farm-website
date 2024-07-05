
"use client"
import { Button } from "@/components/ui/button";
import { useState } from "react"
import { Input } from "@/components/ui/input";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ITodoCategory } from "@/models/todo-category";
import { addTodo } from "../actions/todo-actions";
import { useRouter } from "next/navigation";

const formSchema = z.object({
	title: z.string().min(2).max(50),
	category: z.string({ required_error: "Please select a category" })
})
export const TodoForm = ({ categories }: {
	categories: ITodoCategory[]
}) => {
	const router = useRouter()
	const [loading, setLoading] = useState<boolean>(false)
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			category: ""
		},
	})
	async function onSubmit(values: z.infer<typeof formSchema>) {
		setLoading(true);
		await addTodo({ title: values.title, category: values.category })
		router.refresh()
		setLoading(false)

	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-2 w-full">
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormControl>
								<Input placeholder="Title..." {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="category"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<SelectTrigger className="w-[180px]">
										<SelectValue placeholder="Category" />
									</SelectTrigger>
									<SelectContent>
										{
											categories.map((cat, i) => <SelectItem value={cat._id}>{cat.name}</SelectItem>)
										}
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{loading ? <p>Loading...</p> : null}
				<Button type="submit" disabled={loading}>Add Todo</Button>
			</form>
		</Form>
	)
}

