// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('login', (username, password) => {
    cy.log('Customer signs in to amaysim website')
    cy.visit('www.amaysim.com.au')
    cy.get('[aria-label="amaysim logo"]')
        .should('be.visible')
    cy.get('[aria-label="Account"]')
        .click()
    cy.location('pathname').should('eq', '/identity/login')
    cy.log('Login page is loaded successfully')
    cy.get('input[name="username"]')
        .should('be.visible')
        .type(username)
        cy.get('input[name="password"]')
        .type(password)
    cy.get('button[type="submit"]').click()
    cy.location('pathname').should('eq', '/my-account/my-amaysim/services')
    cy.get('span[id="WelcomeMessage"]')
        .should('be.visible')
    cy.log('Services page is loaded successfully')
 })