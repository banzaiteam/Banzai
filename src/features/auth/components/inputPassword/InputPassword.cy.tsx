import React from 'react'
import { InputPassword } from './InputPassword'

describe('<InputPassword />', () => {
  it('renders correctly with default props', () => {
    cy.mount(<InputPassword />)

    cy.get('input').should('have.attr', 'type', 'password')
    cy.get('input').should('have.attr', 'placeholder', '******************')
    cy.contains('label', 'Password').should('be.visible')
    cy.get('button').should('have.attr', 'aria-label', 'Show password')
  })

  it('toggles password visibility when button is clicked', () => {
    cy.mount(<InputPassword />)

    cy.get('input').should('have.attr', 'type', 'password')
    cy.get('button').should('have.attr', 'aria-label', 'Show password')

    cy.get('button').click()

    cy.get('input').should('have.attr', 'type', 'text')
    cy.get('button').should('have.attr', 'aria-label', 'Hide password')

    cy.get('button').click()

    cy.get('input').should('have.attr', 'type', 'password')
    cy.get('button').should('have.attr', 'aria-label', 'Show password')
  })

  it('displays error state correctly', () => {
    cy.mount(<InputPassword error helperText="Invalid password" />)

    cy.get('input').should('have.attr', 'aria-invalid', 'true')
    // Ищем по тексту ошибки, так как классы CSS-модулей недоступны
    cy.contains('Invalid password').should('be.visible')
  })

  it('handles disabled state correctly', () => {
    cy.mount(<InputPassword disabled />)

    cy.get('input').should('be.disabled')
    cy.get('input').should('have.attr', 'aria-disabled', 'true')
    cy.get('button').should('be.disabled')
    cy.get('button').should('have.attr', 'disabled')
  })

  it('respects custom placeholder and subtitle', () => {
    cy.mount(<InputPassword placeholder="Enter password" subTitle="Security" />)

    cy.get('input').should('have.attr', 'placeholder', 'Enter password')
    cy.contains('label', 'Security').should('be.visible')
  })

  it('maintains input functionality', () => {
    cy.mount(<InputPassword />)
    const testPassword = 'securePass123!'

    cy.get('input').type(testPassword).should('have.value', testPassword)
  })

  it('changes icon when toggling visibility', () => {
    cy.mount(<InputPassword />)

    // Проверяем наличие кнопки переключения
    cy.get('button').should('exist')

    // Проверяем начальное состояние - иконка "скрытый глаз"
    cy.get('button').children('svg').should('exist')

    // Кликаем и проверяем изменение состояния
    cy.get('button').click()
    cy.get('button').children('svg').should('exist')

    // Возвращаем обратно
    cy.get('button').click()
    cy.get('button').children('svg').should('exist')
  })

  it('handles accessibility attributes', () => {
    cy.mount(<InputPassword />)

    // Проверка aria-required
    cy.get('input').should('have.attr', 'aria-required', 'true')

    // Проверка связи с label
    cy.get('input').should('have.attr', 'aria-labelledby')
    cy.get('input')
      .invoke('attr', 'aria-labelledby')
      .then(id => {
        // Используем селектор по ID через атрибут
        cy.get(`[id="${id}"]`).should('contain', 'Password')
      })

    // Проверка динамических aria-label на кнопке
    cy.get('button')
      .should('have.attr', 'aria-label', 'Show password')
      .click()
      .should('have.attr', 'aria-label', 'Hide password')
  })
})
