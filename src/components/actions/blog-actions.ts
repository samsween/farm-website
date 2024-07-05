
"use server";

import { TFileStore } from "@/context/file-provider"
import connectMongo from "@/lib/connect-mongo";
import { IPost, Post } from "@/models/post";
import { uploadImages } from "./image-actions";

const updateImageSrc = (html: string, images: TFileStore[]) => {
	const imageMap = images.reduce((acc: any, { name, file }) => {
		acc[name] = file;
		return acc;
	}, {});

	return html.replace(/<img([^>]*)src="([^"]+)"([^>]*)title="([^"]+)"([^>]*)>/g, (match, p1, oldSrc, p2, title, p3) => {
		if (imageMap[title]) {
			return `<img${p1}src="${imageMap[title]}"${p2}title="${title}"${p3}>`;
		}
		return match;
	});
};

export async function addBlog(blog: { title: string, content: string, author: string }, files?: TFileStore[]) {
	let results: any;
	if (files) {
		let imagesToUpload = files.map(file => file.file);
		results = await uploadImages(imagesToUpload);
		let updatedFileUrls = files.map((file, index) => ({ ...file, file: results[index].secure_url }))
		blog.content = updateImageSrc(blog.content, updatedFileUrls)
	}
	await connectMongo();
	const post: IPost = await Post.create({
		title: blog.title,
		content: blog.content,
		image_url: results[0]?.secure_url ? results[0].secure_url : null,
		author: blog.author
	})
	return post.content
}
