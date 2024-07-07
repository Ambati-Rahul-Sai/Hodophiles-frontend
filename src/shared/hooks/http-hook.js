import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  // When a async request is sent and we change the component before getting response for that request
  // it gives an error, since we're trying to change the state variables which are unavailable
  // when the current component changes. To avoid this error we are keeping track of active HTTP requests.
  const activeHttpRequests = useRef([]);

  // We are wrapping the function with useCallback so that this function never gets recreated
  // when the component that uses this hook re-renders. So we never have inefficient re-run
  // cyles and infinite loops.
  const sendRequest = useCallback(
    async (
      url,
      method = "GET", // default values
      body = null,
      headers = {}
    ) => {
      setIsLoading(true);

      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal, // links the AbortController to this request.
        });

        const responseData = await response.json(); // contains the actual data in response body.

        // AbortController should be removed from activeHttpRequests after the request completes
        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl
        );

        if (!response.ok) {
          // Checking if the response has 4XX or 5XX error
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        return responseData;
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    // useEffect not only be used to run some logic whenever a component re-render, but also
    // to run some clean-up logic when a component unmounts.
    return () => {
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
    // This returned function is executed as a clean-up function before the next time useEfect
    // runs again or also when the components that uses useEffect.

    // This logic is added to make sure that we never continue with a request that is on its way out,
    // if we then switch away from the component that triggered the request.
  }, []);

  return { isLoading, error, sendRequest, clearError };
};
