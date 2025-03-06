import Link from "next/link"
import {
  Linkedin,
  Twitter,
  Instagram,
  Github,
  Youtube,
  Facebook,
  TwitterIcon as TikTok,
  PinIcon as Pinterest,
  Dribbble,
  DribbbleIcon as Behance,
  ExternalLink,
} from "lucide-react"

interface SocialLinkProps {
  name: string
  icon: string
  url: string
  show: boolean
}

const iconComponents = {
  Linkedin,
  Twitter,
  Instagram,
  Github,
  Youtube,
  Facebook,
  TikTok,
  Pinterest,
  Dribbble,
  Behance,
}

export default function SocialLink({ name, icon, url, show }: SocialLinkProps) {
  if (!show) return null

  const IconComponent = iconComponents[icon as keyof typeof iconComponents] || ExternalLink

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-center justify-center p-3 rounded-full bg-secondary hover:bg-secondary/80 transition-colors duration-200"
    >
      <IconComponent className="w-6 h-6" />
      <span className="absolute bottom-full mb-2 hidden group-hover:block bg-background text-foreground text-xs py-1 px-2 rounded">
        {name}
      </span>
    </Link>
  )
}

