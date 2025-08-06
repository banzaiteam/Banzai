const POST_ID = 'e2613bb6-7b6e-4e64-9c66-472c58b9b578'
const API_URL = `${Cypress.env('NEXT_PUBLIC_BASE_URL')}/posts`
const USER_URL = `${Cypress.env('NEXT_PUBLIC_BASE_URL')}/auth/me`
export const beforeEachFunction = () => {
  // Мокаем все необходимые запросы
  cy.intercept('GET', '**/api/v1/auth/me', {
    statusCode: 200,
    body: { id: 'current-user-id' },
  }).as('getMe')

  cy.intercept('GET', '**/api/v1/auth/refresh', {
    statusCode: 200,
    body: { accessToken: 'test-token' },
  }).as('refreshToken')

  cy.intercept('GET', `${API_URL}?filter=id:eq:${POST_ID}`, {
    statusCode: 200,
    body: {
      items: [
        {
          id: POST_ID,
          ownerId: 'current-user-id', // Добавляем ownerId
          files: [
            { url: 'https://example.com/image1.jpg' },
            { url: 'https://example.com/image2.jpg' },
          ],
        },
      ],
    },
  }).as('getPostData')

  cy.visit(`/posts/${POST_ID}`)
}

describe('ShowPost Component E2E Tests', () => {
  beforeEach(beforeEachFunction)

  it('1. Закрывает пост по клику на крестик', () => {
    // Используем force:true для скрытого элемента
    cy.get('[aria-label="Close post dialog"]', { timeout: 10000 }).click({ force: true })

    // Проверяем, что вернулись на предыдущую страницу
    cy.url().should('not.include', `/posts/${POST_ID}`)
  })
  it('2. Не показывает меню управления для не-владельца', () => {
    // Мокаем запрос как другого пользователя
    cy.intercept('GET', USER_URL, {
      statusCode: 200,
      body: { id: 'another-user-id' },
    }).as('getAnotherUser')

    // Перезагружаем страницу
    cy.visit(`/posts/${POST_ID}`)

    // Проверяем отсутствие меню
    cy.get('[aria-label="Post options"]', { timeout: 10000 }).should('not.exist')
  })
})
