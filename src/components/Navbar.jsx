import React from "react";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar bg-info shadow py-3">
      <div className="container">
        <div
          className="d-flex justify-content-between align-items-center mx-auto"
          style={{ maxWidth: "500px", width: "100%" }}
        >
          <h2 className="fw-bold text-muted mb-0">Contact List</h2>
          <button
            className="btn btn-secondary shadow-sm"
            onClick={() => navigate("/add")}
          >
            Add New Contact
          </button>
        </div>
      </div>
    </nav>
  );
};
