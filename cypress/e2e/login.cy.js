import { buildUser } from "../support/generate"

describe('Login', () => {
  beforeEach(() => {
    cy.visit('/login')
  })
  it('should successfully log in and out', () => {
    cy.findByText(/register/i).click()
    const user = buildUser()

    cy.findByText(/full name/i).type(user.fullName)
    cy.findByText(/email/i).type(user.email)
    cy.findByText(/password/i).type(user.password)
    cy.findByRole('button', { name: /register/i }).click()

    // click a second time
    cy.wait(1000)
    cy.findByText(/login/i).click()

    cy.findByLabelText(/email/i).type(user.email)
    cy.findByLabelText(/password/i).type(user.password)
    cy.findByRole('button', { name: /login/i }).click()

    cy.location('pathname').should('match', /\/home$/);
    cy.findByText(/logout/i).click();
    cy.location('pathname').should('match', /\/$/);
  })
  it('should fail if password or username are empty', () => {
    cy.findByRole('button', { name: /login/i }).click();
    cy.findByText(/Email and password are required./i).should('exist')

    cy.findByLabelText(/email/i).type('test@test.com')
    cy.findByRole('button', { name: /login/i }).click();
    cy.findByText(/Email and password are required./i).should('exist')
  
  })
  it('should fail if password or username are wrong', () => {
    cy.findByLabelText(/email/i).type('test@test.com')
    cy.findByLabelText(/password/i).type('123456')
    cy.findByRole('button', { name: /login/i }).click();
    cy.findByText(/Incorrect email or password./i).should('exist')
  })
  it('should fail if email is invalid', () => {
    cy.findByLabelText(/email/i).type('testtest.com')
    cy.findByLabelText(/password/i).type('123456')
    cy.findByRole('button', { name: /login/i }).click();
    cy.findByText(/Failed to login. Please try again later./i).should('exist')
  })
})