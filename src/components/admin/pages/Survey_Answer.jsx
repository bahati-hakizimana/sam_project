import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'; // Import SweetAlert2 CSS

function Survey_Answer() {
  const [answers, setAnswers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          setError('No access token found');
          return;
        }

        const response = await fetch('http://127.0.0.1:8000/api/answers/', {
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
        setAnswers(data.answers);
      } catch (error) {
        console.error('Error fetching answers:', error);
        setError('Error fetching answers. Please check your credentials and try again.');
      }
    };

    fetchAnswers();
  }, []);

  const handleUpdateAnswer = async (answer) => {
    const { value: formValues } = await Swal.fire({
      title: 'Update Answer',
      html: `
        <input id="question" class="swal2-input" placeholder="Question ID" value="${answer.question}">
        <input id="choice" class="swal2-input" placeholder="Choice ID" value="${answer.choice}">
        <input id="tenant" class="swal2-input" placeholder="Tenant ID" value="${answer.tenant}">
      `,
      focusConfirm: false,
      preConfirm: () => {
        const question = Swal.getPopup().querySelector('#question').value;
        const choice = Swal.getPopup().querySelector('#choice').value;
        const tenant = Swal.getPopup().querySelector('#tenant').value;
        if (!question || !choice || !tenant) {
          Swal.showValidationMessage('Please enter all fields');
        }
        return { question, choice, tenant };
      },
      confirmButtonText: 'Update',
      cancelButtonText: 'Cancel',
      customClass: {
        confirmButton: 'swal2-confirm',
        cancelButton: 'swal2-cancel',
      },
    });

    if (formValues) {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          setError('No access token found');
          return;
        }

        const response = await fetch(`http://127.0.0.1:8000/api/answer/update/${answer.id}/`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formValues),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const updatedAnswer = await response.json();
        setAnswers(answers.map(a => a.id === updatedAnswer.id ? updatedAnswer : a));

        Swal.fire('Answer Updated', '', 'success');
      } catch (error) {
        console.error('Error updating answer:', error);
        setError('Error updating answer. Please try again.');
      }
    }
  };

  const handleDeleteAnswer = async (answerId) => {
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

        const response = await fetch(`http://127.0.0.1:8000/api/answer/delete/${answerId}/`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        setAnswers(answers.filter(answer => answer.id !== answerId));

        Swal.fire('Deleted!', 'Your answer has been deleted.', 'success');
      } catch (error) {
        console.error('Error deleting answer:', error);
        setError('Error deleting answer. Please try again.');
      }
    }
  };

  const handleAddAnswer = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Create Answer',
      html: `
        <input id="question" class="swal2-input" placeholder="Question ID">
        <input id="choice" class="swal2-input" placeholder="Choice ID">
        <input id="tenant" class="swal2-input" placeholder="Tenant ID">
      `,
      focusConfirm: false,
      preConfirm: () => {
        const question = Swal.getPopup().querySelector('#question').value;
        const choice = Swal.getPopup().querySelector('#choice').value;
        const tenant = Swal.getPopup().querySelector('#tenant').value;
        if (!question || !choice || !tenant) {
          Swal.showValidationMessage('Please enter all fields');
        }
        return { question, choice, tenant };
      },
      confirmButtonText: 'Add',
      cancelButtonText: 'Cancel',
      customClass: {
        confirmButton: 'swal2-confirm',
        cancelButton: 'swal2-cancel',
      },
    });

    if (formValues) {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          setError('No access token found');
          return;
        }

        const response = await fetch('http://127.0.0.1:8000/api/answer/create/', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formValues),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const newAnswer = await response.json();
        setAnswers([...answers, newAnswer]);

        Swal.fire('Answer Created', '', 'success');
      } catch (error) {
        console.error('Error creating answer:', error);
        setError('Error creating answer. Please try again.');
      }
    }
  };

  return (
    <div className="container mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-4">Answers List</h1>
      {error && <p className="text-red-500">{error}</p>}

      <button
        onClick={handleAddAnswer}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add Answer
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-400 text-white">
            <tr>
              <th className="py-3 px-6 text-left text-sm font-semibold">ID</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Question ID</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Choice ID</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Tenant ID</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Submitted At</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {answers.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4">No answers found</td>
              </tr>
            ) : (
              answers.map((answer) => (
                <tr key={answer.id}>
                  <td className="py-3 px-6 text-sm font-medium">{answer.id}</td>
                  <td className="py-3 px-6 text-sm">{answer.question}</td>
                  <td className="py-3 px-6 text-sm">{answer.choice}</td>
                  <td className="py-3 px-6 text-sm">{answer.tenant}</td>
                  <td className="py-3 px-6 text-sm">{answer.submitted_at}</td>
                  <td className="py-3 px-6 text-sm flex space-x-2">
                    <button
                      onClick={() => handleUpdateAnswer(answer)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteAnswer(answer.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                    <Link
                      to={`/admin/answers/${answer.id}`}
                      className="px-4 py-2 bg-green-500 text-white rounded"
                    >
                      View Details
                    </Link>
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

export default Survey_Answer;
