import React, { useEffect, useState, useRef } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { ContactCard } from "../components/ContactCard";
import { DeleteConfirmationModal } from "../components/DeleteConfirmationModal";
import { getContacts, deleteContact } from "../utils/api";

export const Home = () => {
    const { store, dispatch } = useGlobalReducer();
    const hasInitialized = useRef(false);

    const [showModal, setShowModal] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);
    
  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const loadContacts = async () => {
      try {
        const response = await fetch(`https://playground.4geeks.com/contact/agendas/fperez028/contacts`);

        if (response.status === 404) {
          console.warn("Agenda not found. Creating agenda...");

          const createResponse = await fetch(`https://playground.4geeks.com/contact/agendas/fperez028`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ slug: "fperez028" })
          });

          if (!createResponse.ok) {
            if (createResponse.status === 400) {
              console.warn("Agenda may already exist (400), continuing...");
            } else {
              throw new Error(`Failed to create agenda: ${createResponse.status}`);
            }
          } else {
            console.log("Agenda created successfully.");
          }

          // Add slight delay to allow backend to finish provisioning
          await new Promise((resolve) => setTimeout(resolve, 500));
        }

        // Fetch contacts after ensuring agenda exists
        const contactsResponse = await fetch(`https://playground.4geeks.com/contact/agendas/fperez028/contacts`);

        if (!contactsResponse.ok) {
          throw new Error(`Failed to fetch contacts: ${contactsResponse.status}`);
        }

        const data = await contactsResponse.json();
        dispatch({ type: "set_contacts", payload: data.contacts });

      } catch (error) {
        console.error("Error during contact load/init:", error);
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