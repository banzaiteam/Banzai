describe('template spec', () => {
  it('swipe slide', () => {
    cy.visit(`http://localhost:3000/posts/${Cypress.env('postId')}`)
    cy.get('[data-id="swiper-slide-1"]').should('have.class', 'swiper-slide-active')
    cy.get('[data-id="swiper-slide-2"]').should('not.have.class', 'swiper-slide-active')
    cy.get('[data-id="navigation-swiper-next-button"]').click()
    cy.get('[data-id="swiper-slide-1"]').should('not.have.class', 'swiper-slide-active')
    cy.get('[data-id="swiper-slide-2"]').should('have.class', 'swiper-slide-active')
    cy.get('[data-id="navigation-swiper-prev-button"]').wait(500).click()
    cy.get('[data-id="swiper-slide-1"]').should('have.class', 'swiper-slide-active')
    cy.get('[data-id="swiper-slide-2"]').should('not.have.class', 'swiper-slide-active')
  })
})
