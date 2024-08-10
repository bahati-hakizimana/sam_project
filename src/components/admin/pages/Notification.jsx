import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { MdAutoDelete } from 'react-icons/md';
import Swal from 'sweetalert2';

function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);

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
        setError('Error fetching notifications. Please check your credentials and try again.');
      }
    };

    fetchNotifications();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        setError('No access token found');
        return;
      }

      const response = await fetch(`http://127.0.0.1:8000/notification/delete/${id}/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setNotifications(notifications.filter(notification => notification.id !== id));
    } catch (error) {
      console.error('Error deleting notification:', error);
      setError('Error deleting notification. Please try again.');
    }
  };

  const handleAddNotification = async () => {
    const { value: description } = await Swal.fire({
      title: 'Add Notification',
      input: 'text',
      inputLabel: 'Description',
      inputPlaceholder: 'Enter notification description',
      showCancelButton: true,
      confirmButtonColor: '#007bff', // Blue color for the confirm button
      cancelButtonColor: '#6c757d', // Grey color for the cancel button
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write something!';
        }
      }
    });

    if (description) {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          setError('No access token found');
          return;
        }

        const response = await fetch('http://127.0.0.1:8000/notification/add/', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ description }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const newNotification = await response.json();
        setNotifications([...notifications, newNotification]);

        Swal.fire('Notification Added', '', 'success');
      } catch (error) {
        console.error('Error adding notification:', error);
        setError('Error adding notification. Please try again.');
      }
    }
  };

  const handleEditNotification = async (id, currentDescription) => {
    const { value: newDescription } = await Swal.fire({
      title: 'Edit Notification',
      input: 'text',
      inputLabel: 'Description',
      inputValue: currentDescription,
      inputPlaceholder: 'Enter new notification description',
      showCancelButton: true,
      confirmButtonColor: '#007bff', // Blue color for the confirm button
      cancelButtonColor: '#6c757d', // Grey color for the cancel button
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write something!';
        }
      }
    });

    if (newDescription) {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          setError('No access token found');
          return;
        }

        const response = await fetch(`http://127.0.0.1:8000/notification/update/${id}/`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ description: newDescription }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const updatedNotification = await response.json();
        setNotifications(notifications.map(notification =>
          notification.id === id ? updatedNotification : notification
        ));

        Swal.fire('Notification Updated', '', 'success');
      } catch (error) {
        console.error('Error updating notification:', error);
        setError('Error updating notification. Please try again.');
      }
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      {error && <p className="text-red-500">{error}</p>}
      <button
        onClick={handleAddNotification}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add Notification
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Created Date</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {notifications.length === 0 ? (
              <tr>
                <td colSpan="3" className="py-4 text-center">No notifications found.</td>
              </tr>
            ) : (
              notifications.map((notification) => (
                <tr key={notification.id}>
                  <td className="py-2 px-4 border-b text-center">{notification.description}</td>
                  <td className="py-2 px-4 border-b text-center">{new Date(notification.created_date).toLocaleString()}</td>
                  <td className="py-2 px-4 border-b text-center">
                    <button
                      onClick={() => handleEditNotification(notification.id, notification.description)}
                      className="mr-2"
                    >
                      <FaEdit className="text-xl text-gray-700 hover:text-green-500" />
                    </button>
                    <button onClick={() => handleDelete(notification.id)} className="text-red-500">
                      <MdAutoDelete className="text-xl hover:text-red-700" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Notification;
