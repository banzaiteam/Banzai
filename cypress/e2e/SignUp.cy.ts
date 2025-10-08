describe('signUp tests', () => {
  beforeEach(() => {
    // Замените URL на реальный путь к странице регистрации
    cy.visit('/signup')
    cy.request('/signup')
  })
  /// <reference types="cypress" />
  it('renders all inputs and buttons', () => {
    cy.get('[data-id="username-field"]').should('exist')
    cy.get('[data-id="email-field"]').should('exist')
    cy.get('[data-id="password-field"]').should('exist')
    cy.get('[data-id="confirm-password-field"]').should('exist')
    cy.get('[data-id="agreement"]').should('exist')
    cy.get('[data-id="signup-btn"]').should('exist')
    cy.contains('Sign Up')
    cy.contains('Sign In')
  })

  it('navigates to Sign In page when clicking Sign In link', () => {
    cy.contains('Sign In').click()
    cy.url().should('include', '/auth/signIn')
  })

  it('calls onClickHandler on GitHub button click (alerts)', () => {
    // Чтобы проверить alert, нужно stub window.alert
    cy.window().then(win => {
      cy.stub(win, 'alert').as('alertStub')
    })

    cy.get('button[aria-label="Sign up with GitHub"]').click()
    cy.get('@alertStub').should('have.been.calledWith', 'Нажмал')
  })

  it('passes', () => {
    cy.get('[data-id="username-field"]').type(Cypress.env('user').signUpUsername)
    cy.get('[data-id="email-field"]').type(Cypress.env('user').signUpEmail)
    cy.get('[data-id="password-field"]').type(Cypress.env('user').signUpPassword)
    cy.get('[data-id="confirm-password-field"]').type(Cypress.env('user').signUpPassword)

    // Выбрать чекбокс
    cy.get('[data-id="agreement"]').click().click()
    cy.get('[data-id="signup-btn"]').click()
    cy.wait(500)
    cy.get('[data-id="email-sent-popup-ok-btn"]').click()

    cy.get('[data-id="username-field"]').should('be.empty')
    cy.get('[data-id="email-field"]').should('be.empty')
    cy.get('[data-id="password-field"]').should('be.empty')
    cy.get('[data-id="confirm-password-field"]').should('be.empty')
  })
})
