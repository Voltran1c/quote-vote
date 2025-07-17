import axios, { AxiosError } from 'axios';
import { useAuth } from './useAuth';

export function useVote() {
  const { isAuthenticated } = useAuth();

  const vote = async (quoteId: number) => {
    if (!isAuthenticated) {
      throw new Error('You must be logged in to vote');
    }

    const token = localStorage.getItem('token');
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/votes`,
        { quoteId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      if (axios.isAxiosError(err)) {
        throw new Error(err.response?.data?.message || 'Failed to vote');
      }
      throw new Error('Unexpected error occurred');
    }
  };

  return { vote };
}
