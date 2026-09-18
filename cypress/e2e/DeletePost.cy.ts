import { beforeEachFunction } from './ShowPost.cy'

describe('template spec', () => {
  beforeEach(beforeEachFunction)

  /*it('1. Not delete', () => {
    cy.get('[data-id="meatballs-menu-btn"]').click()
    cy.wait(1500)
    cy.get('[data-id="meatballs-menu-list"]').should('exist')
    cy.wait(1500)
    cy.get('[data-id="meatballs-menu-Delete Post"]').click()
    cy.wait(1500)
    cy.get('[data-id="meatballs-menu-list"]').should('not.exist')
    cy.wait(1500)
    cy.get('[data-id="meatballs-verify-modal-wrapper"]').should('exist')
    cy.wait(1500)
    cy.get('[data-id="verify-delete-modal-no-btn"]').click()
    cy.wait(1500)
    cy.get('[data-id="meatballs-verify-modal-wrapper"]').should('not.exist')

    /!* cy.get('[data-id="verify-delete-modal"]')*!/
  })*/
  it('2. Delete Post - UI flow with mocked API', () => {
    // 1. Мокаем успешный ответ от сервера при удалении
    cy.intercept(
      'DELETE',
      '/api/v1/posts/*', // Любой ID поста
      { statusCode: 200 } // Мок успешного ответа
    ).as('deletePost') // Даём имя для отслеживания

    // 2. Открываем меню и кликаем "Delete Post"
    cy.get('[data-id="meatballs-menu-btn"]').click()
    cy.get('[data-id="meatballs-menu-Delete Post"]').should('be.visible').click()

    // 3. Подтверждаем удаление в модалке
    cy.get('[data-id="meatballs-verify-modal-wrapper"]').should('be.visible')
    cy.get('[data-id="verify-delete-modal-yes-btn"]').click()

    // 4. Проверяем, что:
    //    - Модалка закрылась
    //    - POST-запрос был отправлен (опционально)
    //    - Пост исчез из UI (если нужно)
    cy.get('[data-id="meatballs-verify-modal-wrapper"]').should('not.exist')

    cy.wait('@deletePost').its('response.statusCode').should('eq', 200) // Проверка, что мок сработал
    cy.visit('/profile')
  })
})
