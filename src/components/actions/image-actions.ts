"use server"
import { SearchResult } from "@/app/gallery/page";
import cloudinary from "@/lib/cloudinary";


export async function addImageToAlbum(image: SearchResult, album: string) {
	await cloudinary.v2.api.create_folder(album);

	let parts = image.public_id.split("/");
	if (parts.length > 1) {
		parts = parts.slice(1);
	}
	const publicId = parts.join("/");

	await cloudinary.v2.uploader.rename(image.public_id, `${album}/${publicId}`);
}

export async function uploadImages(images: string[]) {
	let results = [];
	for (const image of images) {
		const res = await cloudinary.v2.uploader.upload(image)
		results.push(res)

	}
	return results
}
