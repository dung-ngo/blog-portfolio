import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Github, ExternalLink } from "lucide-react"
import { FloatingContactButtons } from "@/components/floating-contact-buttons"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-background to-muted/20 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-block">
            <Badge variant="secondary" className="mb-4">
              Available for opportunities
            </Badge>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance">
            Hi, I'm <span className="text-primary">Your Name</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground text-balance max-w-2xl mx-auto leading-relaxed">
            A passionate frontend developer creating beautiful, accessible, and performant web experiences
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Button size="lg" asChild>
              <Link href="#projects">View Projects</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">Contact Me</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6" id="about">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">About Me</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm a frontend developer with a passion for creating intuitive and engaging user experiences. With
              expertise in modern web technologies, I specialize in building responsive, accessible, and performant
              applications that make a difference.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Beyond code, I'm deeply interested in animal welfare, artificial intelligence ethics, and helping others
              navigate their career journeys in tech. I believe technology should be a force for good, and I strive to
              contribute to projects that align with these values.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-6 bg-muted/30" id="skills">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Skills & Technologies</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Frontend Development</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge>React</Badge>
                  <Badge>Next.js</Badge>
                  <Badge>TypeScript</Badge>
                  <Badge>Tailwind CSS</Badge>
                  <Badge>JavaScript</Badge>
                  <Badge>HTML/CSS</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Backend & Database</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge>Node.js</Badge>
                  <Badge>Supabase</Badge>
                  <Badge>PostgreSQL</Badge>
                  <Badge>REST APIs</Badge>
                  <Badge>SQL</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Tools & Practices</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge>Git</Badge>
                  <Badge>GitHub</Badge>
                  <Badge>Vercel</Badge>
                  <Badge>Responsive Design</Badge>
                  <Badge>Accessibility</Badge>
                  <Badge>Performance</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 px-6" id="experience">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Experience</h2>
          <div className="space-y-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-xl font-semibold">Frontend Developer</h3>
                    <p className="text-muted-foreground">Tech Company Name</p>
                  </div>
                  <Badge variant="secondary">2022 - Present</Badge>
                </div>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Built and maintained multiple client-facing web applications using React and Next.js</li>
                  <li>Collaborated with design teams to implement pixel-perfect, responsive interfaces</li>
                  <li>Improved application performance by 40% through code optimization and lazy loading</li>
                  <li>Mentored junior developers and conducted code reviews</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-xl font-semibold">Junior Frontend Developer</h3>
                    <p className="text-muted-foreground">Startup Company</p>
                  </div>
                  <Badge variant="secondary">2020 - 2022</Badge>
                </div>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Developed reusable UI components using React and TypeScript</li>
                  <li>Implemented responsive designs and ensured cross-browser compatibility</li>
                  <li>Participated in agile development processes and sprint planning</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-6 bg-muted/30" id="projects">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              </div>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2">E-commerce Platform</h3>
                <p className="text-muted-foreground mb-4">
                  A full-stack e-commerce solution with cart management, payment integration, and admin dashboard
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline">Next.js</Badge>
                  <Badge variant="outline">Stripe</Badge>
                  <Badge variant="outline">Supabase</Badge>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" asChild>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Demo
                    </a>
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-green-500 to-emerald-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              </div>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2">Wildlife Tracker</h3>
                <p className="text-muted-foreground mb-4">
                  Conservation tool for tracking wildlife sightings with real-time mapping and data visualization
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline">React</Badge>
                  <Badge variant="outline">Mapbox</Badge>
                  <Badge variant="outline">Charts</Badge>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" asChild>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Demo
                    </a>
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-orange-500 to-pink-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              </div>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2">AI Writing Assistant</h3>
                <p className="text-muted-foreground mb-4">
                  Content generation tool powered by AI to help writers overcome creative blocks
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline">Next.js</Badge>
                  <Badge variant="outline">OpenAI</Badge>
                  <Badge variant="outline">TypeScript</Badge>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" asChild>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Demo
                    </a>
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Let's Work Together</h2>
          <p className="text-xl text-muted-foreground text-balance">
            I'm always interested in hearing about new projects and opportunities
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Button size="lg" asChild>
              <Link href="/contact">Get In Touch</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/blog">Read My Blog</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Floating Contact Buttons */}
      <FloatingContactButtons />
    </main>
  )
}
