import React, { useState } from 'react';
import Swal from 'sweetalert2';

function Apply() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        phone_number: '',
        email: '',
        date_of_birth: '',
        national_id: null,
        degree_or_diploma: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({
            ...formData,
            [name]: files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const form = new FormData();
        form.append('first_name', formData.first_name);
        form.append('last_name', formData.last_name);
        form.append('phone_number', formData.phone_number);
        form.append('email', formData.email);
        form.append('date_of_birth', formData.date_of_birth);
        form.append('national_id', formData.national_id);
        form.append('degree_or_diploma', formData.degree_or_diploma);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/api/applicants/', {
                method: 'POST',
                body: form,
            });

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Application Submitted',
                    text: 'Your application has been submitted successfully! please teka a simple test',
                  }).then(() => {
                    
                    navigate('/tenant/tenant/survey/:surveyId'); 
                  });
                setFormData({
                    first_name: '',
                    last_name: '',
                    phone_number: '',
                    email: '',
                    date_of_birth: '',
                    national_id: null,
                    degree_or_diploma: null,
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Submission Failed',
                    text: 'Please check your inputs and try again.',
                });
            }
        } catch (error) {
            console.error('Error submitting application:', error);
            Swal.fire({
                icon: 'error',
                title: 'Submission Error',
                text: 'An error occurred. Please try again later.',
            });
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
                encType="multipart/form-data"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Application Form</h2>

                <div className="mb-4">
                    <label className="block text-gray-700">First Name</label>
                    <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        className="mt-1 px-3 py-2 border border-gray-300 rounded w-full"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Last Name</label>
                    <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        className="mt-1 px-3 py-2 border border-gray-300 rounded w-full"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Phone Number</label>
                    <input
                        type="text"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        className="mt-1 px-3 py-2 border border-gray-300 rounded w-full"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 px-3 py-2 border border-gray-300 rounded w-full"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Date of Birth</label>
                    <input
                        type="date"
                        name="date_of_birth"
                        value={formData.date_of_birth}
                        onChange={handleChange}
                        className="mt-1 px-3 py-2 border border-gray-300 rounded w-full"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">National ID (PDF)</label>
                    <input
                        type="file"
                        name="national_id"
                        onChange={handleFileChange}
                        accept="application/pdf"
                        className="mt-1 block w-full text-gray-700"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700">Degree or Diploma (PDF)</label>
                    <input
                        type="file"
                        name="degree_or_diploma"
                        onChange={handleFileChange}
                        accept="application/pdf"
                        className="mt-1 block w-full text-gray-700"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                    Submit Application
                </button>
            </form>
        </div>
    );
}

export default Apply;

