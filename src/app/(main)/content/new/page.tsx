import { Editor } from "@/components/editor";
import { FileProvider } from "@/context/file-provider";





export default function NewBlog() {
  return (
    <div>
      <FileProvider>
        <Editor />
      </FileProvider>
    </div>
  )
}
