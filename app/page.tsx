import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";
import { FloatingContactButtons } from "@/components/floating-contact-buttons";

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
            Hi, I'm <span className="text-primary">June Ngo</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground text-balance max-w-2xl mx-auto leading-relaxed">
            A frontend developer focused on building web experiences that are
            visually appealing, accessible, and high‑performing.
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
              Hi! I'm a passionate frontend developer who loves creating
              interactive experiences. My expertise lies in crafting intuitive
              user interfaces and scalable web applications. I am proficient in
              JavaScript and responsive design, excelling at translating design
              mock-ups into responsive UI components that ensure seamless
              cross-device functionality. With a detail-oriented, proactive
              approach, I thrive in fast-paced environments, consistently
              delivering high-quality solutions on time and within budget. I am
              passionate about web app development and committed to continuous
              learning and staying updated with industry trends. I am also
              enhancing my skill set and continually updating my knowledge of
              new technologies to become an expert in my domain.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mt-5">
              Beyond code, I'm deeply interested in animal welfare, artificial
              intelligence ethics, and helping others navigate their career
              journeys in tech. I believe technology should be a force for good,
              and I strive to contribute to projects that align with these
              values.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-6 bg-muted/30" id="skills">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Skills & Technologies
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge>React</Badge>
                  <Badge>Next.js</Badge>
                  <Badge>TypeScript</Badge>
                  <Badge>Tailwind CSS</Badge>
                  <Badge>JavaScript</Badge>
                  <Badge>HTML/CSS/SASS</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge>API integration</Badge>
                  <Badge>Website responsive design</Badge>
                  <Badge>Problem solving</Badge>
                  <Badge>Git controls</Badge>
                  <Badge>Project management</Badge>
                  <Badge>Agile methodology</Badge>
                  <Badge>Performance optimization</Badge>
                  <Badge>Brainstorm/Analyse initiatives</Badge>
                  <Badge>Team collaboration</Badge>
                  <Badge>Accessibility</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Tools</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge>Git</Badge>
                  <Badge>Azure</Badge>
                  <Badge>Vercel</Badge>
                  <Badge>Vite/Webpack</Badge>
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
                    <h3 className="text-xl font-semibold">
                      Front-End Developer - Technical Solutions (Google project)
                    </h3>
                    <p className="text-muted-foreground">
                      TDCX Malaysia | Full-time
                    </p>
                  </div>
                  <Badge variant="secondary">06/2025 - 02/2026</Badge>
                </div>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>
                    Supported numerous Google clients by delivering tailored
                    technical solutions that improved ads performance and
                    tracking accuracy on advertisers' website/web app
                  </li>
                  <li>
                    Successfully deployed and optimized HTML/JavaScript tags,
                    conversion tracking, and remarketing setups, resulting in
                    more reliable campaign data and better ROI for clients
                  </li>
                  <li>
                    Conducted advanced troubleshooting for Google Ads and
                    Analytics, Merchant Center resolving complex tracking and
                    implementation issues with a high client satisfaction rate
                  </li>
                  <li>
                    Provided expert consultation and training on web performance
                    optimization and tagging best practices, empowering clients
                    to manage their campaigns more efficiently
                  </li>
                  <li>
                    Collaborated with Google’s product teams by identifying and
                    reporting platform issues, contributing to continuous
                    product enhancements
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-xl font-semibold">
                      Project manager and Front-end developer
                    </h3>
                    <p className="text-muted-foreground">
                      Vive (NPO) |{" "}
                      <a href="http://www.vive.org.vn/" target="_blank">
                        http://www.vive.org.vn/
                      </a>{" "}
                      | Freelancer
                    </p>
                  </div>
                  <Badge variant="secondary">10/2023 - Present</Badge>
                </div>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>
                    Designed and developed the official website for Vive, a
                    non-profit organization dedicated to promoting a vegan
                    lifestyle as a way to reduce air pollution and protect the
                    environment
                  </li>
                  <li>
                    Built the site using modern web technologies to ensure a
                    clean, accessible, and user-friendly interface that
                    effectively communicates the organization’s mission and
                    educational content
                  </li>
                  <li>
                    Collaborated with the NGO team to structure and present
                    information in a way that encourages visitors to make more
                    sustainable lifestyle choices
                  </li>
                  <li>
                    Focused on responsive design and performance optimization to
                    provide a seamless experience across desktop and mobile
                    devices
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-xl font-semibold">Project manager</h3>
                    <p className="text-muted-foreground">
                      Delash Australia |{" "}
                      <a href="http://delash.com.au/" target="_blank">
                        http://delash.com.au/
                      </a>{" "}
                      | Freelancer
                    </p>
                  </div>
                  <Badge variant="secondary">4/2025 - 7/2025</Badge>
                </div>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>
                    Managed end-to-end delivery of freelance website development
                    projects from planning to launch
                  </li>
                  <li>
                    Facilitated daily stand-ups to align designers, developers,
                    and stakeholders
                  </li>
                  <li>
                    Translated client requirements into clear tasks, timelines,
                    and priorities
                  </li>
                  <li>
                    Monitored progress and proactively resolved blockers to keep
                    projects on schedule
                  </li>
                  <li>
                    Ensured all milestones and final deliverables met agreed
                    deadlines and quality standards
                  </li>
                  <li>
                    Maintained clear communication with clients, contributing to
                    smooth collaboration and satisfaction
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-xl font-semibold">Co-founder</h3>
                    <p className="text-muted-foreground">
                      EON STUDIOS LLC (Concept Stage)
                    </p>
                  </div>
                  <Badge variant="secondary">12/2024 - 05/2025</Badge>
                </div>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>
                    Co-founded a business with a partner to deliver
                    comprehensive, all-in-one technical solutions for startups
                    worldwide
                  </li>
                  <li>
                    Conducted customer-focused brainstorming sessions to
                    identify needs, refine initiatives, and align solutions with
                    business goals
                  </li>
                  <li>
                    Developed design concepts and user experiences tailored to
                    each client’s brand identity and target audience
                  </li>
                  <li>
                    Provided technical architecture and solution planning,
                    ensuring scalability, efficiency, and cost-effectiveness for
                    new ventures
                  </li>
                  <li>
                    Built and deployed websites, web applications, and mobile
                    applications using modern frameworks and tools, serving
                    clients across different industries and regions
                  </li>
                  <li>
                    Managed end-to-end project delivery, from ideation through
                    launch, maintaining clear communication and client
                    satisfaction throughout
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-xl font-semibold">
                      Front-end developer
                    </h3>
                    <p className="text-muted-foreground">
                      Bosch Global Software Technologies Limited | Full-time
                    </p>
                  </div>
                  <Badge variant="secondary">08/2021 - 11/2024</Badge>
                </div>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>
                    Maintained and optimized existing React-based systems,
                    ensuring stable performance, clean code, and improved UI
                    responsiveness across multiple projects
                  </li>
                  <li>
                    Architected scalable front-end structures that supported
                    evolving user interface concepts and improved long-term
                    maintainability
                  </li>
                  <li>
                    Collaborated closely with cross-functional teams—including
                    designers, back-end developers, and product managers—to
                    translate complex requirements into functional,
                    user-friendly interfaces
                  </li>
                  <li>
                    Designed and developed custom reusable components tailored
                    to project needs, which significantly reduced development
                    time and improved code consistency across applications
                  </li>
                  <li>
                    Continuously monitored front-end performance, identified UI
                    bottlenecks, and implemented optimization strategies that
                    enhanced loading speed and user engagement
                  </li>
                  <li>
                    Oversaw CI/CD workflows to ensure smooth deployments and
                    minimal downtime during releases
                  </li>
                  <li>
                    Managed and updated project dependencies, proactively
                    resolving compatibility issues to maintain a reliable and
                    efficient development environment
                  </li>
                  <li>
                    Contributed to team knowledge sharing by documenting best
                    practices, mentoring new developers, and promoting clean
                    code principles
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Volunteering Section */}
      <section className="py-20 px-6" id="volunteering">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Volunteering</h2>
          <div className="space-y-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-xl font-semibold">
                      Logistics Coordinator
                    </h3>
                    <p className="text-muted-foreground">
                      Effective Altruism Singapore
                    </p>
                  </div>
                  <Badge variant="secondary">11/2025</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-xl font-semibold">Translator</h3>
                    <p className="text-muted-foreground">
                      Effective Altruism Vietnam
                    </p>
                  </div>
                  <Badge variant="secondary">09/2025 - 10/2025</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-xl font-semibold">
                      Volunteer at Vegan Festival
                    </h3>
                    <p className="text-muted-foreground">
                      The Vegan Society Malaysia
                    </p>
                  </div>
                  <Badge variant="secondary">09/2025</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-xl font-semibold">
                      Volunteer at Vegan Festival
                    </h3>
                    <p className="text-muted-foreground">Vive Vietnam</p>
                  </div>
                  <Badge variant="secondary">12/2022 - 12/2024</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-6 bg-muted/30" id="projects">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="overflow-hidden group hover:shadow-lg transition-shadow pt-0">
              <div className="aspect-video bg-white relative overflow-hidden p-10">
                {/* <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" /> */}
                <img src="/img/vivegreen.png" alt="Vive-project" />
              </div>
              <CardContent className="pt-0">
                <h3 className="text-xl font-semibold mb-2">Vive</h3>
                <p className="text-muted-foreground mb-4">
                  A full-stack platform featuring a clean, responsive design
                  with bilingual support. It seamlessly integrates social media
                  engagement, community-building features, and compelling
                  storytelling through campaigns and multimedia content to
                  promote veganism and environmental awareness.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline">Next.js</Badge>
                  <Badge variant="outline">TypeScript</Badge>
                  <Badge variant="outline">Srapi</Badge>
                  <Badge variant="outline">Vercel</Badge>
                  <Badge variant="outline">Notion</Badge>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" asChild>
                    <a
                      href="https://vive.org.vn "
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Visit
                    </a>
                  </Button>
                  {/* <Button size="sm" variant="outline" asChild>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </a>
                  </Button> */}
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden group hover:shadow-lg transition-shadow pt-0">
              <div className="aspect-video bg-white relative overflow-hidden">
                {/* <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" /> */}
                <img
                  src="/img/delash.jpg"
                  alt="Delash-project"
                  className="h-60 w-full object-cover"
                />
              </div>
              <CardContent className="pt-0">
                <h3 className="text-xl font-semibold mb-2">Delash</h3>
                <p className="text-muted-foreground mb-4">
                  A platform integrates online booking, service catalogs, and
                  multimedia galleries to showcase beauty treatments. The site
                  emphasizes user experience with mobile optimization, social
                  media connectivity, and streamlined customer engagement tools,
                  effectively promoting Delash’s lash, brow, and skincare
                  services.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline">Wordpress</Badge>
                  <Badge variant="outline">Trello</Badge>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" asChild>
                    <a
                      href="https://delash.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Visit
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden group hover:shadow-lg transition-shadow pt-0">
              <div className="aspect-video bg-gradient-to-br from-orange-500 to-pink-600 relative overflow-hidden">
                {/* <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" /> */}
                <img src="/img/wattpad.jpg" alt="watpad-clone-project" />
              </div>
              <CardContent className="pt-0">
                <h3 className="text-xl font-semibold mb-2">Wattpad clone</h3>
                <p className="text-muted-foreground mb-4">
                  A clone of the popular storytelling platform designed to help
                  writers develop and organize story ideas, plot outlines, and
                  character profiles. It prioritizes user experience through
                  intuitive navigation, personalization features, and tools to
                  overcome creative blocks.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline">Next.js</Badge>
                  <Badge variant="outline">TypeScript</Badge>
                  <Badge variant="outline">Supabase</Badge>
                  <Badge variant="outline">Vercel</Badge>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" asChild>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Coming soon
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-orange-500 to-pink-600 relative overflow-hidden">
                {/* <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" /> */}
                <img
                  src="/img/crypto-wallet.jpg"
                  alt="crypto-wallet"
                  className="w-full h-60 object-cover"
                />
              </div>
              <CardContent className="pt-0">
                <h3 className="text-xl font-semibold mb-2">Crypto swapper</h3>
                <p className="text-muted-foreground mb-4">
                  A responsive design tool with an intuitive UI for token
                  swapping. The site emphasizes user experience with mobile
                  optimization, clear interaction flows, and handling of
                  blockchain operations
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline">Next.js</Badge>
                  <Badge variant="outline">TypeScript</Badge>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" asChild>
                    <a
                      href="https://june-swapper.netlify.app"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Visit
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
          <h2 className="text-3xl md:text-4xl font-bold">
            Let's Work Together
          </h2>
          <p className="text-xl text-muted-foreground text-balance">
            I'm always interested in hearing about new projects and
            opportunities
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Button size="lg" asChild>
              <Link href="/contact">Get In Touch</Link>
            </Button>
            {/* <Button size="lg" variant="outline" asChild>
              <Link href="/blog">Read My Blog</Link>
            </Button> */}
          </div>
        </div>
      </section>

      {/* Floating Contact Buttons */}
      <FloatingContactButtons />
    </main>
  );
}
