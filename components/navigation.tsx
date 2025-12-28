"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const blogCategories = [
    { name: "All Posts", href: "/blog" },
    { name: "Animal Welfare", href: "/blog?category=animal-welfare" },
    { name: "AI Related", href: "/blog?category=ai-related" },
    { name: "Career Guidance", href: "/blog?category=career-guidance" },
  ]

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center justify-between px-6">
        <Link href="/" className="text-xl font-bold">
          Portfolio
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/#about" className="text-sm font-medium hover:text-primary transition-colors">
            About
          </Link>
          <Link href="/#projects" className="text-sm font-medium hover:text-primary transition-colors">
            Projects
          </Link>

          {/* Blog Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors">
              Blog
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {blogCategories.map((category) => (
                <DropdownMenuItem key={category.href} asChild>
                  <Link href={category.href}>{category.name}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle Button */}
          <ThemeToggle />

          <Button asChild size="sm">
            <Link href="/contact">Contact</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          {/* Theme Toggle for Mobile */}
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "md:hidden border-b bg-background overflow-hidden transition-all",
          mobileMenuOpen ? "max-h-96" : "max-h-0",
        )}
      >
        <div className="container px-6 py-4 space-y-3">
          <Link
            href="/"
            className="block text-sm font-medium hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/#about"
            className="block text-sm font-medium hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link
            href="/#projects"
            className="block text-sm font-medium hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Projects
          </Link>
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Blog</p>
            {blogCategories.map((category) => (
              <Link
                key={category.href}
                href={category.href}
                className="block pl-4 text-sm hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {category.name}
              </Link>
            ))}
          </div>
          <Button asChild className="w-full" onClick={() => setMobileMenuOpen(false)}>
            <Link href="/contact">Contact</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
