# Contact List App

Built using React, Context, & Bootstrap 

This project can be viewed here:<br>
https://fperez028-contact-list-app.vercel.app/

Features & Functionality<br>
- App loads to Contact List view
- Add New Contact button brings up a new view with a Add New Contact form
    - All fields are required to have some input in order to create new contact
    - Cancel button on form will return to Contact List view
    - Save Contact button will create new contact and return to Contact List view
- Each Contact Card has an Edit and a Delete button
    - The Edit Contact button will bring up an Edit View
        - This view is identical to the Add New Contact view but with the existing 
        data populated for the user
         - The user can edit any field and click Save Changes to return to Contact List 
            view
            - The user can click Cancel to return to Contact List view without making changes
        - The Add New Contact button is visible in the Navbar from this view
            - Clicking the Add New Contact button from this view will cancel any pending
                edits and bring up the blank Add New Contact view
    - The Delete button will bring up a confirmation modal
        - Clicking Cancel will close the modal with no deletion made
        - Clicking Delete will close the modal and delete the contact card