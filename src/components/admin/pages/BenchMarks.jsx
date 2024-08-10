import React, { useEffect, useState } from 'react';
import { MdAutoDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const BenchMarks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          setError('No access token found');
          return;
        }

        const response = await fetch('http://127.0.0.1:8000/event/events/', {
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
        setFeedbacks(data || []);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
        setError('Error fetching feedbacks. Please check your credentials and try again.');
      }
    };

    fetchFeedbacks();
  }, []);

  const deleteFeedback = async (id) => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        setError('No access token found');
        return;
      }

      const response = await fetch(`http://127.0.0.1:8000/event/delete/${id}/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setFeedbacks(feedbacks.filter(feedback => feedback.id !== id));
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Feedback has been deleted successfully.',
        });
      } else {
        throw new Error('Failed to delete feedback.');
      }
    } catch (error) {
      console.error('Error deleting feedback:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while deleting the feedback.',
      });
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteFeedback(id);
      }
    });
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Feedback List</h1>
      {error && <p className="text-red-500">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-400 text-white">
            <tr>
              <th className="py-3 px-6 text-left text-sm font-semibold">ID</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Name</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Description</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Created Date</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {feedbacks.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-4 text-center text-gray-500">No feedbacks found.</td>
              </tr>
            ) : (
              feedbacks.map((feedback) => (
                <tr key={feedback.id}>
                  <td className="py-4 px-6 text-sm text-gray-500">{feedback.id}</td>
                  <td className="py-4 px-6 text-sm text-gray-500">{feedback.name}</td>
                  <td className="py-4 px-6 text-sm text-gray-500">{feedback.description}</td>
                  <td className="py-4 px-6 text-sm text-gray-500">{new Date(feedback.created_date).toLocaleString()}</td>
                  <td className="py-4 px-6 text-sm text-gray-500 flex space-x-2">
                    {/* <Link to={`/admin/updatefeedback/${feedback.id}`} className="text-gray-700 hover:text-green-500">
                      <FaEdit className="text-xl" />
                    </Link> */}
                    <button onClick={() => handleDelete(feedback.id)} className="text-gray-700 hover:text-red-500">
                      <MdAutoDelete className="text-xl" />
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
};
export default BenchMarks;


