import { useState, useEffect, useRef } from 'react';
import './App.css'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js'
import { SpotifyTrack, TopTrack, TopArtist } from './components/types'
import StatsOverview from './components/statistics/StatsOverview/StatsOverview'
import TopTracksView from './components/data-view/TopTracksView/TopTracksView'
import TopArtistsView from './components/data-view/TopArtistsView/TopArtistsView'
import StatsView from './components/statistics/StatsView/StatsView'
import YearSelector from './components/common/YearSelector/YearSelector'
import FileLoader from './components/data-view/FileLoader/FileLoader'
import ThemeToggle from './components/common/ThemeToggle/ThemeToggle'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

function App() {
  // State variables
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [tracks, setTracks] = useState<SpotifyTrack[]>([])
  const [topTracks, setTopTracks] = useState<TopTrack[]>([])
  const [topArtists, setTopArtists] = useState<TopArtist[]>([])
  const [totalListeningTime, setTotalListeningTime] = useState<number>(0)
  const [uniqueArtistsCount, setUniqueArtistsCount] = useState<number>(0)
  const [activeView, setActiveView] = useState<string>('tracks')
  const [isFilesLoaded, setIsFilesLoaded] = useState<boolean>(false)
  const [timeRange, setTimeRange] = useState<string>('all')
  const [displayCount, setDisplayCount] = useState<number>(50)
  const [artistDisplayCount, setArtistDisplayCount] = useState<number>(30)
  
  // References for the active buttons
  const tracksButtonRef = useRef<HTMLButtonElement>(null)
  const artistsButtonRef = useRef<HTMLButtonElement>(null)
  const statsButtonRef = useRef<HTMLButtonElement>(null)

  // File paths for the JSON data
  const filePaths = [
    '/Spotify-Extended-Streaming-History/Streaming_History_Audio_2017-2018_0.json',
    '/Spotify-Extended-Streaming-History/Streaming_History_Audio_2018-2020_1.json',
    '/Spotify-Extended-Streaming-History/Streaming_History_Audio_2020-2021_2.json',
    '/Spotify-Extended-Streaming-History/Streaming_History_Audio_2021-2022_3.json',
    '/Spotify-Extended-Streaming-History/Streaming_History_Audio_2022-2023_4.json',
    '/Spotify-Extended-Streaming-History/Streaming_History_Audio_2023-2024_5.json',
    '/Spotify-Extended-Streaming-History/Streaming_History_Audio_2024-2025_6.json',
    '/Spotify-Extended-Streaming-History/Streaming_History_Video_2018-2025.json'
  ]

  // Function to load all JSON files
  const loadFiles = async () => {
    try {
      setIsLoading(true)
      const promises = filePaths.map(path => 
        fetch(path)
          .then(res => {
            if (!res.ok) {
              throw new Error(`Failed to load ${path}`)
            }
            return res.json()
          })
      )
      
      const results = await Promise.all(promises)
      const allTracks = results.flat()
      setTracks(allTracks)
      setIsFilesLoaded(true)
      analyzeData(allTracks)
      setIsLoading(false)
    } catch (err) {
      console.error('Error loading data:', err)
      setError('Failed to load Spotify data. Please check the console for details.')
      setIsLoading(false)
    }
  }

  // Function to analyze the data and extract insights
  const analyzeData = (data: SpotifyTrack[]) => {
    // Calculate total listening time
    const totalMs = data.reduce((sum, track) => sum + track.ms_played, 0)
    setTotalListeningTime(totalMs)

    // Process top tracks
    const trackMap = new Map<string, TopTrack>()
    
    data.forEach(track => {
      if (!track.master_metadata_track_name) return // Skip entries without track names
      
      const trackKey = `${track.master_metadata_track_name}:${track.master_metadata_album_artist_name}`
      
      if (trackMap.has(trackKey)) {
        const existingTrack = trackMap.get(trackKey)!
        existingTrack.count += 1
        existingTrack.totalMs += track.ms_played
        trackMap.set(trackKey, existingTrack)
      } else {
        trackMap.set(trackKey, {
          name: track.master_metadata_track_name,
          artist: track.master_metadata_album_artist_name || 'Unknown Artist',
          album: track.master_metadata_album_album_name || 'Unknown Album',
          count: 1,
          totalMs: track.ms_played
        })
      }
    })
    
    // Sort tracks by play count
    const sortedTracks = Array.from(trackMap.values())
      .sort((a, b) => b.count - a.count)
    
    setTopTracks(sortedTracks)
    
    // Process top artists
    const artistMap = new Map<string, TopArtist>()
    
    data.forEach(track => {
      if (!track.master_metadata_album_artist_name) return // Skip entries without artist names
      
      const artistName = track.master_metadata_album_artist_name
      
      if (artistMap.has(artistName)) {
        const existingArtist = artistMap.get(artistName)!
        existingArtist.count += 1
        existingArtist.totalMs += track.ms_played
        artistMap.set(artistName, existingArtist)
      } else {
        artistMap.set(artistName, {
          name: artistName,
          count: 1,
          totalMs: track.ms_played
        })
      }
    })
    
    // Get all unique artists (for accurate count in statistics)
    const allUniqueArtists = Array.from(artistMap.values())
    
    // Sort artists by play count for display
    const sortedArtists = [...allUniqueArtists]
      .sort((a, b) => b.count - a.count)
    
    setTopArtists(sortedArtists)
    setUniqueArtistsCount(allUniqueArtists.length)
    
    // Update the component with the proper stats
    setStatsForView(tracks.length, totalMs, sortedTracks.length, allUniqueArtists.length)
  }

  // Helper function to update stats
  const setStatsForView = (_tracksCount: number, totalMs: number, _uniqueTracksCount: number, uniqueArtistsCount: number) => {
    setTotalListeningTime(totalMs)
    setUniqueArtistsCount(uniqueArtistsCount)
    // We're using these variables in StatsOverview component, but not directly in this function
  }

  // Filter data by time range
  const filterDataByTimeRange = (range: string) => {
    setTimeRange(range)
    
    if (range === 'all') {
      analyzeData(tracks)
      return
    }
    
    // Extract year from the range (assuming format 'YYYY')
    const year = parseInt(range)
    if (isNaN(year)) return
    
    // Filter tracks by the selected year
    const filteredTracks = tracks.filter(track => {
      const trackDate = new Date(track.ts)
      return trackDate.getFullYear() === year
    })
    
    analyzeData(filteredTracks)
  }

  // Load data on component mount
  useEffect(() => {
    loadFiles()
  }, [])

  // Set focus on the active button when activeView changes or on initial load
  useEffect(() => {
    if (activeView === 'tracks' && tracksButtonRef.current) {
      tracksButtonRef.current.focus();
    } else if (activeView === 'artists' && artistsButtonRef.current) {
      artistsButtonRef.current.focus();
    } else if (activeView === 'stats' && statsButtonRef.current) {
      statsButtonRef.current.focus();
    }
  }, [activeView]);

  // Focus the default active button on initial render
  useEffect(() => {
    if (tracksButtonRef.current) {
      tracksButtonRef.current.focus();
    }
  }, []);

  // Get unique years from the dataset for the year selector
  const getYearOptions = () => {
    if (!tracks.length) return []
    
    const years = new Set<number>()
    tracks.forEach(track => {
      const date = new Date(track.ts)
      years.add(date.getFullYear())
    })
    
    return Array.from(years).sort()
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="header-left">
            <h1>Spotify Listening History Analysis</h1>
            <p>Analyze your Spotify listening habits across years</p>
          </div>
          <div className="header-right">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {isLoading && <div className="loading">Loading your Spotify data...</div>}
      
      {error && <div className="error">{error}</div>}
      
      {!isLoading && !error && isFilesLoaded && (
        <div className="content">
          <div className="controls">
            <div className="view-selector">
              <button 
                className={`btn ${activeView === 'tracks' ? 'active' : ''}`} 
                onClick={() => setActiveView('tracks')}
                ref={tracksButtonRef}
                autoFocus={activeView === 'tracks'}
              >
                Top Tracks
              </button>
              <button 
                className={`btn ${activeView === 'artists' ? 'active' : ''}`} 
                onClick={() => setActiveView('artists')}
                ref={artistsButtonRef}
                autoFocus={activeView === 'artists'}
              >
                Top Artists
              </button>
              <button 
                className={`btn ${activeView === 'stats' ? 'active' : ''}`} 
                onClick={() => setActiveView('stats')}
                ref={statsButtonRef}
                autoFocus={activeView === 'stats'}
              >
                Statistics
              </button>
            </div>
            
            <div className="controls-right">
              <YearSelector 
                timeRange={timeRange}
                yearOptions={getYearOptions()}
                onYearChange={filterDataByTimeRange}
              />
              
              {activeView === 'tracks' && (
                <div className="display-count-selector">
                  <label htmlFor="displayCount">Display: </label>
                    <select 
                    id="displayCount" 
                    value={displayCount} 
                    onChange={(e) => setDisplayCount(Number(e.target.value))}
                    className="select"
                    >
                    <option value="10">Top 10</option>
                    <option value="25">Top 25</option>
                    <option value="50">Top 50</option>
                    <option value="100">Top 100</option>
                    <option value="250">Top 250</option>
                    <option value="500">Top 500</option>
                    <option value="1000">Top 1000</option>
                    <option value="2500">Top 2500</option>
                    <option value="5000">Top 5000</option>
                    <option value="10000">Top 10000</option>
                    <option value={topTracks.length}>All ({topTracks.length})</option>
                    </select>
                </div>
              )}
              
              {activeView === 'artists' && (
                <div className="display-count-selector">
                  <label htmlFor="artistDisplayCount">Display: </label>
                    <select 
                    id="artistDisplayCount" 
                    value={artistDisplayCount} 
                    onChange={(e) => setArtistDisplayCount(Number(e.target.value))}
                    className="select"
                    >
                    <option value="10">Top 10</option>
                    <option value="20">Top 20</option>
                    <option value="30">Top 30</option>
                    <option value="50">Top 50</option>
                    <option value="100">Top 100</option>
                    <option value="200">Top 200</option>
                    <option value="500">Top 500</option>
                    <option value="1000">Top 1000</option>
                    <option value="2500">Top 2500</option>
                    <option value={uniqueArtistsCount}>All ({uniqueArtistsCount})</option>
                    </select>
                </div>
              )}
            </div>
          </div>
          
          <StatsOverview 
            tracksCount={tracks.length}
            totalListeningTime={totalListeningTime}
            uniqueTracksCount={topTracks.length}
            uniqueArtistsCount={uniqueArtistsCount}
          />
          
          {activeView === 'tracks' && (
            <TopTracksView 
              topTracks={topTracks} 
              maxDisplayCount={displayCount}
            />
          )}
          
          {activeView === 'artists' && (
            <TopArtistsView 
              topArtists={topArtists}
              maxDisplayCount={artistDisplayCount}
            />
          )}
          
          {activeView === 'stats' && 
            <StatsView 
              tracks={tracks} 
              totalListeningTime={totalListeningTime} 
              yearOptions={getYearOptions()} 
            />
          }
        </div>
      )}
      
      {!isLoading && !error && !isFilesLoaded && (
        <FileLoader onReload={loadFiles} />
      )}
    </div>
  )
}

export default App
