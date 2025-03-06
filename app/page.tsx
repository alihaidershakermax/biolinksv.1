"use client"

import { useState, useEffect } from "react"
import { Sun, Moon } from "lucide-react"
import Image from "next/image"
import MovieSection from "@/components/movie-section"
import MusicSection from "@/components/music-section"
import SocialLink from "@/components/social-link"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { siteConfig } from "@/config/site-config"

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Theme Toggle */}
        <div className="flex justify-end mb-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
          >
            {resolvedTheme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>

        {/* Profile Section */}
        <div className="flex flex-col items-center mb-12">
          <div className="relative w-32 h-32 mb-6 overflow-hidden rounded-full border-4 border-primary">
            <Image
              src={siteConfig.avatar || "/placeholder.svg"}
              alt={siteConfig.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <h1 className="text-3xl font-bold mb-2">{siteConfig.name}</h1>
          <p className="text-muted-foreground text-center">{siteConfig.bio}</p>
        </div>

        {/* Navigation Tabs */}
        <Tabs defaultValue="links" className="w-full mb-8">
          <TabsList className="grid w-full grid-cols-3 glassmorphism">
            <TabsTrigger value="links">Links</TabsTrigger>
            <TabsTrigger value="movies">Movies & TV</TabsTrigger>
            <TabsTrigger value="music">Music</TabsTrigger>
          </TabsList>

          <TabsContent value="links" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2">
              {siteConfig.socialLinks.map((link, index) => (
                <SocialLink
                  key={index}
                  name={link.name}
                  icon={link.icon}
                  url={link.url}
                  color={link.color}
                  show={link.show}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="movies" className="mt-6">
            <MovieSection stats={siteConfig.movieStats} />
          </TabsContent>

          <TabsContent value="music" className="mt-6">
            <MusicSection stats={siteConfig.musicStats} />
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} - {siteConfig.name}
          </p>
        </footer>
      </div>
    </div>
  )
}

