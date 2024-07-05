import { Navlink } from "@/components/nav-link";
import { Book, Check, CheckCircleIcon, Notebook, Plus, } from "lucide-react";
import Link from "next/link";


export default async function Layout({ children }: { children: React.ReactNode }) {
  return (


    <div className="flex w-full">
      <aside className="inset-y flex min-w-36 flex-col border-primary border-r min-h-screen">
        <nav className="py-8  flex flex-col">
          <Navlink href="/content" name="Blogs">
            <Book />
          </Navlink>
          <Navlink href="/content/todo" name="Todo">
            <CheckCircleIcon />
          </Navlink>
        </nav >
      </aside >
      <main className="w-full flex-1 bg-slate-50">
        {children}
      </main>
    </div >
  )
}

