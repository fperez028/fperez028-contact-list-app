import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";
import ContactCard from "../components/ContactCard"; // You'll create this next
import { getContacts } from "../utils/api"; // We'll define this utility

export const Home = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    // Fetch contacts when component mounts
    useEffect(() => {
        const loadContacts = async () => {
            try {
                const contacts = await getContacts();
                console.log("Store contacts:", store.contacts);
                dispatch({ type: "set_contacts", payload: contacts });
            } catch (error) {
                console.error("Error fetching contacts:", error);
            }
        };

        loadContacts();
    }, [dispatch]);

    return (
        <div className="container my-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold">Contact List</h2>
                <button
                    className="btn btn-success"
                    onClick={() => navigate("/add")}
                >
                    Add New Contact
                </button>
            </div>

            <div className="row">
                {store.contacts?.length > 0 ? (
                    store.contacts.map((contact) => (
                        <div key={contact.id} className="col-md-6 mb-4">
                            <ContactCard contact={contact} />
                        </div>
                    ))
                ) : (
                    <p className="text-muted">No contacts found.</p>
                )}
            </div>
        </div>
    );
};