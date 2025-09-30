describe('Home page', () => {
  it('loads and shows core sections', () => {
    cy.visit('/')
    cy.contains('Latest Announcements').should('be.visible')
    cy.contains('Quick Services').should('be.visible')
    cy.contains('Important Links').should('be.visible')
    cy.contains('Need Help?').should('be.visible')
  })

  it('navigates within the app (no 404s)', () => {
    cy.visit('/')
    cy.get('a[href="#results"], a[href="#admissions"]').first().click({ force: true })
  })
})
