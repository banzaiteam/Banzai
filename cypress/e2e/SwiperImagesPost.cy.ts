describe('template spec', () => {
  it('swipe slide', () => {
    cy.visit('http://localhost:3000/posts/3d3cd0f4-460f-4664-8494-63612c8ef7aa')
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
