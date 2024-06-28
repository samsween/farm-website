"use server";

import { TFileStore } from "@/context/file-provider"
import { SearchResult } from "@/app/gallery/page";
import cloudinary from "@/lib/cloudinary";
import connectMongo from "@/lib/connect-mongo";
import { IPost, Post } from "@/models/post";

export async function addImageToAlbum(image: SearchResult, album: string) {
	await cloudinary.v2.api.create_folder(album);

	let parts = image.public_id.split("/");
	if (parts.length > 1) {
		parts = parts.slice(1);
	}
	const publicId = parts.join("/");

	await cloudinary.v2.uploader.rename(image.public_id, `${album}/${publicId}`);
}

async function uploadImages(images: string[]) {
	let results = [];
	for (const image of images) {
		const res = await cloudinary.v2.uploader.upload(image)
		results.push(res)

	}
	return results
}

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
export async function addBlog(html: string, files?: TFileStore[]) {
	let htmlToStore;
	let results: any;
	if (files) {
		let imagesToUpload = files.map(file => file.file);
		results = await uploadImages(imagesToUpload);
		let updatedFileUrls = files.map((file, index) => ({ ...file, file: results[index].secure_url }))
		htmlToStore = updateImageSrc(html, updatedFileUrls)
	} else htmlToStore = html

	await connectMongo();
	const post: IPost = await Post.create({
		title: "Something",
		content: htmlToStore,
		image_url: results[0]?.secure_url ? results[0].secure_url : null,
		author: "Sam"
	})
	return post.content
}
