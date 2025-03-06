"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, Clock } from "lucide-react"

// Mock data - In a real app, this would come from the TrackTV API
const mockMovies = [
  {
    id: 1,
    title: "Dune: Part Two",
    year: 2024,
    poster: "/placeholder.svg?height=300&width=200",
    rating: 4.5,
    watchedDate: "2 days ago",
  },
  {
    id: 2,
    title: "Oppenheimer",
    year: 2023,
    poster: "/placeholder.svg?height=300&width=200",
    rating: 4.7,
    watchedDate: "1 week ago",
  },
  {
    id: 3,
    title: "Poor Things",
    year: 2023,
    poster: "/placeholder.svg?height=300&width=200",
    rating: 4.3,
    watchedDate: "2 weeks ago",
  },
]

interface MovieSectionProps {
  stats: {
    moviesWatched: number
    tvShows: number
    avgRating: number
    watchlist: number
  }
}

export default function MovieSection({ stats }: MovieSectionProps) {
  const [trackTvData, setTrackTvData] = useState(null)

  useEffect(() => {
    async function fetchTrackTvData() {
      try {
        const response = await fetch("/api/tracktv")
        if (!response.ok) {
          throw new Error("Failed to fetch TrackTV data")
        }
        const data = await response.json()
        setTrackTvData(data)
      } catch (error) {
        console.error("Error fetching TrackTV data:", error)
      }
    }

    fetchTrackTvData()
  }, [])

  return (
    <div className="grid gap-8">
      {/* Movie Stats */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Movie & TV Stats</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glassmorphism p-5 rounded-lg">
            <div className="text-4xl font-bold mb-1">{stats.moviesWatched}</div>
            <div className="text-muted-foreground text-sm">Movies Watched</div>
          </div>
          <div className="glassmorphism p-5 rounded-lg">
            <div className="text-4xl font-bold mb-1">{stats.tvShows}</div>
            <div className="text-muted-foreground text-sm">TV Shows</div>
          </div>
          <div className="glassmorphism p-5 rounded-lg">
            <div className="text-4xl font-bold mb-1">{stats.avgRating}</div>
            <div className="text-muted-foreground text-sm">Avg Rating</div>
          </div>
          <div className="glassmorphism p-5 rounded-lg">
            <div className="text-4xl font-bold mb-1">{stats.watchlist}</div>
            <div className="text-muted-foreground text-sm">Watchlist</div>
          </div>
        </div>
      </div>

      {/* TrackTV Data */}
      {trackTvData && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          {/* Display TrackTV data here */}
        </div>
      )}

      {/* Latest Views */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Latest Views</h2>
        <div className="space-y-4">
          {mockMovies.map((movie) => (
            <div key={movie.id} className="flex glassmorphism rounded-lg overflow-hidden">
              <div className="w-16 h-24 relative flex-shrink-0">
                <Image src={movie.poster || "/placeholder.svg"} alt={movie.title} fill className="object-cover" />
              </div>
              <div className="p-3 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="font-medium">{movie.title}</h3>
                  <div className="flex items-center mt-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                    <span className="text-sm text-muted-foreground">{movie.rating}/5</span>
                    <span className="mx-2 text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">{movie.watchedDate}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Watchlist Preview */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Watchlist</h2>
          <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="relative aspect-[2/3] rounded-lg overflow-hidden group">
              <Image
                src={`/placeholder.svg?height=300&width=200`}
                alt={`Watchlist item ${item}`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Clock className="h-8 w-8 text-white" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

