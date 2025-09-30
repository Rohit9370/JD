describe('Admin login page', () => {
  it('renders the admin login form', () => {
    cy.visit('/admin')
    cy.contains('Admin Login').should('be.visible')
    cy.get('input[type="email"]').should('exist')
    cy.get('input[type="password"]').should('exist')
    cy.contains('Sign in').should('be.visible')
  })
})
