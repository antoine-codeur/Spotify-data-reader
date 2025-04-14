import '../styles/FileLoader.css'

interface FileLoaderProps {
  onReload: () => void
}

const FileLoader = ({ onReload }: FileLoaderProps) => {
  return (
    <div className="file-loader">
      <h2>Load Your Spotify Data</h2>
      <p>
        Please make sure your Spotify Extended Streaming History files are in the correct location:
        <br />
        <code>/Spotify-Extended-Streaming-History/</code>
      </p>
      <button className="load-button" onClick={onReload}>
        Reload Data
      </button>
    </div>
  )
}

export default FileLoader