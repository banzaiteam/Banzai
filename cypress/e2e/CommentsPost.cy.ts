export const beforeEachFunction = () => {
  cy.visit(`/auth/signIn`)
  cy.get('[data-id="input-email-sign-in"]').should('be.visible').type(Cypress.env('user').email)
  cy.get('[data-id="input-password-sign-in"]')
    .should('be.visible')
    .type(Cypress.env('user').password)
  cy.get('[data-id="input-email-sign-in"]').should('have.value', Cypress.env('user').email)
  cy.get('[data-id="input-password-sign-in"]').should('have.value', Cypress.env('user').password)

  cy.get('[data-id="sign-in-button"]').click()
  cy.url().should('eq', `${Cypress.env('baseUrl')}/`) // Полный URL
  cy.visit(`/posts/${Cypress.env('postId')}`)
}

describe('ShowPost Component E2E Tests', () => {
  beforeEach(beforeEachFunction)

  it('1.', () => {
    let initialCount: number

    // 1. Получаем начальное количество
    cy.get('[data-id="post-comment-item"]').then($el => {
      initialCount = $el.length
    })

    cy.get('[data-id="comment-input"]').should('be.visible').type('test')
    cy.get('[data-id="comment-input"]').should('have.value', 'test')
    cy.intercept('POST', '/api/v1/posts/comments').as('createComment')
    cy.get('[data-id="publish-comment-btn"]').should('be.visible').click()
    cy.wait('@createComment').its('response.statusCode').should('eq', 201)
    cy.wait(1000)
    cy.get('[data-id="post-comment-item"]').should($el => {
      expect($el.length).to.equal(initialCount + 1)
    })
  })
})
