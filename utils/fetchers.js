import { useClerk } from '@clerk/clerk-react'
import useSWR from 'swr'

export const useClerkSWR = (url, fetcher = null) => {
  const { session } = useClerk()
  if (!session) {
    throw new Error("Cannot useClerkSWR when there is no session")
  }
  const sessionId = session.id

  //The clerk session ID has to be directly appended to the URL
  //as the fetcher is not included as part of useSWR's cache key
  const urlWithSession = new URL(url, window.location.href)
  urlWithSession.searchParams.set('_clerk_session_id', sessionId)

  //The default fetcher include credentials and return json
  if (!fetcher) {
    fetcher = (request, options) => {
      return fetch(request, { ...options, credentials: "include" }).then((r) => r.json())
    }
  }
  return useSWR(urlWithSession, fetcher)
}