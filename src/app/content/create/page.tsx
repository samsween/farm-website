import { Editor } from "@/components/editor";
import { FileProvider } from "@/context/file-provider";



export default function Create() {
  return (
    <div className="w-full p-20 h-full">
      <FileProvider>
        <Editor />
      </FileProvider>
    </div>
  )

}
