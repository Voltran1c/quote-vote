// import { useState } from 'react';
// import { useQuotes } from '../hooks/useQuotes';
// import { useAuth } from '../hooks/useAuth';
// import QuoteList from '../components/QuoteList';
// import VoteChart from '../components/VoteChart';

// export default function Home() {
//   const [page, setPage] = useState(1);
//   const [search, setSearch] = useState('');
//   const [sort, setSort] = useState<'asc' | 'desc'>('asc');
//   const { quotes, loading, hasMore } = useQuotes(page, search, sort);
//   const { isAuthenticated } = useAuth();

//   const handleLoadMore = () => {
//     if (hasMore) {
//       setPage(prev => prev + 1);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Quotes</h1>
      
//       <div className="mb-4 flex gap-4">
//         <input
//           type="text"
//           placeholder="Search quotes..."
//           className="border p-2 rounded flex-grow"
//           value={search}
//           onChange={(e) => {
//             setSearch(e.target.value);
//             setPage(1);
//           }}
//         />
//         <select
//           className="border p-2 rounded"
//           value={sort}
//           onChange={(e) => setSort(e.target.value as 'asc' | 'desc')}
//         >
//           <option value="asc">Ascending</option>
//           <option value="desc">Descending</option>
//         </select>
//       </div>

//       <QuoteList 
//         quotes={quotes} 
//         loading={loading} 
//         onLoadMore={handleLoadMore} 
//         hasMore={hasMore}
//         isAuthenticated={isAuthenticated}
//       />

//       <div className="mt-8">
//         <h2 className="text-xl font-bold mb-4">Vote Results</h2>
//         <VoteChart quotes={quotes} />
//       </div>
//     </div>
//   );
// }

import { useState } from 'react';
import { useRouter } from 'next/router';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  const [error, setError] = useState('');
  const router = useRouter();
  const { login } = useAuth();

const handleSubmit = async (username: string, password: string) => {
  try {
    await login(username, password);
    router.push('/home');
  } catch (err) {
    if (err instanceof Error) {
      setError(err.message);
    } else {
      setError('Login failed');
    }
  }
};


  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <AuthForm onSubmit={handleSubmit} />
    </div>
  );
}