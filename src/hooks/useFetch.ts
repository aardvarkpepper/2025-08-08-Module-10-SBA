/**
 * Note:  I've been told elsewhere it is not good to set up re-usable code to handle API requests.  It was said at the time there's some sort of security vulnerability.  I asked for details but got none.  If I recall, the situation did not involve the user being able to pass in arguments (an obvious security issue), it was more like calling different APIs that were defined in the code, using methods like POST or such that were also defined in the code.
 * 
 * As to 'options?:' below, documentation at https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
 * 
 * const response = await fetch("https://example.org/post", {
  method: "POST",
  body: JSON.stringify({ username: "example" }),
  // …

  https://developer.mozilla.org/en-US/docs/Web/API/AbortController
  ... When abort() is called, the fetch() promise rejects with a DOMException named AbortError
  https://blog.logrocket.com/complete-guide-abortcontroller/
  As I understand it, some APIs (maybe a lot) work with AbortController.  The client sends an abort request, then the fetch or whatever request is aborted; the promise rejects with a DOMException named AbortError as mentioned above.

  I think technically, using useEffect with fetch as in this function, if a client simply starts a new fetch request, and there's nothing to receive the old fetch, the server sends data but nothing happens on the client end.  But at least, sending an abort signal via AbortController is 'tidy', potentially saving server resources.  It's just a nice thought, and neat too, as opposed to letting a chunk of data bounce.  After all, maybe the client wants to restrict their data usage and the incoming server response to the no-longer-endpointed-fetch request would use some up?

  At any rate it doesn't hurt.

  I think 'loading' may be used to set the state of display, but typically fetch requests are very fast.  I'll have to set up a setTimeout function or such to test (and display functionality of) a loading spinner.  Assignment states 'Your application should manage loading and error states gracefully, displaying appropriate UI indicators to the user (e.g., a loading spinner, an error message).'

  Note:  Error handling is internal, so nice there.

});
 */

import { useEffect, useState } from 'react';
 
export const useFetch = (url: string, options?: RequestInit) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
 
  useEffect(() => {
    if (!url) return; // Don't fetch if URL is not provided
 
    // const controller = new AbortController(); // For cleanup
    setData(null); // Reset data on new fetch
    setError(null); // Reset error on new fetch
    setLoading(true);
 
    const fetchData = async () => {
      try {
        // const response = await fetch(url, { ...options, signal: controller.signal });
        const response = await fetch(url, { ...options});
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err: any) {
        if (err.name !== 'AbortError') { // Don't set error if aborted
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };
 
    fetchData();
 
    // Cleanup function
    return () => {
      // controller.abort();
    };
  }, [url, options]); // Re-run if url or options change
 
  return { data, loading, error };
}