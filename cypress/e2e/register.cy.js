import { buildUser } from "../support/generate"

describe('register', () => {
    beforeEach(() => {
        cy.visit('/login')
        cy.findByText(/register/i).click()
    })
    it('should create a new user', () => {
        const user = buildUser()
        
        cy.findByText(/full name/i).type(user.fullName)
        cy.findByText(/email/i).type(user.email)
        cy.findByText(/password/i).type(user.password)

        cy.findByRole('button', {name: /register/i}).click()

        cy.findByText(/User registered successfully/i).should('exist')
    })
    it('should show error with empty inputs', () => {
        const user = buildUser()
        cy.findByRole('button', {name: /register/i}).click()
        cy.findByText(/All fields are required./i).should('exist')

        cy.findByText(/full name/i).type(user.fullName)
        cy.findByText(/email/i).type(user.email)

        cy.findByRole('button', {name: /register/i}).click()
        cy.findByText(/All fields are required./i).should('exist')
    })
    it('should show error with duplicate email', () => {
        const user = buildUser()
        
        cy.findByText(/full name/i).type(user.fullName)
        cy.findByText(/email/i).type(user.email)
        cy.findByText(/password/i).type(user.password)
        cy.findByRole('button', {name: /register/i}).click()

        // click a second time
        cy.wait(1000)
        cy.findByText(/full name/i).type(user.fullName)
        cy.findByText(/email/i).type(user.email)
        cy.findByText(/password/i).type(user.password)
        cy.findByRole('button', {name: /register/i}).click()
        cy.findByText(/The email address is already in use by another account./i).should('exist')
    })
    it('should show error with bad email', () => {
        const user = buildUser()
        
        cy.findByText(/full name/i).type(user.fullName)
        cy.findByText(/email/i).type('sdjhfjsjkfghjk')
        cy.findByText(/password/i).type(user.password)

        cy.findByRole('button', {name: /register/i}).click()

        cy.findByText(/Invalid email address format./i).should('exist')
    })
    it('should show error with bad password', () => {
        const user = buildUser()
        
        cy.findByText(/full name/i).type(user.fullName)
        cy.findByText(/email/i).type(user.email)
        cy.findByText(/password/i).type('123')

        cy.findByRole('button', {name: /register/i}).click()

        cy.findByText(/Password must be at least 6 characters long./i).should('exist')
    })


})