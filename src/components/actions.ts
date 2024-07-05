"use server";

import { TFileStore } from "@/context/file-provider";
import { SearchResult } from "@/app/(main)/gallery/page";
import cloudinary from "@/lib/cloudinary";
import connectMongo from "@/lib/connect-mongo";
import { IPost, Post } from "@/models/post";
import { Todo } from "@/models/todo";
import { TodoCategory } from "@/models/todo-category";

export async function addTodo(todo: { name: string; category: string }) {
  await connectMongo();
  const res = await Todo.create({
    name: todo.name,
    category: todo.category,
  });
  return JSON.parse(res);
}

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
    const res = await cloudinary.v2.uploader.upload(image);
    results.push(res);
  }
  return results;
}

const updateImageSrc = (html: string, images: TFileStore[]) => {
  const imageMap = images.reduce((acc: any, { name, file }) => {
    acc[name] = file;
    return acc;
  }, {});

  return html.replace(
    /<img([^>]*)src="([^"]+)"([^>]*)title="([^"]+)"([^>]*)>/g,
    (match, p1, oldSrc, p2, title, p3) => {
      if (imageMap[title]) {
        return `<img${p1}src="${imageMap[title]}"${p2}title="${title}"${p3}>`;
      }
      return match;
    }
  );
};
export async function addBlog(
  blog: { title: string; content: string; author: string },
  files?: TFileStore[]
) {
  let results: any;
  if (files) {
    let imagesToUpload = files.map((file) => file.file);
    results = await uploadImages(imagesToUpload);
    let updatedFileUrls = files.map((file, index) => ({
      ...file,
      file: results[index].secure_url,
    }));
    blog.content = updateImageSrc(blog.content, updatedFileUrls);
  }
  await connectMongo();
  const post: IPost = await Post.create({
    title: blog.title,
    content: blog.content,
    image_url: results[0]?.secure_url ? results[0].secure_url : null,
    author: blog.author,
  });
  return post.content;
}
export async function addCateogry(title: string) {
  await connectMongo();
  const category = await TodoCategory.create({
    title,
  });
  return JSON.parse(category);
}
