import { useEffect, useState } from 'react'
import { fetchCollection } from '../lib/api.js'

function valueOrDash(value) {
  return value === undefined || value === null || value === '' ? '—' : value
}

export default function ResourcePage({ resource, endpoint, eyebrow, title, description, columns, renderRow }) {
  const [records, setRecords] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isCurrent = true
    fetchCollection(endpoint, resource)
      .then((items) => {
        if (isCurrent) setRecords(items)
      })
      .catch((requestError) => {
        if (isCurrent) setError(requestError.message)
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false)
      })
    return () => {
      isCurrent = false
    }
  }, [endpoint, resource])

  return (
    <section className="resource-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="page-description">{description}</p>
        </div>
        <div className="record-count"><strong>{records.length}</strong><span>records</span></div>
      </div>
      <div className="data-panel">
        {isLoading && <p className="empty-state">Loading {resource}...</p>}
        {error && <p className="empty-state error-state">{error}</p>}
        {!isLoading && !error && records.length === 0 && (
          <p className="empty-state">No {resource} found yet.</p>
        )}
        {!isLoading && !error && records.length > 0 && (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>{columns.map((column) => <th key={column.key}>{column.label}</th>)}</tr>
              </thead>
              <tbody>{records.map((record, index) => renderRow(record, index, valueOrDash))}</tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}