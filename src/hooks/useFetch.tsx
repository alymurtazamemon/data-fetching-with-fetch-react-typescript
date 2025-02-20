import { useEffect, useState } from "react";

type DataType<T> = T | [];
type ErrorType = string | null;
type LoadingType = boolean;

interface State<T> {
  data: DataType<T>;
  error: ErrorType;
  loading: LoadingType;
}

function useFetch<T>(url: string): State<T> {
  const [state, setState] = useState<State<T>>({
    data: [],
    error: null,
    loading: true,
  });

  useEffect(() => {
    const controller = new AbortController();

    fetch(url, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        return response.json() as Promise<T>;
      })
      .then((data) => setState({ data, error: null, loading: false }))
      .catch((e) => {
        if (e.name === "AbortError") {
          console.log("Fetch request was aborted:", e);
          return;
        }

        if (e instanceof Error) {
          // * Handle standard Error instances
          setState({ data: [], error: e.message, loading: false });
        } else {
          // * Convert non-Error values to string
          setState({ data: [], error: String(e), loading: false });
        }
      });

    // * Cleanup: Abort the request if the component unmounts
    return () => controller.abort();
  }, []);

  return state;
}

export default useFetch;
