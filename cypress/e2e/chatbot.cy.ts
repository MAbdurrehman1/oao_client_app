import { ApiEndpoints, LlmApiEndpoints } from '@/api/endpoints'
import { Routes } from '@/routes'
import { generateSubdomainAwareUrl, generateUrl } from '@/utils/url'

describe('chatbot', () => {
  beforeEach(() => {
    cy.login()
    cy.visit(generateSubdomainAwareUrl(Routes.CHATBOT_DEMO))
    cy.findByTestId('chatbot-ready')
  })

  const sendMessage = (text: string, response: string) => {
    cy.intercept('POST', LlmApiEndpoints.SEND_MESSAGE, {
      body: `\n\ndata: {"token": "${response}"}`,
      headers: { 'content-type': 'application/octet-stream' },
    })
    cy.get('textarea[name="content"]').type(`${text}{enter}`, { force: true })
    cy.contains(response)
  }

  it('should allow user input and handle stream response', () => {
    cy.findAllByTestId('user-message').should('have.length', 0)
    sendMessage('hey', 'hello back')
    cy.findAllByTestId('user-message').should('have.length', 1)
  })

  it('should disallow sending while an stream is happending', () => {
    const response = 'hello back'
    cy.intercept('POST', LlmApiEndpoints.SEND_MESSAGE, (req) => {
      req.reply({
        body: `\n\ndata: {"token": "${response}"}`,
        headers: { 'content-type': 'application/octet-stream' },
        delay: 1000,
      })
    })
    cy.findByTestId('chatbot-send-btn').should('have.attr', 'type', 'submit')
    cy.get('textarea[name="content"]').type(`$hey{enter}`, { force: true })
    cy.findAllByTestId('user-message').should('have.length', 1)
    cy.findByTestId('chatbot-send-btn').should('have.attr', 'type', 'button')
    cy.get('textarea[name="content"]').type(`$hey{enter}`, { force: true })
    // still 1 message, meaning the chatbot doesnt allow
    // a new message while getting response from previous one
    cy.findAllByTestId('user-message').should('have.length', 1)
    cy.contains(response)
    cy.findByTestId('chatbot-send-btn').should('have.attr', 'type', 'submit')
  })

  it('should retry getting account on 401 or 403', () => {
    cy.intercept('GET', ApiEndpoints.GET_ACCOUNT_INFO, { body: {} }).as(
      'accountAPI',
    )
    cy.intercept('POST', LlmApiEndpoints.SEND_MESSAGE, (req) => {
      req.reply({
        body: { error: 'not authenticated' },
        statusCode: 401,
        headers: { 'content-type': 'application/octet-stream' },
      })
    })
    cy.get('textarea[name="content"]').type(`$hey{enter}`, { force: true })
    cy.wait('@accountAPI')
    cy.intercept('GET', ApiEndpoints.GET_ACCOUNT_INFO, { body: {} }).as(
      'accountAPI2',
    )
    cy.intercept('POST', LlmApiEndpoints.SEND_MESSAGE, (req) => {
      req.reply({
        body: { detail: 'no permission' },
        statusCode: 403,
        headers: { 'content-type': 'application/octet-stream' },
      })
    })
    cy.get('textarea[name="content"]').type(`$hey{enter}`, { force: true })
    cy.wait('@accountAPI2')
  })

  it('should handle errors', () => {
    cy.intercept('GET', ApiEndpoints.GET_ACCOUNT_INFO, { body: {} }).as(
      'accountAPI',
    )
    cy.intercept('POST', LlmApiEndpoints.SEND_MESSAGE, (req) => {
      req.reply({
        body: 'no conversation_type',
        statusCode: 400,
        headers: { 'content-type': 'application/octet-stream' },
      })
    })
    cy.get('textarea[name="content"]').type(`$hey{enter}`, { force: true })
    cy.findAllByTestId('error-message-btn')
      .should('have.length', 1)
      .first()
      .click()
    cy.get('textarea[name="content"]').type(`$hey{enter}`, { force: true })
    cy.findAllByTestId('error-message-btn').should('have.length', 1)
  })

  it('should cancel stream on stop button click', () => {
    cy.intercept('POST', LlmApiEndpoints.SEND_MESSAGE, {
      body: `\n\ndata: {"token": "hello"}`,
      headers: { 'content-type': 'application/octet-stream' },
      delay: 300,
    })
    cy.get('textarea[name="content"]').type(`hey{enter}`, { force: true })
    cy.findAllByTestId('loading-indicator').should('have.length', 2)
    cy.wait(100)
    cy.findByTestId('chatbot-send-btn').click({ force: true })
    cy.findAllByTestId('loading-indicator').should('have.length', 1)
  })
})

describe('Chatbot - innovation idea', () => {
  beforeEach(() => {
    cy.login()
    cy.visit(generateSubdomainAwareUrl(Routes.CHATBOT_DEMO))
  })
  it('should detect innovation idea', () => {
    cy.intercept('POST', LlmApiEndpoints.SEND_MESSAGE, {
      fixture: 'innovation-idea-stream.txt,null',
      headers: { 'content-type': 'application/octet-stream' },
    })
    cy.findByTestId('conversation-goal').click()
    cy.findByText('Innovation Idea').click()
    cy.findByTestId('chatbot-ready')
    cy.get('textarea[name="content"]').type(`test{enter}`, { force: true })
    cy.intercept('POST', LlmApiEndpoints.SEND_MESSAGE, {
      body: `\n\ndata: {"token": "INNOVATION_IDEA_SUBMITTEDthanks for your submission."}`,
      headers: { 'content-type': 'application/octet-stream' },
    })
    cy.intercept(
      'POST',
      generateUrl(ApiEndpoints.CREATE_INNOVATION_IDEA, { participationId: 1 }),
      {
        body: { success: true },
      },
    ).as('innovationIdeaCreated')
    cy.contains('Submit Innovation Idea')
    cy.get('textarea[name="content"]').type(`submit{enter}`, { force: true })
    cy.contains('This conversation has ended.')
    cy.wait('@innovationIdeaCreated')
  })
})

describe('Chatbot - recommendation', () => {
  beforeEach(() => {
    cy.login()
    cy.visit(generateSubdomainAwareUrl(Routes.CHATBOT_DEMO))
  })
  it('should detect recommedation', () => {
    cy.intercept('POST', LlmApiEndpoints.SEND_MESSAGE, {
      fixture: 'recommendation-stream.txt,null',
      headers: { 'content-type': 'application/octet-stream' },
    })
    cy.findByTestId('conversation-goal').click()
    cy.findByText('Recommendation').click()
    cy.findByTestId('chatbot-ready')
    cy.get('textarea[name="content"]').type(`test{enter}`, { force: true })
    cy.findByTestId('edit-recommendation-btn').should('exist').click()
    cy.findByTestId('submit-recommendation-btn').should('exist').click()
    cy.contains('Recommendation has been saved to library.')
  })
})
