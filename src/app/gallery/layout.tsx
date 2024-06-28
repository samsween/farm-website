import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button";
import cloudinary from "@/lib/cloudinary";
import { Folder, Image, Plus, } from "lucide-react";
import Link from "next/link";

export type Folder = {
  name: string,
  path: string,
  external_id: string
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  const { folders } = await cloudinary.v2.api.root_folders() as { folders: Folder[] };
  return (


    <div className="flex">
      <aside className="inset-y fixed  top-0 left-0 z-20 flex  min-w-36 flex-col border-primary">
        <nav className="py-8 px-4 flex flex-col gap-8 pt-24">
          <div className="flex gap-2 items-center">
            <Image />

            <Link href="/gallery" className="font-semibold">Gallery</Link>
          </div>
          <Collapsible>
            <CollapsibleTrigger>
              <div className="flex gap-2 items-center">
                <Folder />
                <span className="font-semibold">Albums</span>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="flex flex-col gap-2">
              <ul className="px-2 flex flex-col gap-2">
                {
                  folders.map(folder => (
                    <li>
                      <Link href={`/gallery/${folder.name}`} className="underline"> {folder.name}</Link>
                    </li>
                  ))
                }
              </ul>
              <Button className="flex gap-1 p-0 hover:border border-primary text-primary" variant={"ghost"}>
                <Plus />
                Create New
              </Button>
            </CollapsibleContent>
          </Collapsible>
        </nav >
      </aside >
      <main className="flex-1 pl-40">
        {children}

      </main>
    </div >
  )
}
