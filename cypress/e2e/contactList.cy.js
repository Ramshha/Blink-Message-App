describe('Contact List Page Testing', () => {

    const addContact = (name, email) => {
      cy.get('#contact-name').type(name);
      cy.get('#contact-email').type(email);
      cy.get('#add-btn').click();
    };

    const verifyContactInTable = (name, email) => {
      cy.get('tbody').within(() => {
        cy.contains('tr', name).should('exist');
        cy.contains('tr', email).should('exist');
      });
    };

    const verifyContactNotInTable = (name) => {
      cy.get('tbody').within(() => {
        cy.contains('tr', name).should('not.exist');
      });
    };
    beforeEach(() => {
      cy.visit('/contact-list');
    });

    it('shows error messages when trying to create a contact with empty fields', () => {
 
      cy.get('#add-btn').click();
      cy.get('.text-danger').should('contain', 'Enter Contact Name');
      cy.get('.text-danger').should('contain', 'Enter Contact Email');
    });
    
    it('shows error messages when trying to create a contact with invalid email', () => {

      cy.get('#contact-name').type('John Doe');
      cy.get('#contact-email').type('invalid-email');
      cy.get('#add-btn').click();
      cy.get('.text-danger').should('contain', 'Please enter a valid Email');
    });

    it('should add and display a contact correctly', () => {
      const contactName = 'John Doe';
      const contactEmail = 'john.doe@example.com';
      addContact(contactName, contactEmail);
      verifyContactInTable(contactName, contactEmail);
      cy.contains('tr', contactName).within(() => {
        cy.get('button').should('have.length', 3); // Ensure there are 3 buttons (email, edit, delete)
      });
    });

    it('should navigate to the home page when clicking the "Send Email" button', () => {
      const contactName = 'John Doe';
      cy.contains('tr', contactName).within(() => {
        cy.get('button').find('img[alt="Email"]').click();
      });
      cy.url().should('include', '/home');
    });
    
    it('should delete a contact when clicking the "Delete" button', () => {
      const contactName = 'apple';
      const contactEmail = 'apple@example.com';
      addContact(contactName, contactEmail);
      verifyContactInTable(contactName, contactEmail);
      cy.contains('tr', contactName).within(() => {
        cy.get('button').find('img[alt="Delete"]').click();
      });
      verifyContactNotInTable(contactName);
    });
});