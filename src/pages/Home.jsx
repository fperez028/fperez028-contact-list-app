import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";
import { ContactCard } from "../components/ContactCard";
import { DeleteConfirmationModal } from "../components/DeleteConfirmationModal";
import { getContacts, deleteContact } from "../utils/api";

export const Home = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);
    
    useEffect(() => {
        const loadContacts = async () => {
            try {
                const contacts = await getContacts();
                dispatch({ type: "set_contacts", payload: contacts });
            } catch (error) {
                console.error("Error fetching contacts:", error);
            }
        };

        loadContacts();
    }, [dispatch]);

  const handleDeleteClick = (contactId) => {
    const contact = store.contacts.find((c) => c.id === contactId);
    setSelectedContact(contact);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteContact(selectedContact.id);
      const contacts = await getContacts();
      dispatch({ type: "set_contacts", payload: contacts });
      setShowModal(false);
      setSelectedContact(null);
    } catch (error) {
      console.error("Failed to delete contact:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedContact(null);
  };

  return (
    <div className="container my-5">
        <div className="d-flex flex-column align-items-center">
            {store.contacts?.length > 0 ? (
              store.contacts.map((contact) => (
                <div key={contact.id} className="mb-4" style={{ width: "100%", maxWidth: "500px" }}>
                  <ContactCard contact={contact} onDelete={handleDeleteClick} />
                </div>
              ))
            ) : (
              <p className="text-muted">No contacts found.</p>
            )}
        </div>

        {selectedContact && (
          <DeleteConfirmationModal
            show={showModal}
            onClose={handleCloseModal}
            onConfirm={handleConfirmDelete}
            contactName={selectedContact.name}
          />
        )}
    </div>
  );
};