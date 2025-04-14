import { formatTime } from './types'

interface StatsOverviewProps {
  tracksCount: number
  totalListeningTime: number
  uniqueTracksCount: number
  uniqueArtistsCount: number
}

const StatsOverview = ({ tracksCount, totalListeningTime, uniqueTracksCount, uniqueArtistsCount }: StatsOverviewProps) => {
  return (
    <div className="stats-overview">
      <div className="stat-card">
        <h3>Total Tracks</h3>
        <p>{tracksCount.toLocaleString()}</p>
      </div>
      <div className="stat-card">
        <h3>Listening Time</h3>
        <p>{formatTime(totalListeningTime)}</p>
      </div>
      <div className="stat-card">
        <h3>Unique Tracks</h3>
        <p>{uniqueTracksCount.toLocaleString()}</p>
      </div>
      <div className="stat-card">
        <h3>Unique Artists</h3>
        <p>{uniqueArtistsCount.toLocaleString()}</p>
      </div>
    </div>
  )
}

export default StatsOverview