const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export function getCollection(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.data?.items)) return payload.data.items
  if (Array.isArray(payload?.data?.results)) return payload.data.results
  return []
}

export async function fetchCollection(endpoint, resource) {
  const requestUrl = endpoint.startsWith('http') ? endpoint : `${apiBaseUrl}${endpoint}`
  const response = await fetch(requestUrl)
  if (!response.ok) {
    throw new Error(`Unable to load ${resource} (${response.status})`)
  }
  return getCollection(await response.json())
}