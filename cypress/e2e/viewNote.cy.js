describe('View Note Functionality', () => {
    beforeEach(() => {
      // Visit the ViewNote page 
      cy.visit('/view-note');
    });
  
    it('should display error if fields are empty', () => {
      // Click on the view note button without filling the form
      cy.get('#view-btn').click();
  
      // Verify the error message
      cy.get('.text-danger').should('contain', 'Please fill in all fields.');
    });
  
    it('should display error for incorrect note ID or password', () => {
      // Enter incorrect Note ID and password
      cy.get('#noteId').type('invalid-note-id');
      cy.get('#password').type('wrong-password');
  
      // Click the view note button
      cy.get('#view-btn').click();
  
      // Checks if error message for incorrect credentials is shown
      cy.get('.text-danger').should('contain', 'Incorrect password or note not found.');
    });
  
    it('should load note details when correct Note ID and password are provided', () => {
      // Mock a successful response for note retrieval (this assumes backend mocking or stubbing capability)
      cy.intercept('GET', '**/notes/**', {
        statusCode: 200,
        body: {
          password: 'correct-password',
          noteData: {
            title: 'Test Note',
            note: 'This is a test note.',
            timer: 10,
            fileURL: 'http://example.com/test.pdf',
            destruct: 'shred',
          },
        },
      });
  
      // Enter correct Note ID and password
      cy.get('#noteId').type('valid-note-id');
      cy.get('#password').type('correct-password');
  
      // Click the view note button
      cy.get('#view-btn').click();
  
      // Check if the note title and content are displayed
      cy.contains('Test Note').should('be.visible');
      cy.contains('This is a test note.').should('be.visible');
  
      // Verify the timer appears
      cy.get('.timer').should('contain', '10 seconds');
  
      // Verify file URL is displayed correctly
      cy.get('#file-btn a').should('have.attr', 'href', 'http://example.com/test.pdf');
    });
  
    it('should trigger animation and remove note after countdown', () => {
      // Mock the note retrieval and timer countdown
      cy.intercept('GET', '**/notes/**', {
        statusCode: 200,
        body: {
          password: 'correct-password',
          noteData: {
            title: 'Test Note',
            note: 'This is a test note.',
            timer: 2,  // Short timer for quick testing
            fileURL: null,
            destruct: 'shred',
          },
        },
      });
  
      // Enter correct Note ID and password
      cy.get('#noteId').type('valid-note-id');
      cy.get('#password').type('correct-password');
  
      // Click the view note button
      cy.get('#view-btn').click();
  
      // Wait for the timer to expire
      cy.wait(3000);
  
      // Verify that the animation gets triggered
      cy.get('#note').should('have.class', 'shred-animation');
  
      // Verify note content is eventually removed after animation completes
      cy.get('#note').should('not.exist');
    });
  });
  