import React from "react";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar px-4">
      <div className="container-fluid">
        <h2 className="fw-bold">Contact List</h2>

        <button className="btn btn-success" onClick={() => navigate("/add")}>
			Add New Contact
        </button>
      </div>
    </nav>
  );
};
