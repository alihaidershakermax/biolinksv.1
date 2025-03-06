import Image from "next/image"
import { Play, Disc } from "lucide-react"

// Mock data - In a real app, this would come from the Spotify API
const mockTopTracks = [
  {
    id: 1,
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    cover: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 2,
    title: "Dance Monkey",
    artist: "Tones and I",
    album: "The Kids Are Coming",
    cover: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 3,
    title: "Watermelon Sugar",
    artist: "Harry Styles",
    album: "Fine Line",
    cover: "/placeholder.svg?height=300&width=300",
  },
]

interface MusicSectionProps {
  stats: {
    albumsListened: number
    topGenres: string[]
    playlists: number
    favoriteArtists: number
  }
}

export default function MusicSection({ stats }: MusicSectionProps) {
  return (
    <div className="grid gap-8">
      {/* Music Stats */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Music Stats</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glassmorphism p-5 rounded-lg">
            <div className="text-4xl font-bold mb-1">{stats.albumsListened}</div>
            <div className="text-muted-foreground text-sm">Albums Listened</div>
          </div>
          <div className="glassmorphism p-5 rounded-lg">
            <div className="text-4xl font-bold mb-1">{stats.playlists}</div>
            <div className="text-muted-foreground text-sm">Playlists</div>
          </div>
          <div className="glassmorphism p-5 rounded-lg">
            <div className="text-4xl font-bold mb-1">{stats.favoriteArtists}</div>
            <div className="text-muted-foreground text-sm">Favorite Artists</div>
          </div>
          <div className="glassmorphism p-5 rounded-lg">
            <div className="flex flex-wrap gap-1">
              {stats.topGenres.map((genre, index) => (
                <span key={index} className="text-xs bg-primary/20 text-primary-foreground px-2 py-1 rounded-full">
                  {genre}
                </span>
              ))}
            </div>
            <div className="text-muted-foreground text-sm mt-2">Top Genres</div>
          </div>
        </div>
      </div>

      {/* Top Tracks */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Top Tracks</h2>
        <div className="space-y-4">
          {mockTopTracks.map((track) => (
            <div key={track.id} className="flex items-center glassmorphism p-3 rounded-lg">
              <div className="w-12 h-12 relative flex-shrink-0 mr-4">
                <Image
                  src={track.cover || "/placeholder.svg"}
                  alt={track.title}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <div className="flex-grow">
                <h3 className="font-medium">{track.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {track.artist} - {track.album}
                </p>
              </div>
              <button className="p-2 rounded-full bg-primary/20 text-primary-foreground hover:bg-primary/30 transition-colors">
                <Play className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Recently Played */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Recently Played</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="relative aspect-square rounded-lg overflow-hidden group">
              <Image
                src={`/placeholder.svg?height=300&width=300`}
                alt={`Recently played ${item}`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Disc className="h-8 w-8 text-white" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

