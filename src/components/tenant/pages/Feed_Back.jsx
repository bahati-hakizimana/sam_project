import React, { useState } from 'react';
import Swal from 'sweetalert2';

function Feed_Back() {
  const [description, setDescription] = useState('');
  const defaultName = 'kamali';

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem('access_token'); // Retrieve the token

    if (!token) {
      Swal.fire({
        icon: 'error',
        title: 'Unauthorized',
        text: 'No access token found. Please log in.',
        confirmButtonColor: '#d33',
      });
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/event/add/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include the token in headers
        },
        body: JSON.stringify({
          name: defaultName,
          description: description,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      Swal.fire({
        icon: 'success',
        title: 'Feedback Submitted',
        text: `Your feedback has been submitted successfully.`,
        confirmButtonColor: '#3085d6',
      });
      setDescription(''); // Clear the form
    } catch (error) {
      console.error('Error submitting feedback:', error);
      Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: 'There was an error submitting your feedback. Please try again later.',
        confirmButtonColor: '#d33',
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Submit Feedback</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Your Feedback
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md placeholder-gray-500"
              placeholder="Write your feedback here..."
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
}

export default Feed_Back;