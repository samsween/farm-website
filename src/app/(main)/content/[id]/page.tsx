import BackButton from "@/components/back-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import connectMongo from "@/lib/connect-mongo"
import { IPost, Post } from "@/models/post";
import { ArrowLeft } from "lucide-react";


async function getPost(id: string) {
  await connectMongo();
  const post = await Post.findById(id);
  return post;
}

export default async function Blog({ params: { id } }: { params: { id: string } }) {
  const post = await getPost(id) as IPost
  return (
    <div className="p-12 w-full h-full flex flex-col items-center justify-center" >
      <div className="w-full py-4">
        <BackButton />
      </div>
      <div className="w-full h-full bg-white p-4 rounded-md">
        <div className=" flex flex-col gap-2 py-8">
          <h1 className="text-2xl font-bold">{post.title}</h1>
          <div className="flex gap-2">
            <Badge>
              {post.author}
            </Badge>
            <Badge>
              {post.timestamp.toLocaleDateString()}
            </Badge>
          </div>
        </div>
        <div className="w-full prose-sm" dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </div>
  )
}
