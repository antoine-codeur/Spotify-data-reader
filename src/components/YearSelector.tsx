import '../styles/YearSelector.css'

interface YearSelectorProps {
  timeRange: string
  yearOptions: number[]
  onYearChange: (year: string) => void
}

const YearSelector = ({ timeRange, yearOptions, onYearChange }: YearSelectorProps) => {
  return (
    <div className="time-filter">
      <label htmlFor="timeRange">Filter by year: </label>
      <select 
        id="timeRange" 
        value={timeRange} 
        onChange={(e) => onYearChange(e.target.value)}
      >
        <option value="all">All Time</option>
        {yearOptions.map(year => (
          <option key={year} value={year.toString()}>
            {year}
          </option>
        ))}
      </select>
    </div>
  )
}

export default YearSelector