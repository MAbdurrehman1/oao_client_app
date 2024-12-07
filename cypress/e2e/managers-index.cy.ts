import { ApiEndpoints } from '@/api/endpoints'
import { Routes } from '@/routes'
import { generateSubdomainAwareUrl, generateUrl } from '@/utils/url'

const MOCK_REPORT_ID = 1

describe('MANAGERS_INDEX page functionality', () => {
  beforeEach(() => {
    cy.login()
  })
  const visitHomePage = () => {
    cy.visit(generateSubdomainAwareUrl(Routes.MANAGERS_INDEX))
  }
  describe('Innovation ideas', () => {
    describe('filters', () => {
      it('should open filter by rating dropdown menu', () => {
        visitHomePage()
        cy.findByRole('menuitemcheckbox').should('not.exist')
        cy.findByText('Filter by rating').click()
        cy.findByRole('menu').should('have.attr', 'data-state', 'open')
        cy.findAllByRole('menuitemcheckbox')
          .first()
          .next()
          .should('exist')
          .click()
        cy.findByRole('menu').should('have.attr', 'data-state', 'closed')
      })
    })

    describe('detail modal', () => {
      const openModal = () => {
        visitHomePage()
        cy.findAllByTestId('innovation-card').first().next().click()
        cy.location('pathname').should(
          'eq',
          generateSubdomainAwareUrl(Routes.INNOVATION_DETAIL_MODAL, {
            innovationId: 1,
          }),
        )
        cy.contains('Published')
      }
      it('should open innovation modal and close using button click', () => {
        openModal()
        cy.get('[role="dialog"] button').click()
        cy.location('pathname').should(
          'eq',
          generateSubdomainAwareUrl(Routes.MANAGERS_INDEX),
        )
      })
      it('should open innovation modal and close using back button', () => {
        openModal()
        cy.go(-1)
        cy.location('pathname').should(
          'eq',
          generateSubdomainAwareUrl(Routes.MANAGERS_INDEX),
        )
      })
    })
  })
  describe('Scores and Kpis', () => {
    describe('section', () => {
      it('all 3 kPIs must exist', () => {
        visitHomePage()
        cy.findByTestId('kpi-readiness').should('exist')
        cy.findByTestId('kpi-guidance').should('exist')
        cy.findByTestId('kpi-execution').should('exist')
      })
    })
    describe('Deep dive modal', () => {
      const openKpiDeepDiveModal = (kpi: string) => {
        cy.intercept(
          generateUrl(ApiEndpoints.GET_REPORT_KPI_SCORES, {
            reportId: MOCK_REPORT_ID,
          }) + `?parent_kpi=${kpi.toUpperCase()}`,
          {
            body: {
              result: [
                {
                  name: 'URGENCY',
                  id: 54,
                },
              ],
            },
          },
        )
        cy.intercept(
          generateUrl(ApiEndpoints.GET_REPORT_KPI_SCORES, {
            reportId: MOCK_REPORT_ID,
          }) + `?parent_kpi=URGENCY_STRENGTH`,
          {
            body: {
              result: [],
            },
          },
        )
        cy.intercept(
          generateUrl(ApiEndpoints.GET_REPORT_KPI_SCORES, {
            reportId: MOCK_REPORT_ID,
          }) + `?parent_kpi=URGENCY`,
          {
            body: {
              result: [
                {
                  name: 'URGENCY_STRENGTH',
                  id: 56,
                },
              ],
            },
          },
        )
        visitHomePage()
        cy.findByTestId(`kpi-${kpi}`).contains('deep dive').click()
        cy.location('pathname').should(
          'eq',
          generateSubdomainAwareUrl(Routes.KPI_DEEP_DIVE_MODAL, {
            id: MOCK_REPORT_ID,
            kpi,
          }),
        )
        cy.findByRole('dialog').should('have.attr', 'data-state', 'open')
      }
      it('should open deep dive modal and close using back button', () => {
        openKpiDeepDiveModal('readiness')
        cy.go(-1)
        cy.location('pathname').should(
          'eq',
          generateSubdomainAwareUrl(Routes.MANAGERS_INDEX),
        )
      })
      it('should open deep dive modal and move to inner routes and close using back button', () => {
        const kpi = 'guidance'
        openKpiDeepDiveModal(kpi)
        cy.findByTestId(`kpi-dialog-urgency`).click()
        cy.location('pathname').should(
          'eq',
          generateSubdomainAwareUrl(Routes.KPI_DEEP_DIVE_MODAL_FIRST_LEVEL, {
            id: MOCK_REPORT_ID,
            kpi,
            level: 'urgency',
          }),
        )
        cy.go(-2)
        cy.location('pathname').should(
          'eq',
          generateSubdomainAwareUrl(Routes.MANAGERS_INDEX),
        )
        cy.findByRole('dialog').should('not.exist')
      })
      it('should open deep dive modal and move to inner routes and close using close button', () => {
        const kpi = 'execution'
        openKpiDeepDiveModal(kpi)
        cy.contains('urgency strength').click()
        cy.location('pathname').should(
          'eq',
          generateSubdomainAwareUrl(Routes.KPI_DEEP_DIVE_MODAL_SECOND_LEVEL, {
            id: MOCK_REPORT_ID,
            kpi,
            level: 'urgency',
            subLevel: 'urgency-strength',
          }),
        )
        cy.findByTestId('dialog-close').click()
        cy.location('pathname').should(
          'eq',
          generateSubdomainAwareUrl(Routes.MANAGERS_INDEX),
        )
        cy.findByRole('dialog').should('not.exist')
      })
      it('should handle combination of history manipulation on open deep dive modal', () => {
        const kpi = 'readiness'
        openKpiDeepDiveModal(kpi)
        cy.contains('urgency strength').click()
        cy.location('pathname').should(
          'eq',
          generateSubdomainAwareUrl(Routes.KPI_DEEP_DIVE_MODAL_SECOND_LEVEL, {
            id: MOCK_REPORT_ID,
            kpi,
            level: 'urgency',
            subLevel: 'urgency-strength',
          }),
        )
        cy.findByTestId(`kpi-dialog-urgency`).click()
        cy.location('pathname').should(
          'eq',
          generateSubdomainAwareUrl(Routes.KPI_DEEP_DIVE_MODAL_FIRST_LEVEL, {
            id: MOCK_REPORT_ID,
            kpi,
            level: 'urgency',
          }),
        )
        cy.go(-1)
        cy.location('pathname').should(
          'eq',
          generateSubdomainAwareUrl(Routes.KPI_DEEP_DIVE_MODAL_SECOND_LEVEL, {
            id: MOCK_REPORT_ID,
            kpi,
            level: 'urgency',
            subLevel: 'urgency-strength',
          }),
        )
        cy.findByTestId(`kpi-dialog-urgency`).click()
        cy.location('pathname').should(
          'eq',
          generateSubdomainAwareUrl(Routes.KPI_DEEP_DIVE_MODAL_FIRST_LEVEL, {
            id: MOCK_REPORT_ID,
            kpi,
            level: 'urgency',
          }),
        )
        cy.go(-1)
        cy.location('pathname').should(
          'eq',
          generateSubdomainAwareUrl(Routes.KPI_DEEP_DIVE_MODAL_SECOND_LEVEL, {
            id: MOCK_REPORT_ID,
            kpi,
            level: 'urgency',
            subLevel: 'urgency-strength',
          }),
        )
        cy.go(1)
        cy.location('pathname').should(
          'eq',
          generateSubdomainAwareUrl(Routes.KPI_DEEP_DIVE_MODAL_FIRST_LEVEL, {
            id: MOCK_REPORT_ID,
            kpi,
            level: 'urgency',
          }),
        )
        cy.findByTestId('dialog-close').click()
        cy.location('pathname').should(
          'eq',
          generateSubdomainAwareUrl(Routes.MANAGERS_INDEX),
        )
        cy.findByRole('dialog').should('not.exist')
      })
    })
  })
})
