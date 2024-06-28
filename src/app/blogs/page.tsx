import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import connectMongo from "@/lib/connect-mongo";
import { IPost, Post } from "@/models/post";
import Image from "next/image";



async function getPosts() {
  await connectMongo();
  const posts = await Post.find({});
  return posts
}


export default async function Blogs() {
  const posts: IPost[] = await getPosts();
  return (
    <>
      {posts.map(post => (
        <Card className="w-full max-w-md">
          <Image
            src={post.image_url ? post.image_url : ""}
            alt="Card Image"
            width={500}
            height={300}
            className="object-cover w-full h-64 rounded-t-lg"
          />
          <CardContent className="p-4">
            <CardTitle className="text-2xl font-bold"> {post.title}</CardTitle>
          </CardContent>
        </Card>
      ))}
    </>
  )
}
