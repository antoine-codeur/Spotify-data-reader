import { SpotifyTrack, formatTime } from './types'
import '../styles/StatsView.css'

interface StatsViewProps {
  tracks: SpotifyTrack[]
  totalListeningTime: number
  yearOptions: number[]
}

const StatsView = ({ tracks, totalListeningTime, yearOptions }: StatsViewProps) => {
  // Calcul de statistiques supplémentaires
  const calculateMostActiveYear = (): string => {
    if (yearOptions.length === 0) return 'N/A'
    
    const yearCounts = new Map<number, number>()
    tracks.forEach(track => {
      const year = new Date(track.ts).getFullYear()
      yearCounts.set(year, (yearCounts.get(year) || 0) + 1)
    })
    
    let maxYear = yearOptions[0]
    let maxCount = 0
    
    yearCounts.forEach((count, year) => {
      if (count > maxCount) {
        maxCount = count
        maxYear = year
      }
    })
    
    return maxYear.toString()
  }

  return (
    <div className="view-content">
      <h2>Listening Statistics</h2>
      
      <div className="stats-grid">
        <div className="stat-box">
          <h3>Total Listening Time</h3>
          <p className="stat-value">{formatTime(totalListeningTime)}</p>
          <p className="stat-description">
            This is the total amount of time you've spent listening to music on Spotify.
          </p>
        </div>
        
        <div className="stat-box">
          <h3>Average Daily Listening</h3>
          <p className="stat-value">
            {formatTime(totalListeningTime / (tracks.length > 0 ? Math.max(1, yearOptions.length * 365) : 1))}
          </p>
          <p className="stat-description">
            On average, this is how much time you spend listening to Spotify each day.
          </p>
        </div>
        
        <div className="stat-box">
          <h3>Most Active Year</h3>
          <p className="stat-value">
            {calculateMostActiveYear()}
          </p>
          <p className="stat-description">
            This is the year you were most active on Spotify based on your listening history.
          </p>
        </div>
        
        <div className="stat-box">
          <h3>Average Track Duration</h3>
          <p className="stat-value">
            {formatTime(totalListeningTime / Math.max(1, tracks.length))}
          </p>
          <p className="stat-description">
            This is the average duration of tracks you listen to.
          </p>
        </div>
      </div>
    </div>
  )
}

export default StatsView