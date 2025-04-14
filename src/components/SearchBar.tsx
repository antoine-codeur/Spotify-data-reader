import '../styles/SearchBar.css'

interface SearchBarProps {
  searchTerm: string
  onSearchChange: (term: string) => void
  placeholder?: string
}

const SearchBar = ({ searchTerm, onSearchChange, placeholder = 'Search...' }: SearchBarProps) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={placeholder}
      />
      {searchTerm && (
        <button 
          className="clear-search" 
          onClick={() => onSearchChange('')}
          title="Clear search"
        >
          ×
        </button>
      )}
    </div>
  )
}

export default SearchBar