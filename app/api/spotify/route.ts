import { NextResponse } from "next/server"

export async function GET() {
  const spotifyClientId = process.env.SPOTIFY_CLIENT_ID
  const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET
  const spotifyRefreshToken = process.env.SPOTIFY_REFRESH_TOKEN

  if (!spotifyClientId || !spotifyClientSecret || !spotifyRefreshToken) {
    return NextResponse.json({ error: "Spotify credentials not configured" }, { status: 500 })
  }

  try {
    // First, get a new access token
    const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${spotifyClientId}:${spotifyClientSecret}`).toString("base64")}`,
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: spotifyRefreshToken,
      }),
    })

    if (!tokenResponse.ok) {
      throw new Error("Failed to refresh Spotify access token")
    }

    const tokenData = await tokenResponse.json()
    const accessToken = tokenData.access_token

    // Now use the access token to fetch user data
    const userResponse = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!userResponse.ok) {
      throw new Error("Failed to fetch Spotify user data")
    }

    const userData = await userResponse.json()
    return NextResponse.json(userData)
  } catch (error) {
    console.error("Error fetching Spotify data:", error)
    return NextResponse.json({ error: "Failed to fetch Spotify data" }, { status: 500 })
  }
}

