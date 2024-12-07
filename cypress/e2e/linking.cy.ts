import { Routes } from '@/routes'
import { generateSubdomainAwareUrl } from '@/utils/url'

describe('generateUrl', () => {
  it('throws an error for if required params are not passed', () => {
    expect(() => {
      generateSubdomainAwareUrl(Routes.INNOVATION_DETAIL_MODAL, {})
    }).to.throw()
  })
  it('passes if param is passed', () => {
    const href = generateSubdomainAwareUrl(Routes.INNOVATION_DETAIL_MODAL, {
      innovationId: '2',
    })
    expect(href).to.be.equal('/managers/innovation-ideas/2')
  })
  it('passes if params are passed as they should', () => {
    const href = generateSubdomainAwareUrl(
      // @ts-expect-error this is for testing purpose only
      { route: '/:just/:a/:test/', prefix: '' },
      {
        just: 'just',
        a: 'a',
        test: 'test',
      },
    )
    expect(href).to.be.equal('/just/a/test/')
  })
  it('throws an error for if wrong params are passed', () => {
    expect(() => {
      generateSubdomainAwareUrl(Routes.INNOVATION_DETAIL_MODAL, {
        innovationId: '2',
        wrongParam: '1',
      })
    }).to.throw()
  })
})
