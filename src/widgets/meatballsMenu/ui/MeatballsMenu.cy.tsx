import React, { useState } from 'react'
import { MeatballsMenu } from './MeatballsMenu'
import { Edit2Outline, TrashOutline } from '@/assets/icons/components'
import type { MeatballsMenuItemData } from '@/widgets'

describe('<MeatballsMenu />', () => {
  const TestWrapper = ({ items }: { items: MeatballsMenuItemData[] }) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <MeatballsMenu
        items={items}
        isOpen={isOpen}
        toggleOpen={setIsOpen}
        menuLabel="Post actions"
      />
    )
  }

  it('triggers item click handlers', () => {
    const editSpy = cy.spy().as('editSpy')
    const deleteSpy = cy.spy().as('deleteSpy')

    const mockItems: MeatballsMenuItemData[] = [
      { title: 'Edit Post', icon: <Edit2Outline />, onClick: editSpy },
      { title: 'Delete Post', icon: <TrashOutline />, onClick: deleteSpy },
    ]

    cy.mount(<TestWrapper items={mockItems} />)

    // Open menu
    cy.get('[data-id="meatballs-menu-btn"]').click()

    // Click first item
    cy.get('[data-id="meatballs-menu-list"] li').first().click()
    cy.get('@editSpy').should('have.been.calledOnce')

    // Reopen menu
    cy.wait(500)
    cy.get('[data-id="meatballs-menu-btn"]').click()
    cy.get('[data-id="meatballs-menu-btn"]').click()

    // Click second item
    cy.get('[data-id="meatballs-menu-list"] li').eq(1).click()
    cy.get('@deleteSpy').should('have.been.calledOnce')
  })

  it('handles keyboard interactions', () => {
    const mockItems: MeatballsMenuItemData[] = [
      { title: 'Edit Post', icon: <Edit2Outline />, onClick: () => {} },
      { title: 'Delete Post', icon: <TrashOutline />, onClick: () => {} },
    ]

    cy.mount(<TestWrapper items={mockItems} />)

    // Open with Enter
    cy.get('[data-id="meatballs-menu-btn"]').focus().type('{enter}')
    cy.get('[data-id="meatballs-menu-list"]').should('be.visible')

    // Close with Escape from body
    cy.get('body').type('{esc}')
    cy.get('[data-id="meatballs-menu-list"]').should('not.exist')

    // Close with Escape from button
    cy.get('[data-id="meatballs-menu-btn"]').type('{esc}')
    cy.get('[data-id="meatballs-menu-list"]').should('not.exist')
  })
})
