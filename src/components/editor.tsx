"use client"
import { Button } from "@/components/ui/button";
import { useFiles } from "@/context/file-provider";
import { useState } from "react"
import { MinimalTiptapEditor } from "./minimal-tiptap"
import { Input } from "./ui/input";
import { addBlog } from "./actions";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
const formSchema = z.object({
	title: z.string().min(2).max(50),
	content: z.string().min(1)
})
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { useRouter } from "next/navigation";

export const Editor = () => {
	const fileCtx = useFiles()
	const [loading, setLoading] = useState<boolean>(false)
	const router = useRouter()
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			content: ""
		},
	})
	async function onSubmit(values: z.infer<typeof formSchema>) {
		setLoading(true);
		console.log(fileCtx.files)
		await addBlog({ content: values.content, title: values.title, author: "Sam" }, fileCtx?.files).then(() => {
			router.push("/content")
			setLoading(false)
		}).catch(err => form.setError("content", err?.message || "Server error"));

	}
	return (
		<div className="w-full h-full p-10">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Title</FormLabel>
								<FormControl>
									<Input placeholder="Title..." {...field} />
								</FormControl>
								<FormDescription>
									This will be displayed in the blog list
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="content"
						render={() => (
							<FormItem>
								<FormLabel>Content</FormLabel>
								<FormControl>


									<MinimalTiptapEditor
										value={form.getValues('content')}
										onValueChange={(val) => form.setValue("content", val.toString())}
										outputValue="html"
										disabled={false}
										contentClass=""
										className="w-full h-full bg-white"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{loading ? <p>Loading...</p> : null}
					<Button type="submit" disabled={loading}>Submit</Button>
				</form>
			</Form>
		</div>
	)
}

/* <MinimalTiptapEditor
	value={state}
	onValueChange={setState}
	outputValue="html"
	disabled={false}
	contentClass=""
	className="w-full h-full"
/> */
