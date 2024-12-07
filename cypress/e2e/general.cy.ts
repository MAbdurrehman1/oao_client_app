import { Routes } from '@/routes'
import { generateSubdomainAwareUrl } from '@/utils/url'

describe('Should render and return 404', () => {
  it('report page', () => {
    cy.login()
    cy.visit(generateSubdomainAwareUrl(Routes.MANAGERS_INDEX))
  })
  it('participant page', () => {
    cy.login()
    cy.visit(generateSubdomainAwareUrl(Routes.PARTICIPANTS_INDEX))
  })
  it('should return 404', () => {
    cy.visit('/test404')
    cy.contains('not found')
  })
})
