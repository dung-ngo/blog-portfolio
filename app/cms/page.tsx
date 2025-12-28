import { Suspense } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SkillsManager } from "@/components/cms/skills-manager"
import { ExperiencesManager } from "@/components/cms/experiences-manager"
import { ProjectsManager } from "@/components/cms/projects-manager"
import { BlogManager } from "@/components/cms/blog-manager"
import { ContactSubmissions } from "@/components/cms/contact-submissions"
import { Loader2 } from "lucide-react"

export default function CMSPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Content Management System</h1>
        <p className="text-muted-foreground">Manage your portfolio content, blog posts, and submissions</p>
      </div>

      <Tabs defaultValue="skills" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 lg:w-auto">
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="experiences">Experiences</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="blog">Blog</TabsTrigger>
          <TabsTrigger value="submissions">Submissions</TabsTrigger>
        </TabsList>

        <TabsContent value="skills">
          <Card>
            <CardHeader>
              <CardTitle>Skills Management</CardTitle>
              <CardDescription>Add, edit, or remove skills from your portfolio</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<Loader2 className="h-8 w-8 animate-spin mx-auto" />}>
                <SkillsManager />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="experiences">
          <Card>
            <CardHeader>
              <CardTitle>Experience Management</CardTitle>
              <CardDescription>Manage your work experience and career history</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<Loader2 className="h-8 w-8 animate-spin mx-auto" />}>
                <ExperiencesManager />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects">
          <Card>
            <CardHeader>
              <CardTitle>Projects Management</CardTitle>
              <CardDescription>Showcase your best work and side projects</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<Loader2 className="h-8 w-8 animate-spin mx-auto" />}>
                <ProjectsManager />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blog">
          <Card>
            <CardHeader>
              <CardTitle>Blog Management</CardTitle>
              <CardDescription>Create and manage your blog posts</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<Loader2 className="h-8 w-8 animate-spin mx-auto" />}>
                <BlogManager />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="submissions">
          <Card>
            <CardHeader>
              <CardTitle>Contact Submissions</CardTitle>
              <CardDescription>View and manage contact form submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<Loader2 className="h-8 w-8 animate-spin mx-auto" />}>
                <ContactSubmissions />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
