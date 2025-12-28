"use client"

import { useEffect, useRef } from "react"
import { Label } from "@/components/ui/label"

interface RichTextEditorProps {
  id: string
  name: string
  defaultValue?: string
  label?: string
  required?: boolean
}

export function RichTextEditor({ id, name, defaultValue = "", label, required }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const hiddenInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editorRef.current && defaultValue) {
      editorRef.current.innerHTML = defaultValue
    }
  }, [defaultValue])

  const handleInput = () => {
    if (editorRef.current && hiddenInputRef.current) {
      hiddenInputRef.current.value = editorRef.current.innerHTML
    }
  }

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
    handleInput()
  }

  return (
    <div className="space-y-2">
      {label && <Label htmlFor={id}>{label}</Label>}

      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 border rounded-t-md bg-muted/50">
        <button
          type="button"
          onClick={() => execCommand("bold")}
          className="px-3 py-1 text-sm font-bold border rounded hover:bg-background transition-colors"
          title="Bold"
        >
          B
        </button>
        <button
          type="button"
          onClick={() => execCommand("italic")}
          className="px-3 py-1 text-sm italic border rounded hover:bg-background transition-colors"
          title="Italic"
        >
          I
        </button>
        <button
          type="button"
          onClick={() => execCommand("underline")}
          className="px-3 py-1 text-sm underline border rounded hover:bg-background transition-colors"
          title="Underline"
        >
          U
        </button>
        <div className="w-px bg-border mx-1" />
        <button
          type="button"
          onClick={() => execCommand("formatBlock", "<h2>")}
          className="px-3 py-1 text-sm border rounded hover:bg-background transition-colors"
          title="Heading 2"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => execCommand("formatBlock", "<h3>")}
          className="px-3 py-1 text-sm border rounded hover:bg-background transition-colors"
          title="Heading 3"
        >
          H3
        </button>
        <button
          type="button"
          onClick={() => execCommand("formatBlock", "<p>")}
          className="px-3 py-1 text-sm border rounded hover:bg-background transition-colors"
          title="Paragraph"
        >
          P
        </button>
        <div className="w-px bg-border mx-1" />
        <button
          type="button"
          onClick={() => execCommand("insertUnorderedList")}
          className="px-3 py-1 text-sm border rounded hover:bg-background transition-colors"
          title="Bullet List"
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => execCommand("insertOrderedList")}
          className="px-3 py-1 text-sm border rounded hover:bg-background transition-colors"
          title="Numbered List"
        >
          1. List
        </button>
        <div className="w-px bg-border mx-1" />
        <button
          type="button"
          onClick={() => {
            const url = prompt("Enter URL:")
            if (url) execCommand("createLink", url)
          }}
          className="px-3 py-1 text-sm border rounded hover:bg-background transition-colors"
          title="Insert Link"
        >
          Link
        </button>
        <button
          type="button"
          onClick={() => execCommand("removeFormat")}
          className="px-3 py-1 text-sm border rounded hover:bg-background transition-colors"
          title="Clear Formatting"
        >
          Clear
        </button>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="min-h-[300px] p-4 border border-t-0 rounded-b-md prose prose-sm max-w-none focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        style={{
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
        }}
      />

      {/* Hidden input to store the HTML content */}
      <input ref={hiddenInputRef} type="hidden" id={id} name={name} defaultValue={defaultValue} required={required} />
    </div>
  )
}
