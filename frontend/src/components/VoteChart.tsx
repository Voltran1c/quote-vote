import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Quote } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface VoteChartProps {
  quotes: Quote[];
}

export default function VoteChart({ quotes }: VoteChartProps) {
  const chartData = {
    labels: quotes.map((quote) => quote.text.slice(0, 30) + '...'),
    datasets: [
      {
        label: 'Votes',
        data: quotes.map((quote) => quote.votesCount || 0),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Vote Results',
      },
    },
  };

  return <Bar options={options} data={chartData} />;
}