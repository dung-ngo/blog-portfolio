import { createClient } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Calendar } from "lucide-react"

export const dynamic = "force-dynamic"

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  category: string
  category_color: string
  cover_image: string
  created_at: string
}

interface PageProps {
  searchParams: Promise<{ category?: string }>
}

export default async function BlogPage({ searchParams }: PageProps) {
  const params = await searchParams
  const category = params.category

  const supabase = await createClient()

  // Fetch blog posts from Supabase with optional category filter
  const query = supabase.from("blog_posts").select("*").eq("published", true).order("created_at", { ascending: false })

  if (category) {
    query.eq("category", category)
  }

  const { data: posts, error } = await query

  if (error) {
    console.error("[v0] Error fetching blog posts:", error)
  }

  const blogPosts: BlogPost[] = posts || []

  const categoryNames: Record<string, string> = {
    "animal-welfare": "Animal Welfare",
    "ai-related": "AI Related",
    "career-guidance": "Career Guidance",
  }

  const displayCategory = category ? categoryNames[category] || category : "All Posts"

  return (
    <main className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-balance">Blog</h1>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            Thoughts on technology, animal welfare, and career development
          </p>
          {category && (
            <div className="flex justify-center pt-2">
              <Badge variant="secondary" className="text-sm">
                {displayCategory}
              </Badge>
            </div>
          )}
        </div>

        {/* Blog Posts Grid */}
        {blogPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <Card className="overflow-hidden group hover:shadow-lg transition-all h-full">
                  <div className="aspect-video overflow-hidden bg-muted">
                    <img
                      src={post.cover_image || "/placeholder.svg?height=400&width=800"}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="pt-6 flex flex-col gap-3">
                    <Badge
                      variant="outline"
                      className="w-fit"
                      style={{
                        backgroundColor: `${post.category_color}20`,
                        borderColor: post.category_color,
                        color: post.category_color,
                      }}
                    >
                      {categoryNames[post.category] || post.category}
                    </Badge>
                    <h2 className="text-xl font-semibold group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground text-sm line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-auto pt-2">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No blog posts found in this category.</p>
          </div>
        )}
      </div>
    </main>
  )
}
