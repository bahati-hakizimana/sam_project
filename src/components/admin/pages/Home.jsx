import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import Swal from 'sweetalert2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

function Home() {
  const [growthData, setGrowthData] = useState(null);
  const [totalUsers, setTotalUsers] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserGrowth = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          setError('No access token found');
          return;
        }

        const response = await fetch('http://127.0.0.1:8000/user_growth/', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setGrowthData(data);
      } catch (error) {
        console.error('Error fetching user growth data:', error);
        setError('Error fetching user growth data. Please try again.');
        Swal.fire({
          title: 'Error',
          text: 'Error fetching user growth data.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    };

    const fetchTotalUsers = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          setError('No access token found');
          return;
        }

        const response = await fetch('http://127.0.0.1:8000/total_users/', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setTotalUsers(data);
      } catch (error) {
        console.error('Error fetching total users data:', error);
        setError('Error fetching total users data. Please try again.');
        Swal.fire({
          title: 'Error',
          text: 'Error fetching total users data.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    };

    fetchUserGrowth();
    fetchTotalUsers();
  }, []);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!growthData || !totalUsers) {
    return <p>Loading...</p>;
  }

  // Bar chart data
  const chartData = {
    labels: ['Previous Month', 'Current Month'],
    datasets: [
      {
        label: 'Number of Users',
        data: [growthData.previous_month_users, growthData.current_month_users],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(54, 162, 235, 0.6)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1,
      },
    ],
  };

  // Bar chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'User Growth Analytics',
      },
    },
  };

  // Pie chart data
  const pieData = {
    labels: ['Total Users'],
    datasets: [
      {
        data: [totalUsers.total_users],
        backgroundColor: ['#36A2EB'],
        hoverBackgroundColor: ['#36A2EB'],
      },
    ],
  };

  return (
    <div className="container mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-4">User Growth Analytics</h1>
      <div className="flex flex-wrap justify-between bg-white p-6 rounded-lg shadow-lg">
        <div className="w-full md:w-1/2 p-4">
          <Bar data={chartData} options={chartOptions} />
        </div>
        <div className="w-full md:w-1/3 p-4">
          <h2 className="text-xl font-bold mb-4 text-center">Total Users</h2>
          <Pie data={pieData} />
        </div>
      </div>
      <div className="mt-6 text-center">
        <p className="text-lg">User Growth: {growthData.growth}%</p>
      </div>
    </div>
  );
}

export default Home;