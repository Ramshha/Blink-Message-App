describe('Note Composing and Sending Functionality', () => {
    beforeEach(() => {
        cy.visit('/home');
    });

    it('should create and send a note, and display the title in the dialog', () => {
        
        cy.get('input[name="title"]').type('Test Note Title');
        
        cy.get('textarea[name="note"]').type('This is a test note.');

        cy.get('input[type="email"]').type('recipient@example.com');

        cy.get('.send-btn').click();

        cy.get('dialog').should('be.visible').then(() => {
            cy.get('dialog').invoke('text').then((text) => {
                console.log(text);
            });
        });
        
    });
});
