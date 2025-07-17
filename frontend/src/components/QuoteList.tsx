import { useVote } from "../hooks/useVote";
import { Quote } from "../types";

interface QuoteListProps {
  quotes: Quote[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  isAuthenticated: boolean;
}

export default function QuoteList({
  quotes,
  loading,
  hasMore,
  onLoadMore,
  isAuthenticated,
}: QuoteListProps) {
  const { vote } = useVote();

const handleVote = async (quoteId: number) => {
  try {
    await vote(quoteId);
    alert('Vote submitted successfully!');
  } catch (err) {
    if (err instanceof Error) {
      alert(err.message);
    } else {
      alert('Failed to vote');
    }
  }
}

  return (
    <div className="space-y-4">
      {quotes.map((quote) => (
        <div key={quote.id} className="border p-4 rounded">
          <blockquote className="text-lg italic mb-2">"{quote.text}"</blockquote>
          <p className="text-gray-600">- {quote.author}</p>
          {isAuthenticated && (
            <button
              onClick={() => handleVote(quote.id)}
              className="mt-2 bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
            >
              Vote
            </button>
          )}
        </div>
      ))}
      {loading && <div className="text-center py-4">Loading...</div>}
      {hasMore && !loading && (
        <button
          onClick={onLoadMore}
          className="w-full bg-gray-200 p-2 rounded hover:bg-gray-300"
        >
          Load More
        </button>
      )}
    </div>
  );
}