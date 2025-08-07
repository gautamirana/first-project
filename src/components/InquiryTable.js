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
          </tr>
        </thead>
        <tbody>
          {inquiries.length > 0 ? (
            inquiries.map((item, index) => (
              <tr key={index}>
                <td>{item.fullName}</td>
                <td>{item.email}</td>
                <td>{item.mobile}</td>
                <td>{item.message}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
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
