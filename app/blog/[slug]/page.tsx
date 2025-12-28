import { createClient } from "@/lib/supabase/server"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

export const dynamic = "force-dynamic"

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  category_color: string
  cover_image: string
  created_at: string
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params

  const supabase = await createClient()

  // Fetch the blog post by slug
  const { data: post, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single()

  if (error || !post) {
    console.error("[v0] Error fetching blog post:", error)
    notFound()
  }

  const blogPost: BlogPost = post

  const categoryNames: Record<string, string> = {
    "animal-welfare": "Animal Welfare",
    "ai-related": "AI Related",
    "career-guidance": "Career Guidance",
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section with Cover Image */}
      <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden bg-muted">
        <img
          src={blogPost.cover_image || "/placeholder.svg?height=800&width=1600"}
          alt={blogPost.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-background/20" />
      </div>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-6 -mt-32 relative z-10">
        <div className="bg-card rounded-lg shadow-xl p-8 md:p-12">
          {/* Back Button */}
          <Button variant="ghost" size="sm" className="mb-6" asChild>
            <Link href="/blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
          </Button>

          {/* Category Badge */}
          <Badge
            variant="secondary"
            className="mb-4"
            style={{
              backgroundColor: `${blogPost.category_color}20`,
              borderColor: blogPost.category_color,
              color: blogPost.category_color,
            }}
          >
            {categoryNames[blogPost.category] || blogPost.category}
          </Badge>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">{blogPost.title}</h1>

          {/* Metadata */}
          <div className="flex items-center gap-2 text-muted-foreground mb-8 pb-8 border-b">
            <Calendar className="h-4 w-4" />
            <time dateTime={blogPost.created_at}>
              {new Date(blogPost.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>

          {/* Content */}
          <div
            className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h3:text-xl prose-p:text-lg prose-p:leading-relaxed prose-a:text-primary prose-a:underline"
            dangerouslySetInnerHTML={{ __html: blogPost.content }}
          />
        </div>

        {/* Related Posts Section */}
        <RelatedPosts currentSlug={slug} category={blogPost.category} />
      </article>
    </main>
  )
}

async function RelatedPosts({ currentSlug, category }: { currentSlug: string; category: string }) {
  const supabase = await createClient()

  // Fetch related posts from the same category
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("id, title, slug, excerpt, category, category_color, cover_image")
    .eq("category", category)
    .eq("published", true)
    .neq("slug", currentSlug)
    .limit(3)

  const relatedPosts = posts || []

  if (relatedPosts.length === 0) {
    return null
  }

  const categoryNames: Record<string, string> = {
    "animal-welfare": "Animal Welfare",
    "ai-related": "AI Related",
    "career-guidance": "Career Guidance",
  }

  return (
    <section className="mt-16 mb-12">
      <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`}>
            <div className="group">
              <div className="aspect-video overflow-hidden rounded-lg bg-muted mb-3">
                <img
                  src={post.cover_image || "/placeholder.svg?height=300&width=600"}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <Badge
                variant="outline"
                className="mb-2"
                style={{
                  backgroundColor: `${post.category_color}20`,
                  borderColor: post.category_color,
                  color: post.category_color,
                }}
              >
                {categoryNames[post.category] || post.category}
              </Badge>
              <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
