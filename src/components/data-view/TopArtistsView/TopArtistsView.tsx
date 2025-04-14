import { Bar, Pie } from 'react-chartjs-2'
import { TopArtist, formatTime } from '../../types'
import { useState, useMemo } from 'react'
import SearchBar from '../../common/SearchBar/SearchBar'
import './TopArtistsView.css'
import './TopTracksView.css' // Pour les styles partagés avec TopTracksView

interface TopArtistsViewProps {
  topArtists: TopArtist[]
  maxDisplayCount?: number
}

type SortKey = 'name' | 'count' | 'totalMs'
type SortDirection = 'asc' | 'desc'

const TopArtistsView = ({ topArtists, maxDisplayCount = 30 }: TopArtistsViewProps) => {
  const [sortKey, setSortKey] = useState<SortKey>('count')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const [searchTerm, setSearchTerm] = useState<string>('')

  // Fonction pour gérer le tri
  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDirection('desc')
    }
  }

  // Filtrer les artistes selon le terme de recherche
  const filteredArtists = useMemo(() => {
    if (!searchTerm.trim()) return topArtists
    
    const term = searchTerm.toLowerCase().trim()
    return topArtists.filter(artist => 
      artist.name.toLowerCase().includes(term)
    )
  }, [topArtists, searchTerm])

  // Trier les artistes filtrés
  const sortedAndFilteredArtists = useMemo(() => {
    return [...filteredArtists].sort((a, b) => {
      let comparison = 0
      
      switch (sortKey) {
        case 'name':
          comparison = a.name.localeCompare(b.name)
          break
        case 'count':
          comparison = a.count - b.count
          break
        case 'totalMs':
          comparison = a.totalMs - b.totalMs
          break
      }
      
      return sortDirection === 'asc' ? comparison : -comparison
    })
  }, [filteredArtists, sortKey, sortDirection])

  // Préparer les données pour les graphiques (top 10)
  const topTenArtists = [...topArtists]
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)

  // Préparer les données pour les graphiques
  const chartData = {
    labels: topTenArtists.map(artist => artist.name),
    datasets: [
      {
        label: 'Number of Plays',
        data: topTenArtists.map(artist => artist.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(199, 199, 199, 0.6)',
          'rgba(83, 102, 255, 0.6)',
          'rgba(40, 159, 64, 0.6)',
          'rgba(210, 199, 199, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(159, 159, 159, 1)',
          'rgba(83, 102, 255, 1)',
          'rgba(40, 159, 64, 1)',
          'rgba(210, 199, 199, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  // Style CSS pour les en-têtes de colonnes triables
  const sortableStyle = {
    cursor: 'pointer',
    userSelect: 'none' as const
  }

  // Icône pour indiquer l'ordre de tri
  const getSortIcon = (key: SortKey) => {
    if (sortKey !== key) return null
    return sortDirection === 'asc' ? ' ▲' : ' ▼'
  }

  return (
    <div className="view-content">
      <h2>Your Top Artists</h2>
      
      <div className="chart-container">
        <div className="chart-row">
          <div className="chart-col">
            <Bar 
              data={chartData} 
              options={{
                indexAxis: 'y',
                plugins: {
                  title: {
                    display: true,
                    text: 'Your Top 10 Most Played Artists'
                  },
                  legend: {
                    display: false
                  }
                }
              }} 
            />
          </div>
          <div className="chart-col">
            <Pie 
              data={chartData}
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: 'Your Top 10 Artists by Play Count'
                  }
                }
              }}
            />
          </div>
        </div>
      </div>
      
      <div className="data-table">
        <div className="table-header">
          <h3>
            {searchTerm 
              ? `Filtered Artists (${sortedAndFilteredArtists.length})`
              : `Top ${Math.min(maxDisplayCount, topArtists.length)} Artists`}
          </h3>
          <SearchBar 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            placeholder="Search by artist name..."
          />
        </div>
        
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th style={sortableStyle} onClick={() => handleSort('name')}>
                Artist {getSortIcon('name')}
              </th>
              <th style={sortableStyle} onClick={() => handleSort('count')}>
                Plays {getSortIcon('count')}
              </th>
              <th style={sortableStyle} onClick={() => handleSort('totalMs')}>
                Time Spent {getSortIcon('totalMs')}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedAndFilteredArtists.slice(0, searchTerm ? undefined : maxDisplayCount).map((artist, index) => (
              <tr key={artist.name}>
                <td>{index + 1}</td>
                <td>{artist.name}</td>
                <td>{artist.count}</td>
                <td>{formatTime(artist.totalMs)}</td>
              </tr>
            ))}
            {sortedAndFilteredArtists.length === 0 && (
              <tr>
                <td colSpan={4} className="no-results">No artists found matching "{searchTerm}"</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TopArtistsView