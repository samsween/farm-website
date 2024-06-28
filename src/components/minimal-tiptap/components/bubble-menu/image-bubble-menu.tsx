import type { Editor } from '@tiptap/core'
import { BubbleMenu } from '@tiptap/react'
import { ImagePopoverBlock } from '../image/image-popover-block'
import { ShouldShowProps } from '../../types'
import { useFiles } from '@/context/file-provider'

const ImageBubbleMenu = ({ editor }: { editor: Editor }) => {
  const filesCtx = useFiles()
  const shouldShow = ({ editor, from, to }: ShouldShowProps) => {
    if (from === to) {
      return false
    }

    const img = editor.getAttributes('image')

    if (img.src) {
      return true
    }

    return false
  }

  const unSetImage = () => {
    const img = editor.getAttributes('image')
    filesCtx.setFiles((prev) => {
      if (!prev) return prev;
      return prev.filter(f => f.name !== img.title)
    })
    editor.commands.deleteSelection()
  }

  return (
    <BubbleMenu
      editor={editor}
      shouldShow={shouldShow}
      tippyOptions={{
        placement: 'bottom',
        offset: [0, 8]
      }}
    >
      <ImagePopoverBlock onRemove={unSetImage} />
    </BubbleMenu>
  )
}

export { ImageBubbleMenu }
