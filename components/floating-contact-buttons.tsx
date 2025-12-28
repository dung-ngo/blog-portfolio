"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Mail, MessageSquare, Phone, X } from "lucide-react"
import { cn } from "@/lib/utils"

export function FloatingContactButtons() {
  const [isOpen, setIsOpen] = useState(false)

  const contacts = [
    {
      icon: Mail,
      label: "Email",
      href: "mailto:your.email@example.com",
      color: "hover:bg-blue-500",
    },
    {
      icon: MessageSquare,
      label: "WhatsApp",
      href: "https://wa.me/1234567890",
      color: "hover:bg-green-500",
    },
    {
      icon: Phone,
      label: "Zalo",
      href: "https://zalo.me/1234567890",
      color: "hover:bg-blue-600",
    },
  ]

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col-reverse gap-3">
      {/* Contact buttons */}
      <div
        className={cn(
          "flex flex-col-reverse gap-3 transition-all duration-300 origin-bottom",
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0",
        )}
      >
        {contacts.map((contact) => (
          <Button
            key={contact.label}
            size="icon"
            className={cn("h-12 w-12 rounded-full shadow-lg transition-colors", contact.color)}
            asChild
          >
            <a href={contact.href} target="_blank" rel="noopener noreferrer" aria-label={contact.label}>
              <contact.icon className="h-5 w-5" />
            </a>
          </Button>
        ))}
      </div>

      {/* Toggle button */}
      <Button
        size="icon"
        className="h-14 w-14 rounded-full shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close contact menu" : "Open contact menu"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </Button>
    </div>
  )
}
