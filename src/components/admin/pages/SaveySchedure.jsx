import React, { useEffect, useState } from 'react';
import { MdAutoDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import Swal from 'sweetalert2';

const SaveySchedure = () => {
  const [surveys, setSurveys] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          setError('No access token found');
          return;
        }

        const response = await fetch('http://127.0.0.1:8000/api/surveys/', {
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
        setSurveys(data.surveys);
      } catch (error) {
        console.error('Error fetching surveys:', error);
        setError('Error fetching surveys. Please check your credentials and try again.');
      }
    };

    fetchSurveys();
  }, []);

  const handleAddSurvey = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Create Survey',
      html: `
        <input id="title" class="swal2-input" placeholder="Title">
        <textarea id="description" class="swal2-textarea" placeholder="Description"></textarea>
        <select id="category" class="swal2-select">
          <option value="services">Services</option>
          <option value="appreciation">Appreciation</option>
        </select>
      `,
      focusConfirm: false,
      preConfirm: () => {
        const title = Swal.getPopup().querySelector('#title').value;
        const description = Swal.getPopup().querySelector('#description').value;
        const category = Swal.getPopup().querySelector('#category').value;
        if (!title || !description || !category) {
          Swal.showValidationMessage('Please enter all fields');
        }
        return { title, description, category };
      },
    });
  
    if (formValues) {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          setError('No access token found');
          return;
        }
  
        const response = await fetch('http://127.0.0.1:8000/api/survey/create/', {
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
  
        const newSurvey = await response.json();
        setSurveys([...surveys, newSurvey]);
  
        Swal.fire('Survey Created', '', 'success');
      } catch (error) {
        console.error('Error creating survey:', error);
        setError('Error creating survey. Please try again.');
      }
    }
  };
  
  const handleEditSurvey = async (survey) => {
    const { value: formValues } = await Swal.fire({
      title: 'Edit Survey',
      html: `
        <input id="title" class="swal2-input" placeholder="Title" value="${survey.title}">
        <textarea id="description" class="swal2-textarea" placeholder="Description">${survey.description}</textarea>
        <select id="category" class="swal2-select">
          <option value="services" ${survey.category === 'services' ? 'selected' : ''}>Services</option>
          <option value="appreciation" ${survey.category === 'appreciation' ? 'selected' : ''}>Appreciation</option>
        </select>
      `,
      focusConfirm: false,
      preConfirm: () => {
        const title = Swal.getPopup().querySelector('#title').value;
        const description = Swal.getPopup().querySelector('#description').value;
        const category = Swal.getPopup().querySelector('#category').value;
        if (!title || !description || !category) {
          Swal.showValidationMessage('Please enter all fields');
        }
        return { title, description, category };
      },
    });
  
    if (formValues) {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          setError('No access token found');
          return;
        }
  
        const response = await fetch(`http://127.0.0.1:8000/api/survey/update/${survey.id}/`, {
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
  
        const updatedSurvey = await response.json();
        setSurveys(surveys.map(s => (s.id === updatedSurvey.id ? updatedSurvey : s)));
  
        Swal.fire('Survey Updated', '', 'success');
      } catch (error) {
        console.error('Error updating survey:', error);
        setError('Error updating survey. Please try again.');
      }
    }
  };

  const handleDeleteSurvey = async (surveyId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to recover this survey!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          setError('No access token found');
          return;
        }

        const response = await fetch(`http://127.0.0.1:8000/api/survey/delete/${surveyId}/`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        setSurveys(surveys.filter(survey => survey.id !== surveyId));

        Swal.fire('Deleted!', 'Your survey has been deleted.', 'success');
      } catch (error) {
        console.error('Error deleting survey:', error);
        setError('Error deleting survey. Please try again.');
      }
    }
  };

  return (
    <div className="container mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Survey List</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <button
        onClick={handleAddSurvey}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add Survey
      </button>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-6 text-left text-sm font-semibold">id</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Title</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Description</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Category</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Created At</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-300">
            {surveys.length === 0 ? (
              <tr>
                <td colSpan="4" className="py-4 text-center text-gray-500">No surveys found.</td>
              </tr>
            ) : (
              surveys.map((survey) => (
                <tr key={survey.id} className="hover:bg-gray-100 transition duration-200">
                  <td className="py-4 px-6 text-sm text-gray-700">{survey.id}</td>
                  <td className="py-4 px-6 text-sm text-gray-700">{survey.title}</td>
                  <td className="py-4 px-6 text-sm text-gray-700">{survey.description}</td>
                  <td className="py-4 px-6 text-sm text-gray-700">{survey.category}</td>
                  <td className="py-4 px-6 text-sm text-gray-700">{new Date(survey.created_at).toLocaleString()}</td>
                  <td className="py-4 px-6 text-sm text-gray-700 flex space-x-2">
                    <button 
                      onClick={() => handleEditSurvey(survey)}
                      className="text-gray-700 hover:text-green-500"
                    >
                      <FaEdit className="text-xl" />
                    </button>
                    <button 
                      onClick={() => handleDeleteSurvey(survey.id)}
                      className="text-gray-700 hover:text-red-500"
                    >
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

export default SaveySchedure;
