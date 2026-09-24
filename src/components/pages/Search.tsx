import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import { searchContent } from '../../content/search'
import type { SearchResult } from '../../content/search'
import { scrollToTop } from '../buttons/LessonNavButtons'

function highlightKeyword(text: string, query: string) {
  if (!query.trim()) {
    return text
  }

  const escapedQuery = query.replace(
    /[.*+?^${}()|[\]\\]/g,
    '\\$&'
  )

  const parts = text.split(
    new RegExp(`(${escapedQuery})`, 'gi')
  )

  return parts.map((part, index) => {
    if (part.toLowerCase() === query.toLowerCase()) {
      return (
        <strong key={index} className="search-keyword">
          {part}
        </strong>
      )
    }

    return <span key={index}>{part}</span>
  })
}

const categoryLabels: Record<string, string> = {
  python: 'Python',
  java: 'Java',
  cpp: 'C++',
  web: 'Basic Web Stack',
  databases: 'Databases',
  'electronics-and-it-basics': 'Electronics & IT Basics',
  shared: 'Electronics & IT Basics',
}

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams()
  const queryFromUrl = searchParams.get('q') ?? ''

  const [searchInput, setSearchInput] = useState(queryFromUrl)
  const [results, setResults] = useState<SearchResult[]>([])

  useEffect(() => {
    document.title = 'Search Tutorials'
  }, [])

  useEffect(() => {
    setSearchInput(queryFromUrl)
    setResults(searchContent(queryFromUrl))
  }, [queryFromUrl])

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const query = searchInput.trim()

    if (!query) {
      setSearchParams({})
      return
    }

    setSearchParams({ q: query })
  }

  return (
    <div className="col-lg-12 mb-4">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h5 className="m-0 font-weight-bold">Search Tutorials</h5>
        </div>

        <div className="card-body">
          <form className="search-form" onSubmit={handleSearch}>
            <div className="search-input-wrapper">
              <input
                type="search"
                name="search"
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                placeholder="Search..."
                className="search-input"
                aria-label="Search"
              />

              {searchInput && (
                <button
                  type="button"
                  className="search-clear"
                  onClick={() => {
                    setSearchInput('')
                    setSearchParams({})
                  }}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>

            <button type="submit" className="search-button">
              Search
            </button>
          </form>

          {queryFromUrl && (
            <div className="search-summary">
              <span>
                Results for <strong>"{queryFromUrl}"</strong>
              </span>

              <span className="search-count">
                {results.length} {results.length === 1 ? 'result' : 'results'}
              </span>
            </div>
          )}

          {!queryFromUrl && (
            <div className="search-message">
              No results found.
            </div>
          )}

          {queryFromUrl && results.length === 0 && (
            <div className="search-message">
              No results found for <strong>"{queryFromUrl}"</strong>.
            </div>
          )}

          {results.length > 0 && (
            <div className="search-results">
              {results.map((result, index) => (
                <Link
                  key={`${result.path}-${result.type}-${index}`}
                  to={
                    result.category === 'shared'
                      ? `/tutorials/electronics-and-it-basics/${result.slug}`
                      : `/tutorials/${result.category}/${result.slug}`
                  }
                  className="search-result"
                  onClick={scrollToTop}
                >
                    <div className="search-result-pills">
                      <div className="search-result-type">
                        {result.type === 'title' ? 'LESSON' : result.type === 'heading' ? 'HEADING' : 'CONTENT'}
                      </div>
                      <div className={`search-result-category search-result-category-${result.category}`}>
                        {categoryLabels[result.category]}
                      </div>
                    </div>
                    
                    <h6 className="search-result-title">
                        { result.title }
                    </h6>

                    {result.type != 'title' ? (
                    <p className="search-result-excerpt">
                        { highlightKeyword(result.excerpt, queryFromUrl) }
                    </p>
                    ) : null}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
