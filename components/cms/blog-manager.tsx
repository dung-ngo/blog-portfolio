"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Pencil, Trash2, Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { format } from "date-fns"
import { RichTextEditor } from "@/components/rich-text-editor"

type BlogPost = {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  category_color: string
  published: boolean
  created_at: string
}

export function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const { toast } = useToast()
  const supabase = createClient()

  const fetchPosts = async () => {
    const { data, error } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false })

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" })
    } else {
      setPosts(data || [])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  const handleSave = async (formData: FormData) => {
    const title = formData.get("title") as string
    const post = {
      title,
      slug: (formData.get("slug") as string) || generateSlug(title),
      excerpt: formData.get("excerpt") as string,
      content: formData.get("content") as string,
      category: formData.get("category") as string,
      category_color: formData.get("category_color") as string,
      published: formData.get("published") === "on",
    }

    let error
    if (editingPost) {
      const { error: updateError } = await supabase.from("blog_posts").update(post).eq("id", editingPost.id)
      error = updateError
    } else {
      const { error: insertError } = await supabase.from("blog_posts").insert(post)
      error = insertError
    }

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" })
    } else {
      toast({ title: "Success", description: `Blog post ${editingPost ? "updated" : "added"} successfully` })
      setDialogOpen(false)
      setEditingPost(null)
      fetchPosts()
    }
  }

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("blog_posts").delete().eq("id", id)

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" })
    } else {
      toast({ title: "Success", description: "Blog post deleted successfully" })
      fetchPosts()
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingPost(null)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Blog Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingPost ? "Edit Blog Post" : "Add Blog Post"}</DialogTitle>
            </DialogHeader>
            <form
              action={handleSave}
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault()
                handleSave(new FormData(e.currentTarget))
              }}
            >
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" defaultValue={editingPost?.title} required />
              </div>
              <div>
                <Label htmlFor="slug">Slug (auto-generated if empty)</Label>
                <Input id="slug" name="slug" defaultValue={editingPost?.slug} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select name="category" defaultValue={editingPost?.category}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="animal-welfare">Animal Welfare</SelectItem>
                      <SelectItem value="ai-related">AI Related</SelectItem>
                      <SelectItem value="career-guidance">Career Guidance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="category_color">Category Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="category_color"
                      name="category_color"
                      type="color"
                      defaultValue={editingPost?.category_color || "#fbbf24"}
                      className="w-20 h-10 p-1 cursor-pointer"
                    />
                    <Input
                      type="text"
                      defaultValue={editingPost?.category_color || "#fbbf24"}
                      onChange={(e) => {
                        const colorInput = document.getElementById("category_color") as HTMLInputElement
                        if (colorInput) colorInput.value = e.target.value
                      }}
                      placeholder="#fbbf24"
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea id="excerpt" name="excerpt" defaultValue={editingPost?.excerpt} rows={3} required />
              </div>
              <RichTextEditor
                id="content"
                name="content"
                defaultValue={editingPost?.content}
                label="Content"
                required
              />
              <div className="flex items-center space-x-2">
                <Switch id="published" name="published" defaultChecked={editingPost?.published ?? true} />
                <Label htmlFor="published">Published</Label>
              </div>
              <Button type="submit" className="w-full">
                Save
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Color</TableHead>
            <TableHead>Published</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell>{post.title}</TableCell>
              <TableCell className="capitalize">{post.category.replace("-", " ")}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded border"
                    style={{ backgroundColor: post.category_color || "#fbbf24" }}
                  />
                  <span className="text-xs text-muted-foreground">{post.category_color}</span>
                </div>
              </TableCell>
              <TableCell>{post.published ? "Yes" : "No"}</TableCell>
              <TableCell>{format(new Date(post.created_at), "MMM dd, yyyy")}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      setEditingPost(post)
                      setDialogOpen(true)
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="icon" onClick={() => handleDelete(post.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
