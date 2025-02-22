import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function EditApplications() {
  const { id } = useParams();
  const [applicant, setApplicant] = useState(null);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  // Fetch applicant data
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    axios
      .get(`http://127.0.0.1:8000/api/api/applicants/${id}/`,
        { headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${token}`, } }
      )
      //  // Check this URL
      .then((response) => {
        setApplicant(response.data);
        setStatus(response.data.status);
      })
      .catch((error) => {
        console.error("Error fetching applicant:", error);
        setError("Failed to fetch data.");
      });
  }, [id]);

  // Update applicant status
  const handleUpdate = (e) => {
    e.preventDefault();
    setError(""); // Reset error before request

    const token = localStorage.getItem('access_token');

    axios
      .patch(
        `http://127.0.0.1:8000/api/api/applicants/${id}/`, // Check URL
        { status }, 
        { headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${token}`, } }
      )
      .then(() => {
        alert("Status updated successfully");
      })
      .catch((error) => {
        console.error("Error updating status:", error.response || error);
        setError("Failed to update status. Check API and console logs.");
      });
  };

  if (!applicant) {
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Edit Applicant Status</h2>

      {/* Show error message if update fails */}
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      {/* Display Applicant Info */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          <strong>Name:</strong> {applicant.first_name} {applicant.last_name}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Email:</strong> {applicant.email}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Phone:</strong> {applicant.phone_number}
        </p>
        <p className="text-sm text-gray-600">
          <strong>DOB:</strong> {applicant.date_of_birth}
        </p>
      </div>

      {/* Status Update Form */}
      <form onSubmit={handleUpdate} className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="denied">Rejected</option>
        </select>

        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
        >
          Update Status
        </button>
      </form>
    </div>
  );
}

export default EditApplications;
