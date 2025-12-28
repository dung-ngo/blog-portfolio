"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Pencil, Trash2, Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type Category = {
  id: string
  name: string
  slug: string
  color: string
  created_at: string
}

type CategoryManagerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCategoriesChange?: () => void
}

export function CategoryManager({ open, onOpenChange, onCategoriesChange }: CategoryManagerProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const [postCounts, setPostCounts] = useState<Record<string, number>>({})
  const { toast } = useToast()
  const supabase = createClient()

  const fetchCategories = async () => {
    const { data, error } = await supabase.from("categories").select("*").order("created_at", { ascending: true })

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" })
    } else {
      setCategories(data || [])
    }
    setLoading(false)
  }

  const fetchPostCounts = async () => {
    const { data, error } = await supabase.from("blog_posts").select("category")

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" })
    } else {
      const counts: Record<string, number> = {}
      data?.forEach((post) => {
        counts[post.category] = (counts[post.category] || 0) + 1
      })
      setPostCounts(counts)
    }
  }

  useEffect(() => {
    if (open) {
      fetchCategories()
      fetchPostCounts()
    }
  }, [open])

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  const handleSave = async (formData: FormData) => {
    const name = formData.get("name") as string
    const category = {
      name,
      slug: (formData.get("slug") as string) || generateSlug(name),
      color: formData.get("color") as string,
    }

    let error
    if (editingCategory) {
      // Don't allow editing 'Unassigned' category
      if (editingCategory.slug === "unassigned") {
        toast({ title: "Error", description: "Cannot edit the Unassigned category", variant: "destructive" })
        return
      }

      const { error: updateError } = await supabase.from("categories").update(category).eq("id", editingCategory.id)
      error = updateError
    } else {
      const { error: insertError } = await supabase.from("categories").insert(category)
      error = insertError
    }

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" })
    } else {
      toast({ title: "Success", description: `Category ${editingCategory ? "updated" : "added"} successfully` })
      setFormOpen(false)
      setEditingCategory(null)
      fetchCategories()
      onCategoriesChange?.()
    }
  }

  const handleDelete = async (category: Category) => {
    // Don't allow deleting 'Unassigned' category
    if (category.slug === "unassigned") {
      toast({ title: "Error", description: "Cannot delete the Unassigned category", variant: "destructive" })
      return
    }

    // Check if category is in use
    const postCount = postCounts[category.slug] || 0
    if (postCount > 0) {
      toast({
        title: "Cannot Delete",
        description: `This category is used by ${postCount} post${postCount > 1 ? "s" : ""}. Please reassign or delete those posts first.`,
        variant: "destructive",
      })
      return
    }

    const { error } = await supabase.from("categories").delete().eq("id", category.id)

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" })
    } else {
      toast({ title: "Success", description: "Category deleted successfully" })
      fetchCategories()
      onCategoriesChange?.()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Manage Categories</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex justify-end">
            <Dialog open={formOpen} onOpenChange={setFormOpen}>
              <Button onClick={() => setEditingCategory(null)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Category
              </Button>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingCategory ? "Edit Category" : "Add Category"}</DialogTitle>
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
                    <Label htmlFor="cat-name">Name</Label>
                    <Input id="cat-name" name="name" defaultValue={editingCategory?.name} required />
                  </div>
                  <div>
                    <Label htmlFor="cat-slug">Slug (auto-generated if empty)</Label>
                    <Input id="cat-slug" name="slug" defaultValue={editingCategory?.slug} />
                  </div>
                  <div>
                    <Label htmlFor="cat-color">Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="cat-color"
                        name="color"
                        type="color"
                        defaultValue={editingCategory?.color || "#fbbf24"}
                        className="w-20 h-10 p-1 cursor-pointer"
                      />
                      <Input
                        type="text"
                        defaultValue={editingCategory?.color || "#fbbf24"}
                        onChange={(e) => {
                          const colorInput = document.getElementById("cat-color") as HTMLInputElement
                          if (colorInput) colorInput.value = e.target.value
                        }}
                        placeholder="#fbbf24"
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full">
                    Save
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {loading ? (
            <div>Loading...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Color</TableHead>
                  <TableHead>Posts</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell className="text-muted-foreground">{category.slug}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-6 h-6 rounded border border-border"
                          style={{ backgroundColor: category.color }}
                        />
                        <span className="text-xs text-muted-foreground">{category.color}</span>
                      </div>
                    </TableCell>
                    <TableCell>{postCounts[category.slug] || 0}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            setEditingCategory(category)
                            setFormOpen(true)
                          }}
                          disabled={category.slug === "unassigned"}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => handleDelete(category)}
                          disabled={category.slug === "unassigned" || (postCounts[category.slug] || 0) > 0}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
