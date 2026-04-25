import { useState, useEffect, useRef } from 'react';

export function useFetch(fetcher) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetcherRef = useRef(fetcher);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetcherRef.current()
      .then((res) => { if (!cancelled) setData(res.data); })
      .catch((err) => { if (!cancelled) setError(err?.response?.data?.message || 'Something went wrong'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  const refetch = () => {
    setLoading(true);
    setError(null);
    fetcherRef.current()
      .then((res) => setData(res.data))
      .catch((err) => setError(err?.response?.data?.message || 'Something went wrong'))
      .finally(() => setLoading(false));
  };

  return { data, loading, error, refetch };
}
