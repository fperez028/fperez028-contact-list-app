import React from "react";
import PropTypes from "prop-types";
import spockImg from "../assets/img/spock.png";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaUserEdit, FaTrashAlt } from "react-icons/fa";

export const ContactCard = ({ contact, onDelete }) => {
    const navigate = useNavigate();

    return (
        <div className="card shadow">
            <div className="card-body d-flex">
                <img
                    src={spockImg}
                    alt="Profile"
                    className="rounded-circle me-3"
                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                />
                <div className="flex-grow-1">
                    <h5 className="card-title">{contact.name}</h5>
                    <p className="mb-1 text-muted">
                        <FaMapMarkerAlt className="me-2" />
                        {contact.address}
                    </p>
                    <p className="mb-1 text-muted">
                        <FaPhone className="me-2" />
                        {contact.phone}
                    </p>
                    <p className="mb-0 text-muted">
                        <FaEnvelope className="me-2" />
                        {contact.email}
                    </p>
                </div>
                <div className="d-flex flex-column justify-content-around ms-3">
                    <button
                        className="btn btn-outline-primary btn-sm mb-2"
                        onClick={() => navigate(`/edit/${contact.id}`)}
                    >
                        <FaUserEdit />
                    </button>
                    <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => onDelete(contact.id)}
                    >
                        <FaTrashAlt />
                    </button>
                </div>
            </div>
        </div>
    );
};

ContactCard.propTypes = {
    contact: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string,
        email: PropTypes.string,
        phone: PropTypes.string,
        address: PropTypes.string
    }),
    onDelete: PropTypes.func
};