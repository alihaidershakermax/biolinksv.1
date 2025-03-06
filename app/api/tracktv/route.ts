import { NextResponse } from "next/server"

export async function GET() {
  const trackTvApiKey = process.env.TRACKTV_API_KEY
  const trackTvUsername = process.env.TRACKTV_USERNAME

  if (!trackTvApiKey || !trackTvUsername) {
    return NextResponse.json({ error: "TrackTV credentials not configured" }, { status: 500 })
  }

  try {
    // Replace this URL with the actual TrackTV API endpoint
    const response = await fetch(`https://api.tracktv.com/user/${trackTvUsername}`, {
      headers: {
        Authorization: `Bearer ${trackTvApiKey}`,
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch TrackTV data")
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching TrackTV data:", error)
    return NextResponse.json({ error: "Failed to fetch TrackTV data" }, { status: 500 })
  }
}

