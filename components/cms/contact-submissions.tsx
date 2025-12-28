"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Trash2, Eye } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { format } from "date-fns"

type ContactSubmission = {
  id: string
  name: string
  email: string
  subject: string
  message: string
  created_at: string
}

export function ContactSubmissions() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const { toast } = useToast()
  const supabase = createClient()

  const fetchSubmissions = async () => {
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" })
    } else {
      setSubmissions(data || [])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchSubmissions()
  }, [])

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("contact_submissions").delete().eq("id", id)

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" })
    } else {
      toast({ title: "Success", description: "Submission deleted successfully" })
      fetchSubmissions()
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground">
                No submissions yet
              </TableCell>
            </TableRow>
          ) : (
            submissions.map((submission) => (
              <TableRow key={submission.id}>
                <TableCell>{submission.name}</TableCell>
                <TableCell>{submission.email}</TableCell>
                <TableCell>{submission.subject}</TableCell>
                <TableCell>{format(new Date(submission.created_at), "MMM dd, yyyy")}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Dialog open={dialogOpen && selectedSubmission?.id === submission.id} onOpenChange={setDialogOpen}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            setSelectedSubmission(submission)
                            setDialogOpen(true)
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Contact Submission Details</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm font-medium">Name</p>
                            <p className="text-sm text-muted-foreground">{submission.name}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Email</p>
                            <p className="text-sm text-muted-foreground">{submission.email}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Subject</p>
                            <p className="text-sm text-muted-foreground">{submission.subject}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Message</p>
                            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{submission.message}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Date</p>
                            <p className="text-sm text-muted-foreground">
                              {format(new Date(submission.created_at), "MMMM dd, yyyy 'at' h:mm a")}
                            </p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button variant="destructive" size="icon" onClick={() => handleDelete(submission.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
