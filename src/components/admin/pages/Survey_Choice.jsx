import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

import 'sweetalert2/dist/sweetalert2.min.css'; // Import SweetAlert2 CSS

function Survey_Choice() {
  const [choices, setChoices] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChoices = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          setError('No access token found');
          return;
        }

        const response = await fetch('http://127.0.0.1:8000/api/choices/', {
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
        setChoices(data.choices);
      } catch (error) {
        console.error('Error fetching choices:', error);
        setError('Error fetching choices. Please check your credentials and try again.');
      }
    };

    fetchChoices();
  }, []);

  const handleCreateChoice = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Add New Choice',
      html: `
        <input id="question" class="swal2-input" placeholder="Question ID">
        <input id="text" class="swal2-input" placeholder="Choice Text">
        <select id="is_positive" class="swal2-input">
          <option value="">Select if Positive</option>
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
      `,
      focusConfirm: false,
      preConfirm: () => {
        const question = Swal.getPopup().querySelector('#question').value;
        const text = Swal.getPopup().querySelector('#text').value;
        const is_positive = Swal.getPopup().querySelector('#is_positive').value;
        
        if (!question || !text || !is_positive) {
          Swal.showValidationMessage(`Please fill out all fields`);
          return false;
        }
        return { question, text, is_positive };
      }
    });

    if (formValues) {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          setError('No access token found');
          return;
        }

        const response = await fetch('http://127.0.0.1:8000/api/choice/create/', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            question: formValues.question,
            text: formValues.text,
            is_positive: formValues.is_positive === 'true'
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const newChoice = await response.json();
        setChoices([...choices, newChoice]);

        Swal.fire('Created!', 'Your choice has been created.', 'success');
      } catch (error) {
        console.error('Error creating choice:', error);
        setError('Error creating choice. Please try again.');
      }
    }
  };

  const handleDeleteChoice = async (choiceId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      customClass: {
        confirmButton: 'swal2-confirm',
        cancelButton: 'swal2-cancel',
      },
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          setError('No access token found');
          return;
        }

        const response = await fetch(`http://127.0.0.1:8000/api/choice/delete/${choiceId}/`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        setChoices(choices.filter(choice => choice.id !== choiceId));

        Swal.fire('Deleted!', 'Your choice has been deleted.', 'success');
      } catch (error) {
        console.error('Error deleting choice:', error);
        setError('Error deleting choice. Please try again.');
      }
    }
  };

  return (
    <div className="container mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-4">Choices List</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className='flex justify-end items-end mb-4'>
        <button 
          onClick={handleCreateChoice} 
          className='bg-blue-600 text-white px-4 py-1 rounded-lg'
        >
          Add choice
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-400 text-white">
            <tr>
              <th className="py-3 px-6 text-left text-sm font-semibold">ID</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Question ID</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Choice Text</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">is_positive</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Created At</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Updated At</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {choices.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-4 text-center text-gray-500">No choices found.</td>
              </tr>
            ) : (
              choices.map((choice) => (
                <tr key={choice.id}>
                  <td className="py-4 px-6 text-sm text-gray-500">{choice.id}</td>
                  <td className="py-4 px-6 text-sm text-gray-500">{choice.question}</td>
                  <td className="py-4 px-6 text-sm text-gray-500">{choice.text}</td>
                  <td className="py-4 px-6 text-sm text-gray-500">{choice.is_positive.toString()}</td>
                  <td className="py-4 px-6 text-sm text-gray-500">{new Date(choice.created_at).toLocaleString()}</td>
                  <td className="py-4 px-6 text-sm text-gray-500">{new Date(choice.updated_at).toLocaleString()}</td>
                  <td className="py-4 px-6 text-sm">
                    <button
                      onClick={() => handleDeleteChoice(choice.id)}
                      className="px-2 py-1 bg-red-500 text-white rounded"
                    >
                      Delete
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

export default Survey_Choice;
