import React, { useEffect, useState } from 'react';

const ITEMS_PER_PAGE = 3;

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          setError('No access token found');
          return;
        }

        const response = await fetch('http://127.0.0.1:8000/notification/notifications/', {
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
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setError('Error fetching notifications. Please try again later.');
      }
    };

    fetchNotifications();
  }, []);

  // Calculate the indexes for slicing the notifications array
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedNotifications = notifications.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total pages
  const totalPages = Math.ceil(notifications.length / ITEMS_PER_PAGE);

  return (
    <div className="container mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 gap-6 mb-6">
        {paginatedNotifications.length === 0 ? (
          <p className="text-gray-500">No notifications available.</p>
        ) : (
          paginatedNotifications.map((notification) => (
            <div key={notification.id} className="bg-white shadow-md rounded-lg p-6">
              <div className="text-gray-700 text-sm mb-2">
                {new Date(notification.created_date).toLocaleString()}
              </div>
              <p className="text-gray-900 text-lg">{notification.description}</p>
            </div>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg mx-2"
        >
          Previous
        </button>
        <span className="text-lg mx-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg mx-2"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Notifications;