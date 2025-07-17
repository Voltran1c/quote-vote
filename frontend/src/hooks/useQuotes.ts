import { useState, useEffect } from 'react';
import axios from 'axios';

interface Quote {
  id: number;
  text: string;
  author: string;
  votesCount?: number;
}

export function useQuotes(
  page = 1,
  search = '',
  sort: 'asc' | 'desc' = 'asc'
) {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/quotes`, {
        params: { page, search, sort },
      })
      .then((res) => {
        setQuotes((prev) =>
          page === 1 ? res.data : [...prev, ...res.data]
        );
        setHasMore(res.data.length > 0);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [page, search, sort]);

  return { quotes, loading, hasMore };
}