const API_BASE_URL = "https://playground.4geeks.com/apis/fake/contact";
const AGENDA_SLUG = "fperez028";

// Fetch all contacts associated with the agenda
export async function getContacts() {
    try {
        const response = await fetch(`${API_BASE_URL}/agenda/${AGENDA_SLUG}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch contacts: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("getContacts error:", error);
        throw error;
    }
}