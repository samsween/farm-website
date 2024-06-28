"use client"
import { Button } from "@/components/ui/button";
import { useFiles } from "@/context/file-provider";
import { useState } from "react"
import { MinimalTiptapEditor } from "./minimal-tiptap"
import { Input } from "./ui/input";
import { addBlog } from "./actions";
import { IPost } from "@/models/post";

export const Editor = () => {
	const fileCtx = useFiles()
	const [state, setState] = useState("")
	const [loading, setLoading] = useState(false)
	const [blog, setBlog] = useState<string>("")
	const handleSubmit = async (e: any) => {
		setLoading(true)
		const blog = await addBlog(state, fileCtx.files)
		setBlog(blog)
		console.log(blog)
		setLoading(false)
	}
	return (
		<div className="flex w-full h-full">
			<div className="flex flex-col gap-8 w-full">
				<Input type="text" placeholder="Your name..." />
				<MinimalTiptapEditor
					value={state}
					onValueChange={setState}
					outputValue="html"
					disabled={false}
					contentClass=""
				/>
				{loading && <p>Loading..</p>}
				<Button onClick={handleSubmit} disabled={loading}>Submit</Button>
			</div>
			<div className="w-full flex justify-center">			{
				blog && <div className="prose" dangerouslySetInnerHTML={{ __html: blog }}></div>
			}</div>

		</div>
	)
}
