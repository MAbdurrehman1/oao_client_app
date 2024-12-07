import { ApiEndpoints } from '@/api/endpoints'
import { Routes } from '@/routes'
import { generateSubdomainAwareUrl, generateUrl } from '@/utils/url'

describe.only('Auth', () => {
  it('should redirect to login page on auth-locked pages', () => {
    cy.visit(generateSubdomainAwareUrl(Routes.MANAGERS_INDEX))
    cy.location('pathname').should(
      'eq',
      generateSubdomainAwareUrl(Routes.LOGIN),
    )
    cy.visit(generateSubdomainAwareUrl(Routes.PARTICIPANTS_INDEX))
    cy.location('pathname').should(
      'eq',
      generateSubdomainAwareUrl(Routes.LOGIN),
    )
  })
  it('should fail on invalid email address', () => {
    cy.visit(generateSubdomainAwareUrl(Routes.LOGIN))
    cy.get('input').type('test{enter}')
    cy.contains('Please enter a valid email address')
  })
  it('should see a error message on email address not existing in the DB', () => {
    cy.visit(generateSubdomainAwareUrl(Routes.LOGIN))
    cy.intercept('POST', ApiEndpoints.MAGIC_LOGIN_LINK_REQUEST, {
      body: { error: 'user with email not found' },
      statusCode: 401,
    })
    cy.get('input').type('test@test.test{enter}')
    cy.contains('user with email not found')
  })
  it('should be able to login', () => {
    cy.login()
  })
  it('should be able to logout', () => {
    cy.login()
    cy.visit(generateSubdomainAwareUrl(Routes.MANAGERS_INDEX))
    cy.findAllByText('Log-out').click()
    cy.location('pathname').should(
      'eq',
      generateSubdomainAwareUrl(Routes.LOGIN),
    )
  })
  it('should call refresh token api when getting 401', () => {
    cy.login()
    const newAccessToken = 'newAccessToken'
    cy.intercept('GET', ApiEndpoints.GET_ACCOUNT_INFO, (req) => {
      const authHeader = req.headers.Authorization ?? req.headers.authorization
      if (authHeader?.includes(newAccessToken))
        return req.reply({ statusCode: 200, fixture: 'account.json' })
      else return req.reply(401)
    }).as('api')
    cy.intercept('POST', ApiEndpoints.REFRESH_TOKEN, {
      body: {
        access_token: newAccessToken,
        refresh_token: 'newRefreshToken',
      },
    }).as('refreshApiResponse')
    cy.visit(generateSubdomainAwareUrl(Routes.MANAGERS_INDEX))
    cy.wait('@api').its('response.statusCode').should('eq', 401)
    cy.wait('@refreshApiResponse')
    cy.wait('@api').its('response.statusCode').should('eq', 200)
  })
  it('should log user out if refresh token api gets 401', () => {
    cy.login()
    cy.intercept('GET', ApiEndpoints.GET_ACCOUNT_INFO, {
      statusCode: 401,
    }).as('failed401')
    cy.intercept('POST', ApiEndpoints.REFRESH_TOKEN, {
      statusCode: 401,
      body: { error: 'Token is no longer valid.' },
    }).as('refreshApiResponse')
    cy.visit(generateSubdomainAwareUrl(Routes.MANAGERS_INDEX))
    cy.wait('@refreshApiResponse')
    cy.location('pathname').should(
      'eq',
      generateSubdomainAwareUrl(Routes.LOGIN),
    )
  })
  it('should redirect to participants page if not a manager', () => {
    cy.login()
    cy.intercept(
      'GET',
      generateUrl(ApiEndpoints.GET_MANAGER_REPORTS, {
        employeeId: 1,
      }),
      {
        result: [],
      },
    )
    cy.visit(generateSubdomainAwareUrl(Routes.MANAGERS_INDEX))
    cy.location('pathname').should(
      'eq',
      generateSubdomainAwareUrl(Routes.PARTICIPANTS_INDEX),
    )
  })
})
