import connectMongo from "@/lib/connect-mongo";
import { IPost, Post } from "@/models/post";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

async function getPosts() {
  await connectMongo();
  const posts = await Post.find({});
  return posts;
}

export default async function Blogs() {
  const posts: IPost[] = await getPosts();
  return (
    <div className="p-8 w-full h-full">
      <div className="w-full flex justify-end">
        <Button variant="link">
          <Link href="/content/new" className="flex gap-2 items-center">
            <PlusCircle />
            Add new
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-6 py-6">
        {posts.map((post) => (
          <Component post={post} key={post._id} />
        ))}
      </div>
    </div>
  );
}

function Component({ post }: { post: IPost }) {
  return (
    <Card className="w-full max-w-md shadow-md">
      <CardContent className="grid gap-4">
        <img
          src={post.image_url ? post.image_url : ""}
          alt="Blog Post Image"
          width={400}
          height={200}
          className="rounded-md object-cover aspect-[2/1]"
        />
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">{post.title}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex items-center w-full justify-between">
              <Button variant="link" className="border-primary">
                <Link href={`/content/${post._id}`}>Read more</Link>
              </Button>
              <span>{post.author}</span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <span>{post.timestamp.toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
