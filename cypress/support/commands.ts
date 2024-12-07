/// <reference types="cypress" />

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      login(): Chainable<void>
    }
  }
}
import { ApiEndpoints } from '@/api/endpoints'
import { Routes } from '@/routes'
import { generateSubdomainAwareUrl, generateUrl } from '@/utils/url'

import '@testing-library/cypress/add-commands'

Cypress.Commands.add('login', () => {
  cy.intercept('POST', ApiEndpoints.MAGIC_LOGIN_LINK_REQUEST, {
    url: generateSubdomainAwareUrl(Routes.MAGIC_LOGIN) + '?token=token',
  }).as('loginUrl')

  cy.intercept('POST', ApiEndpoints.MAGIC_LOGIN, {
    body: {
      access_token: 'accessToken',
      refresh_token: 'refreshToken',
    },
  }).as('loginApiResponse')

  cy.intercept('GET', ApiEndpoints.GET_ACCOUNT_INFO, {
    fixture: 'account.json',
  })

  cy.intercept(
    'GET',
    generateUrl(ApiEndpoints.GET_MANAGER_REPORTS, { employeeId: 1 }),
    {
      fixture: 'positions.json',
    },
  )

  cy.intercept(
    'GET',
    generateUrl(ApiEndpoints.GET_REPORT_EXECUTIVE_SUMMARY, {
      reportId: 1,
    }),
    {
      fixture: 'executive-summary.json',
    },
  )

  cy.intercept(
    'GET',
    generateUrl(ApiEndpoints.GET_REPORT_INNOVATION_IDEAS, {
      reportId: 1,
    }) + '*',
    {
      fixture: 'innovation-ideas.json',
    },
  )

  cy.intercept(
    'GET',
    generateUrl(ApiEndpoints.GET_REPORT_INNOVATION_IDEAS_MATRIX, {
      reportId: 1,
    }) + '*',
    {
      fixture: 'innovation-ideas-matrix.json',
    },
  )

  cy.intercept(
    'GET',
    generateUrl(ApiEndpoints.GET_INNOVATION_IDEA, {
      id: 1,
    }),
    {
      fixture: 'innovation-idea-1.json',
    },
  )

  cy.intercept(
    'GET',
    generateUrl(ApiEndpoints.GET_REPORT_GOALS, { reportId: 1 }) + '*',
    { body: { result: [] } },
  )

  cy.intercept(
    'GET',
    generateUrl(ApiEndpoints.GET_REPORT_KPI_SCORES, { reportId: 1 }),
    { fixture: 'kpi-scores.json' },
  )

  cy.intercept('GET', ApiEndpoints.GET_MODULES, { fixture: 'modules.json' })
  cy.intercept('GET', ApiEndpoints.GET_MODULE_URLS, {
    body: {
      passed_order: 0,
      result: [
        {
          order: 1,
          url: 'https://dialogue.oao.xyz',
        },
      ],
    },
  })
  cy.intercept('GET', ApiEndpoints.GET_MODULE_SCHEDULES, {
    body: { result: [] },
  })
  cy.intercept(
    'GET',
    generateUrl(ApiEndpoints.GET_CONTENT_SUMMARIES, { id: 3 }) + '*',
    {
      body: { result: [] },
    },
  )
  cy.intercept(
    'GET',
    generateUrl(ApiEndpoints.GET_CONTENT_SUMMARIES, { id: 1 }) + '*',
    {
      body: { result: [] },
    },
  )
  cy.intercept('GET', ApiEndpoints.GET_VIEWED_OAO_CONTENTS, {
    body: { result: [] },
  })
  cy.intercept('GET', ApiEndpoints.GET_DEEP_DIVES + '*', {
    body: { result: [] },
  })
  cy.intercept('GET', ApiEndpoints.GET_PARTICIPANT_INNOVATION_IDEA, {
    statusCode: 404,
    body: { error: 'not found.' },
  })

  cy.session(['session'], () => {
    cy.visit(generateSubdomainAwareUrl(Routes.LOGIN))
    cy.get('input').type('test@test.test{enter}')
    cy.wait('@loginUrl').then(({ response }) => {
      cy.log('Response', response.body)
      cy.visit((response.body as { url: string }).url)
      cy.wait('@loginApiResponse')
      cy.location('pathname').should(
        'eq',
        generateSubdomainAwareUrl(Routes.PARTICIPANTS_INDEX),
      )
    })
  })
})
