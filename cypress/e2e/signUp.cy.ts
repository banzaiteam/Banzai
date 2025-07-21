describe('signUp tests', () => {
  it('passes', () => {
    cy.visit('/signup')
    cy.request('/signup')
    cy.get('[data-id="username-field"]').type('Andrew')
    cy.get('[data-id="email-field"]').type('andrew@mail.ru')
    cy.get('[data-id="password-field"]').type('asdasdA!1')
    cy.get('[data-id="confirm-password-field"]').type('asdasdA!1')

    // Выбрать чекбокс
    cy.get('[data-id="agreement"]').click().click()
    cy.get('[data-id="signup-btn"]').click()

    cy.get('[data-id="email-sent-popup-ok-btn"]').click()

    cy.get('[data-id="username-field"]').should('be.empty')
    cy.get('[data-id="email-field"]').should('be.empty')
    cy.get('[data-id="password-field"]').should('be.empty')
    cy.get('[data-id="confirm-password-field"]').should('be.empty')
  })
})
