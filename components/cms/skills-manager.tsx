"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Pencil, Trash2, Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type Skill = {
  id: string
  name: string
  category: string
  proficiency: number
  icon: string | null
  display_order: number
  is_visible: boolean
}

export function SkillsManager() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const { toast } = useToast()
  const supabase = createClient()

  const fetchSkills = async () => {
    const { data, error } = await supabase.from("skills").select("*").order("display_order")

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" })
    } else {
      setSkills(data || [])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchSkills()
  }, [])

  const handleSave = async (formData: FormData) => {
    const skill = {
      name: formData.get("name") as string,
      category: formData.get("category") as string,
      proficiency: Number.parseInt(formData.get("proficiency") as string),
      icon: formData.get("icon") as string,
      display_order: Number.parseInt(formData.get("display_order") as string),
      is_visible: formData.get("is_visible") === "on",
    }

    let error
    if (editingSkill) {
      const { error: updateError } = await supabase.from("skills").update(skill).eq("id", editingSkill.id)
      error = updateError
    } else {
      const { error: insertError } = await supabase.from("skills").insert(skill)
      error = insertError
    }

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" })
    } else {
      toast({ title: "Success", description: `Skill ${editingSkill ? "updated" : "added"} successfully` })
      setDialogOpen(false)
      setEditingSkill(null)
      fetchSkills()
    }
  }

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("skills").delete().eq("id", id)

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" })
    } else {
      toast({ title: "Success", description: "Skill deleted successfully" })
      fetchSkills()
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingSkill(null)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Skill
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingSkill ? "Edit Skill" : "Add Skill"}</DialogTitle>
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
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" defaultValue={editingSkill?.name} required />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select name="category" defaultValue={editingSkill?.category}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="frontend">Frontend</SelectItem>
                    <SelectItem value="backend">Backend</SelectItem>
                    <SelectItem value="tools">Tools</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="proficiency">Proficiency (1-100)</Label>
                <Input
                  id="proficiency"
                  name="proficiency"
                  type="number"
                  min="1"
                  max="100"
                  defaultValue={editingSkill?.proficiency}
                  required
                />
              </div>
              <div>
                <Label htmlFor="icon">Icon</Label>
                <Input id="icon" name="icon" defaultValue={editingSkill?.icon || ""} />
              </div>
              <div>
                <Label htmlFor="display_order">Display Order</Label>
                <Input
                  id="display_order"
                  name="display_order"
                  type="number"
                  defaultValue={editingSkill?.display_order || 0}
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="is_visible" name="is_visible" defaultChecked={editingSkill?.is_visible ?? true} />
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
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Proficiency</TableHead>
            <TableHead>Order</TableHead>
            <TableHead>Visible</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {skills.map((skill) => (
            <TableRow key={skill.id}>
              <TableCell>{skill.name}</TableCell>
              <TableCell className="capitalize">{skill.category}</TableCell>
              <TableCell>{skill.proficiency}%</TableCell>
              <TableCell>{skill.display_order}</TableCell>
              <TableCell>{skill.is_visible ? "Yes" : "No"}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      setEditingSkill(skill)
                      setDialogOpen(true)
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="icon" onClick={() => handleDelete(skill.id)}>
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
