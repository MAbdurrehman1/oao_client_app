import { ApiEndpoints } from '@/api/endpoints'
import { Routes } from '@/routes'
import { generateSubdomainAwareUrl, generateUrl } from '@/utils/url'

describe('Participants magic login', () => {
  it('should auto login with magic token', () => {
    cy.intercept('POST', ApiEndpoints.MAGIC_LOGIN, {
      body: {
        access_token: 'accessToken',
        refresh_token: 'refreshToken',
      },
    }).as('loginApiResponse')
    cy.intercept('GET', ApiEndpoints.GET_MODULES, {
      fixture: 'modules.json',
    }).as('sessions')
    cy.intercept('GET', ApiEndpoints.GET_MODULE_URLS, {
      body: { result: [{ url: '', order: 1 }], passed_order: 0 },
    })
    cy.intercept('GET', ApiEndpoints.GET_MODULE_SCHEDULES, {
      body: { result: [] },
    })
    cy.intercept('GET', ApiEndpoints.GET_PARTICIPANT_INNOVATION_IDEA, {
      statusCode: 404,
      body: { error: 'no idea' },
    })
    cy.visit(
      generateSubdomainAwareUrl(Routes.PARTICIPANTS_INDEX) +
        '?token=magic-token',
    )
    cy.intercept('GET', ApiEndpoints.GET_ACCOUNT_INFO, {
      fixture: 'account.json',
    }).as('account')
    cy.wait('@account')
    cy.wait('@sessions')
    cy.findByTestId('schedule-cta').should('exist')
  })
})

describe('Participants', () => {
  beforeEach(() => {
    cy.login()
    cy.clock(Date.UTC(2024, 8, 23, 0, 5), ['Date'])
    cy.visit(generateSubdomainAwareUrl(Routes.PARTICIPANTS_INDEX))
  })

  const confirmStep = (step: 1 | 2 | 3) => {
    cy.location('pathname').should(
      'eq',
      generateSubdomainAwareUrl(Routes.SCHEDULE_SESSIONS_MODAL_STEP, { step }),
    )
    cy.findByTestId(`confirm-step-${step}`).click()
  }

  const interceptModuleScheduleUpsert = (id: 1 | 2 | 3) => {
    cy.intercept(
      'POST',
      generateUrl(ApiEndpoints.UPSERT_MODULE_SCHEDULE, { id }),
      {
        statusCode: 200,
      },
    ).as('schedulesCreation')
  }

  it('should see nothing if there is no active campaign', () => {
    cy.intercept('GET', ApiEndpoints.GET_MODULES, {
      statusCode: 404,
      body: { error: 'no active campaign' },
    }).as('modules')
    cy.visit(generateSubdomainAwareUrl(Routes.PARTICIPANTS_INDEX))
    cy.wait('@modules')
    cy.contains('There’re currently no active campaigns for your account.')
  })

  it('should be able to schedule all sessions in the modal', () => {
    cy.intercept('POST', ApiEndpoints.SET_PREFERRED_LANG, {
      body: { result: 'Language set successfully' },
    }).as('schedules')
    cy.intercept('GET', ApiEndpoints.GET_MODULE_SCHEDULES, {
      body: { result: [] },
    }).as('schedules')
    cy.wait('@schedules')
    cy.findByTestId('schedule-cta').should('exist').click()
    confirmStep(1)
    cy.findByTestId(`confirm-step-2`).click()
    cy.contains('Another session is scheduled from')
    cy.get('button[name="day"]').contains(24).click()
    confirmStep(2)
    cy.get('button[name="day"]').contains(25).click()
    confirmStep(3)
    cy.location('pathname').should(
      'eq',
      generateSubdomainAwareUrl(Routes.SCHEDULE_SESSIONS_MODAL_STEP, {
        step: 'preferred-lang',
      }),
    )
    cy.findByTestId('confirm-lang').click()
    cy.location('pathname').should(
      'eq',
      generateSubdomainAwareUrl(Routes.SCHEDULE_SESSIONS_MODAL_STEP, {
        step: 'finalize',
      }),
    )
    for (const id of [1, 2, 3]) {
      interceptModuleScheduleUpsert(id as 1 | 2 | 3)
    }
    cy.intercept('GET', ApiEndpoints.GET_MODULE_SCHEDULES, {
      fixture: 'module-schedules.json',
    }).as('newSchedules')
    cy.findByTestId('submit-sessions').click()
    cy.wait('@newSchedules')
    cy.get('@schedulesCreation.all').should('have.length', 3)
    cy.location('pathname').should(
      'eq',
      generateSubdomainAwareUrl(Routes.PARTICIPANTS_INDEX),
    )
    cy.contains('reschedule')
  })

  it('should be able to reschedule a session', () => {
    cy.intercept('GET', ApiEndpoints.GET_MODULE_SCHEDULES, {
      fixture: 'module-schedules.json',
    }).as('schedules')
    cy.wait('@schedules')
    cy.findAllByTestId('reschedule-btn')
      .should('have.length', 3)
      .first()
      .click()
    cy.findByRole('dialog').should('have.attr', 'data-state', 'open')
    interceptModuleScheduleUpsert(1)
    cy.get('button[name="day"]').contains(29).click()
    cy.findByTestId('reschedule-submit-btn').click()
    cy.findByRole('dialog').should('not.exist')
  })

  it('should see reschedule popup when url param exists', () => {
    cy.intercept('GET', ApiEndpoints.GET_MODULE_SCHEDULES, {
      fixture: 'module-schedules.json',
    }).as('schedules')
    cy.visit(
      generateSubdomainAwareUrl(Routes.PARTICIPANTS_INDEX) + '?reschedule=1',
    )
    cy.wait('@schedules')
    interceptModuleScheduleUpsert(1)
    cy.findByRole('dialog').should('have.attr', 'data-state', 'open')
  })

  it('should redirect to session url when attend param exists', () => {
    cy.intercept('GET', ApiEndpoints.GET_MODULE_SCHEDULES, {
      fixture: 'module-schedules.json',
    }).as('schedules')
    const mockURL = '/mock-url'
    cy.intercept('GET', ApiEndpoints.GET_MODULE_URLS, {
      body: {
        passed_order: 0,
        result: [
          {
            order: 1,
            url: 'http://localhost:3000' + mockURL,
          },
        ],
      },
    })
    cy.visit(generateSubdomainAwareUrl(Routes.PARTICIPANTS_INDEX) + '?attend')
    cy.wait('@schedules')
    cy.location('pathname').should('eq', mockURL)
  })

  it('should have recap modal when a session is passed', () => {
    cy.intercept('GET', ApiEndpoints.GET_MODULE_SCHEDULES, {
      fixture: 'module-schedules.json',
    }).as('schedules')
    cy.intercept('GET', ApiEndpoints.GET_MODULE_URLS, {
      body: {
        passed_order: 1,
        result: [
          {
            order: 1,
            url: '',
          },
          {
            order: 2,
            url: '',
          },
        ],
      },
    })
    cy.findAllByTestId('session-recap-btn')
      .should('have.length', 1)
      .first()
      .click()
    cy.location('pathname').should(
      'eq',
      generateSubdomainAwareUrl(Routes.SESSION_RECAP_MODAL, { id: 1 }),
    )
  })

  it('should see create innovation idea if all sessions are passeed but innovation idea is not created yet', () => {
    cy.intercept('GET', ApiEndpoints.GET_MODULE_SCHEDULES, {
      fixture: 'module-schedules.json',
    }).as('schedules')
    cy.intercept('GET', ApiEndpoints.GET_MODULE_URLS, {
      body: {
        passed_order: 3,
        result: [],
      },
    })
    cy.findByTestId('create-innovation-idea-modal-btn').click()
    cy.location('pathname').should(
      'eq',
      generateSubdomainAwareUrl(Routes.SESSION_RECAP_MODAL, { id: 3 }),
    )
  })
})

describe('Participants with innovation idea', () => {
  beforeEach(() => {
    cy.login()
    cy.intercept('GET', ApiEndpoints.GET_PARTICIPANT_INNOVATION_IDEA, {
      fixture: 'innovation-idea-1.json',
    })
    cy.clock(Date.UTC(2024, 8, 23, 0, 5), ['Date'])
    cy.visit(generateSubdomainAwareUrl(Routes.PARTICIPANTS_INDEX))
  })

  it('should see innovation idea in last session recap', () => {
    cy.intercept('GET', ApiEndpoints.GET_MODULE_SCHEDULES, {
      fixture: 'module-schedules.json',
    }).as('schedules')
    cy.intercept('GET', ApiEndpoints.GET_MODULE_URLS, {
      body: {
        passed_order: 3,
        result: [],
      },
    })

    cy.findAllByTestId('session-recap-btn')
      .should('have.length', 3)
      .last()
      .click()
    cy.location('pathname').should(
      'eq',
      generateSubdomainAwareUrl(Routes.SESSION_RECAP_MODAL, { id: 3 }),
    )
    cy.contains('cypress feed 1')
  })

  it('should see deep dives if innovation idea is created', () => {
    cy.intercept('GET', ApiEndpoints.GET_MODULE_SCHEDULES, {
      fixture: 'module-schedules.json',
    }).as('schedules')
    cy.intercept('GET', ApiEndpoints.GET_MODULE_URLS, {
      body: {
        passed_order: 3,
        result: [],
      },
    })
    cy.intercept('GET', ApiEndpoints.GET_DEEP_DIVES + '*', {
      body: { result: [] },
    }).as('deepDives')
    cy.contains('deep dives')
    cy.wait('@deepDives')
  })
})
