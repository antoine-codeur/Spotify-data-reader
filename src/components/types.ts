// Types pour les données Spotify
export interface SpotifyTrack {
  ts: string
  platform: string
  ms_played: number
  conn_country: string
  ip_addr: string
  master_metadata_track_name: string
  master_metadata_album_artist_name: string
  master_metadata_album_album_name: string
  spotify_track_uri: string
  incognito_mode: boolean
}

export interface TopTrack {
  name: string
  artist: string
  album: string
  count: number
  totalMs: number
}

export interface TopArtist {
  name: string
  count: number
  totalMs: number
}

// Fonction utilitaire pour formater le temps
export const formatTime = (milliseconds: number): string => {
  const seconds = Math.floor(milliseconds / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  
  if (days > 0) {
    return `${days} days, ${hours % 24} hours`
  } else if (hours > 0) {
    return `${hours} hours, ${minutes % 60} minutes`
  } else {
    return `${minutes} minutes`
  }
}