import React, { useState } from 'react';
import axios from 'axios';

function CreateChoice() {
  const [question, setQuestion] = useState('');
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
        const token = localStorage.getItem('access_token');
        if (!token) {
            setError('No access token found');
            return;
          }
      const response = await axios.post(
        'http://127.0.0.1:8000/api/choice/create/',
        { question, text },
        {
          headers: {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
          },
        }
      );
      setSuccess('Choice created successfully!');
      setQuestion('');
      setText('');
    } catch (err) {
      setError('Failed to create choice. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Create Choice</h1>

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}

        <div className="mb-4">
          <label htmlFor="question" className="block text-gray-700 font-bold mb-2">
            Question ID
          </label>
          <input
            type="text"
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
            placeholder="Enter question ID"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="text" className="block text-gray-700 font-bold mb-2">
            Choice Text
          </label>
          <input
            type="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
            placeholder="Enter choice text"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition duration-300"
        >
          Create Choice
        </button>
      </form>
    </div>
  );
}

export default CreateChoice;

