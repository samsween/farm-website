import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"



const NOTES = [
  {
    title: "This is a note",
    content: `
  <ul>
    <li>Do something</li>
    <li>Do something</li>
    <li>Do something</li>
    <li>Do something</li>
    <li>Do something</li>
    <li>Do something</li>
    <li>Do something</li>
    <li>Do something</li>
    <li>Do something</li>
    <li>Do something</li>
    <li>Do something</li>
</ul>
`
  },
  {
    title: "This is a note",
    content: `
  <ul>
    <li>Do something</li>
    <li>Do something</li>
    <li>Do something</li>
    <li>Do something</li>
    <li>Do something</li>
    <li>Do something</li>
    <li>Do something</li>
    <li>Do something</li>
    <li>Do something</li>
    <li>Do something</li>
    <li>Do something</li>
</ul>
`
  }, {
    title: "This is a note",
    content: `
  <ul>
    <li>Do something</li>
    <li>Do something</li>
    <li>Do something</li>
    <li>Do something</li>
    <li>Do something</li>
    <li>Do something</li>
    <li>Do something</li>
    <li>Do something</li>
    <li>Do something</li>
    <li>Do something</li>
    <li>Do something</li>
</ul>
`
  }
]


export default function Notes() {
  return (
    <div className="p-8">
      <Tabs defaultValue="All" className="">
        <div className="w-full flex justify-between">
          <div>
            <TabsList>
              <TabsTrigger value="All">All</TabsTrigger>
              <TabsTrigger value="house">House</TabsTrigger>
              <TabsTrigger value="farm">Farm</TabsTrigger>
            </TabsList>
          </div>
          <Button className="flex gap-2">
            <PlusCircle />
            Add new

          </Button>

        </div>
        <TabsContent value="All">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6  mx-auto py-8">
            {
              NOTES.map((note, indx) => (
                <div className="bg-background rounded-lg shadow-lg overflow-hidden">
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{note.title}</h3>
                    <div className="text-muted-foreground text-sm mt-2 prose max-h-64 overflow-scroll" dangerouslySetInnerHTML={{ __html: note.content }}></div>
                    <div className="text-xs text-muted-foreground mt-4">June 1, 2023</div>
                  </div>
                </div>
              ))
            }
          </div></TabsContent>

      </Tabs>
    </div>
  )
}
