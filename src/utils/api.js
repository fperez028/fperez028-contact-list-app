const API_BASE_URL = "https://playground.4geeks.com/contact/agendas";
const AGENDA_SLUG = "fperez028";

export async function getContacts() {
    try {
        const response = await fetch(`${API_BASE_URL}/${AGENDA_SLUG}/contacts`);
        if (!response.ok) {
            throw new Error(`Failed to fetch contacts: ${response.status}`);
        }

        const data = await response.json();
        console.log("🔍 Raw contact API response:", data);
        return data.contacts;
    } catch (error) {
        console.error("getContacts error:", error);
        throw error;
    }
}

export async function createContact(contactData) {
    try {
        const response = await fetch(`${API_BASE_URL}/${AGENDA_SLUG}/contacts`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(contactData)
        });

        if (!response.ok) {
            throw new Error(`Failed to create contact: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("createContact error:", error);
        throw error;
    }
}

export async function updateContact(contactId, updatedData) {
    try {
        const response = await fetch(
            `${API_BASE_URL}/${AGENDA_SLUG}/contacts/${contactId}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedData)
            }
        );

        if (!response.ok) {
            throw new Error(`Failed to update contact: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("updateContact error:", error);
        throw error;
    }
}

export async function deleteContact(contactId) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/${AGENDA_SLUG}/contacts/${contactId}`,
      {
        method: "DELETE"
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to delete contact: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error("deleteContact error:", error);
    throw error;
  }
}