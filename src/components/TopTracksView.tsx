import { Bar } from 'react-chartjs-2'
import { TopTrack, formatTime } from './types'
import { useState, useMemo } from 'react'
import SearchBar from './SearchBar'

interface TopTracksViewProps {
  topTracks: TopTrack[]
  maxDisplayCount?: number
}

type SortKey = 'name' | 'artist' | 'album' | 'count' | 'totalMs'
type SortDirection = 'asc' | 'desc'

const TopTracksView = ({ topTracks, maxDisplayCount = 50 }: TopTracksViewProps) => {
  const [sortKey, setSortKey] = useState<SortKey>('count')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const [searchTerm, setSearchTerm] = useState<string>('')

  // Fonction pour gérer le tri lorsqu'on clique sur un en-tête de colonne
  const handleSort = (key: SortKey) => {
    // Si on clique sur la même colonne, on inverse la direction de tri
    if (key === sortKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      // Si on clique sur une nouvelle colonne, on trie par défaut en ordre décroissant
      setSortKey(key)
      setSortDirection('desc')
    }
  }

  // Filtrer les pistes en fonction du terme de recherche
  const filteredTracks = useMemo(() => {
    if (!searchTerm.trim()) return topTracks
    
    const term = searchTerm.toLowerCase().trim()
    return topTracks.filter(track => 
      track.name.toLowerCase().includes(term) ||
      track.artist.toLowerCase().includes(term) ||
      track.album.toLowerCase().includes(term)
    )
  }, [topTracks, searchTerm])

  // Tri des morceaux selon la clé et la direction actuelles
  const sortedAndFilteredTracks = useMemo(() => {
    return [...filteredTracks].sort((a, b) => {
      let comparison = 0
      
      switch (sortKey) {
        case 'name':
          comparison = a.name.localeCompare(b.name)
          break
        case 'artist':
          comparison = a.artist.localeCompare(b.artist)
          break
        case 'album':
          comparison = a.album.localeCompare(b.album)
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
  }, [filteredTracks, sortKey, sortDirection])

  // Préparer les données pour le graphique (toujours les 10 plus écoutés)
  const topTenTracks = [...topTracks]
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)

  const chartData = {
    labels: topTenTracks.map(track => `${track.name} - ${track.artist}`),
    datasets: [
      {
        label: 'Number of Plays',
        data: topTenTracks.map(track => track.count),
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
      <h2>Your Top Tracks</h2>
      
      <div className="chart-container">
        <Bar 
          data={chartData} 
          options={{
            indexAxis: 'y',
            plugins: {
              title: {
                display: true,
                text: 'Your Top 10 Most Played Tracks'
              },
              legend: {
                display: false
              }
            }
          }} 
        />
      </div>
      
      <div className="data-table">
        <div className="table-header">
          <h3>
            {searchTerm 
              ? `Filtered Tracks (${sortedAndFilteredTracks.length})`
              : `Top ${Math.min(maxDisplayCount, topTracks.length)} Tracks`}
          </h3>
          <SearchBar 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            placeholder="Search by track, artist or album..."
          />
        </div>
        
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th style={sortableStyle} onClick={() => handleSort('name')}>
                Track {getSortIcon('name')}
              </th>
              <th style={sortableStyle} onClick={() => handleSort('artist')}>
                Artist {getSortIcon('artist')}
              </th>
              <th style={sortableStyle} onClick={() => handleSort('album')}>
                Album {getSortIcon('album')}
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
            {sortedAndFilteredTracks.slice(0, searchTerm ? undefined : maxDisplayCount).map((track, index) => (
              <tr key={`${track.name}-${track.artist}`}>
                <td>{index + 1}</td>
                <td>{track.name}</td>
                <td>{track.artist}</td>
                <td>{track.album}</td>
                <td>{track.count}</td>
                <td>{formatTime(track.totalMs)}</td>
              </tr>
            ))}
            {sortedAndFilteredTracks.length === 0 && (
              <tr>
                <td colSpan={6} className="no-results">No tracks found matching "{searchTerm}"</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TopTracksView