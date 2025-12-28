"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Pencil, Trash2, Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { format } from "date-fns"

type Experience = {
  id: string
  company: string
  position: string
  location: string | null
  start_date: string
  end_date: string | null
  description: string | null
  technologies: string[] | null
  display_order: number
  is_visible: boolean
}

export function ExperiencesManager() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const { toast } = useToast()
  const supabase = createClient()

  const fetchExperiences = async () => {
    const { data, error } = await supabase.from("experiences").select("*").order("display_order")

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" })
    } else {
      setExperiences(data || [])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchExperiences()
  }, [])

  const handleSave = async (formData: FormData) => {
    const technologies = (formData.get("technologies") as string).split(",").map((t) => t.trim())

    const experience = {
      company: formData.get("company") as string,
      position: formData.get("position") as string,
      location: formData.get("location") as string,
      start_date: formData.get("start_date") as string,
      end_date: (formData.get("end_date") as string) || null,
      description: formData.get("description") as string,
      technologies,
      display_order: Number.parseInt(formData.get("display_order") as string),
      is_visible: formData.get("is_visible") === "on",
    }

    let error
    if (editingExperience) {
      const { error: updateError } = await supabase
        .from("experiences")
        .update(experience)
        .eq("id", editingExperience.id)
      error = updateError
    } else {
      const { error: insertError } = await supabase.from("experiences").insert(experience)
      error = insertError
    }

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" })
    } else {
      toast({ title: "Success", description: `Experience ${editingExperience ? "updated" : "added"} successfully` })
      setDialogOpen(false)
      setEditingExperience(null)
      fetchExperiences()
    }
  }

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("experiences").delete().eq("id", id)

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" })
    } else {
      toast({ title: "Success", description: "Experience deleted successfully" })
      fetchExperiences()
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingExperience(null)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Experience
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingExperience ? "Edit Experience" : "Add Experience"}</DialogTitle>
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
                <Label htmlFor="company">Company</Label>
                <Input id="company" name="company" defaultValue={editingExperience?.company} required />
              </div>
              <div>
                <Label htmlFor="position">Position</Label>
                <Input id="position" name="position" defaultValue={editingExperience?.position} required />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input id="location" name="location" defaultValue={editingExperience?.location || ""} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start_date">Start Date</Label>
                  <Input
                    id="start_date"
                    name="start_date"
                    type="date"
                    defaultValue={editingExperience?.start_date}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="end_date">End Date (leave empty if current)</Label>
                  <Input id="end_date" name="end_date" type="date" defaultValue={editingExperience?.end_date || ""} />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={editingExperience?.description || ""}
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="technologies">Technologies (comma-separated)</Label>
                <Input
                  id="technologies"
                  name="technologies"
                  defaultValue={editingExperience?.technologies?.join(", ") || ""}
                />
              </div>
              <div>
                <Label htmlFor="display_order">Display Order</Label>
                <Input
                  id="display_order"
                  name="display_order"
                  type="number"
                  defaultValue={editingExperience?.display_order || 0}
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="is_visible" name="is_visible" defaultChecked={editingExperience?.is_visible ?? true} />
                <Label htmlFor="is_visible">Visible</Label>
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
            <TableHead>Company</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Period</TableHead>
            <TableHead>Order</TableHead>
            <TableHead>Visible</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {experiences.map((experience) => (
            <TableRow key={experience.id}>
              <TableCell>{experience.company}</TableCell>
              <TableCell>{experience.position}</TableCell>
              <TableCell>
                {format(new Date(experience.start_date), "MMM yyyy")} -{" "}
                {experience.end_date ? format(new Date(experience.end_date), "MMM yyyy") : "Present"}
              </TableCell>
              <TableCell>{experience.display_order}</TableCell>
              <TableCell>{experience.is_visible ? "Yes" : "No"}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      setEditingExperience(experience)
                      setDialogOpen(true)
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="icon" onClick={() => handleDelete(experience.id)}>
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
