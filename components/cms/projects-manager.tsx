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

type Project = {
  id: string
  title: string
  description: string
  long_description: string | null
  image_url: string | null
  demo_url: string | null
  github_url: string | null
  technologies: string[] | null
  category: string
  featured: boolean
  display_order: number
  is_visible: boolean
}

export function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const { toast } = useToast()
  const supabase = createClient()

  const fetchProjects = async () => {
    const { data, error } = await supabase.from("projects").select("*").order("display_order")

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" })
    } else {
      setProjects(data || [])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const handleSave = async (formData: FormData) => {
    const technologies = (formData.get("technologies") as string).split(",").map((t) => t.trim())

    const project = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      long_description: formData.get("long_description") as string,
      image_url: formData.get("image_url") as string,
      demo_url: formData.get("demo_url") as string,
      github_url: formData.get("github_url") as string,
      technologies,
      category: formData.get("category") as string,
      featured: formData.get("featured") === "on",
      display_order: Number.parseInt(formData.get("display_order") as string),
      is_visible: formData.get("is_visible") === "on",
    }

    let error
    if (editingProject) {
      const { error: updateError } = await supabase.from("projects").update(project).eq("id", editingProject.id)
      error = updateError
    } else {
      const { error: insertError } = await supabase.from("projects").insert(project)
      error = insertError
    }

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" })
    } else {
      toast({ title: "Success", description: `Project ${editingProject ? "updated" : "added"} successfully` })
      setDialogOpen(false)
      setEditingProject(null)
      fetchProjects()
    }
  }

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("projects").delete().eq("id", id)

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" })
    } else {
      toast({ title: "Success", description: "Project deleted successfully" })
      fetchProjects()
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingProject(null)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProject ? "Edit Project" : "Add Project"}</DialogTitle>
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
                <Input id="title" name="title" defaultValue={editingProject?.title} required />
              </div>
              <div>
                <Label htmlFor="description">Short Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={editingProject?.description}
                  rows={2}
                  required
                />
              </div>
              <div>
                <Label htmlFor="long_description">Long Description</Label>
                <Textarea
                  id="long_description"
                  name="long_description"
                  defaultValue={editingProject?.long_description || ""}
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="image_url">Image URL</Label>
                <Input id="image_url" name="image_url" defaultValue={editingProject?.image_url || ""} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="demo_url">Demo URL</Label>
                  <Input id="demo_url" name="demo_url" defaultValue={editingProject?.demo_url || ""} />
                </div>
                <div>
                  <Label htmlFor="github_url">GitHub URL</Label>
                  <Input id="github_url" name="github_url" defaultValue={editingProject?.github_url || ""} />
                </div>
              </div>
              <div>
                <Label htmlFor="technologies">Technologies (comma-separated)</Label>
                <Input
                  id="technologies"
                  name="technologies"
                  defaultValue={editingProject?.technologies?.join(", ") || ""}
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select name="category" defaultValue={editingProject?.category}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web">Web</SelectItem>
                    <SelectItem value="mobile">Mobile</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="display_order">Display Order</Label>
                <Input
                  id="display_order"
                  name="display_order"
                  type="number"
                  defaultValue={editingProject?.display_order || 0}
                  required
                />
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Switch id="featured" name="featured" defaultChecked={editingProject?.featured ?? false} />
                  <Label htmlFor="featured">Featured</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="is_visible" name="is_visible" defaultChecked={editingProject?.is_visible ?? true} />
                  <Label htmlFor="is_visible">Visible</Label>
                </div>
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
            <TableHead>Featured</TableHead>
            <TableHead>Order</TableHead>
            <TableHead>Visible</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell>{project.title}</TableCell>
              <TableCell className="capitalize">{project.category}</TableCell>
              <TableCell>{project.featured ? "Yes" : "No"}</TableCell>
              <TableCell>{project.display_order}</TableCell>
              <TableCell>{project.is_visible ? "Yes" : "No"}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      setEditingProject(project)
                      setDialogOpen(true)
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="icon" onClick={() => handleDelete(project.id)}>
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
