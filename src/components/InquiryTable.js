// src/components/InquiryTable.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/InquiryTable.css";

const InquiryTable = () => {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/inquiry/getAll")
      .then((response) => setInquiries(response.data))
      .catch((error) => console.error("Fetch error:", error));
  }, []);

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this inquiry?"
      );
      if (!confirmDelete) return;

      const res = await axios.delete(
        `http://localhost:5000/api/inquiry/delete/${id}`
      );
      if (res.data?.success) {
        setInquiries((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/inquiry/updateStatus/${id}`,
        { status }
      );
      if (res.data?.success) {
        setInquiries((prev) =>
          prev.map((item) => (item._id === id ? { ...item, status } : item))
        );
      }
    } catch (error) {
      console.error("Status update error:", error);
    }
  };

  return (
    <div className="inquiry-container">
      <h2 className="beautiful-title">Inquiry Data</h2>
      <table className="inquiry-table">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Message</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {inquiries.length > 0 ? (
            inquiries.map((item) => (
              <tr key={item._id}>
                <td>{item.fullName}</td>
                <td>{item.email}</td>
                <td>{item.mobile}</td>
                <td>{item.message}</td>
                <td>
                  <div
                    className="status-group"
                    role="group"
                    aria-label="Status"
                  >
                    <label className="status-option">
                      <input
                        type="radio"
                        name={`status-${item._id}`}
                        checked={item.status === "Pending"} // Only checked if explicitly Pending
                        onChange={() => handleStatusChange(item._id, "Pending")}
                      />
                      Pending
                    </label>
                    <label className="status-option" style={{ marginLeft: 12 }}>
                      <input
                        type="radio"
                        name={`status-${item._id}`}
                        checked={item.status === "Completed"} // Only checked if explicitly Completed
                        onChange={() =>
                          handleStatusChange(item._id, "Completed")
                        }
                      />
                      Completed
                    </label>
                  </div>
                </td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(item._id)}
                    title="Delete this inquiry"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No inquiries found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InquiryTable;
