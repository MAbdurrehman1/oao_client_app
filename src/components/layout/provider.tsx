import {
  createRef,
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import useScrollSpy from 'react-use-scrollspy'
import { useResizeObserver, useWindowSize } from 'usehooks-ts'

import { useTailwindBreakpoint } from '@/hooks/use-tailwind-breakpoint'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { turnOffAnimationsForRoute } from '@/store/slices/animations'
import { selectRouteAnimationsVisited } from '@/store/slices/animations/selectors'
import { getScrollPosition } from '@/utils/scroll-position'
import { getSectionSlugFromTitle } from '@/utils/string'

import { type ILayoutContext, LayoutContext } from './context'
import { Footer } from './footer'
import { Header } from './header'
import { Navbar } from './navbar'
import { SectionTitle } from './section-title'
import { type ContextProviderProps, type Section } from './types'

export const LayoutContextProvider = ({
  children,
  sections,
  navbarExtra,
  baseRoute,
  hasNavbar = true,
}: ContextProviderProps) => {
  const createSection = ({
    title,
    Component,
  }: Pick<Section, 'title' | 'Component'>): Section => {
    return {
      title,
      slug: getSectionSlugFromTitle(title),
      Component,
      ref: createRef<HTMLDivElement>(),
    }
  }
  const layoutSections: Section[] = useMemo(
    () => sections.map(createSection),
    [sections],
  )
  const [isNavbarVisible, setIsNavbarVisible] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)
  const { height: headerHeight = 0 } = useResizeObserver({
    ref: headerRef,
    box: 'border-box',
  })

  const navbarRef = useRef<HTMLDivElement>(null)
  const { height: navbarHeight = 0 } = useResizeObserver({
    ref: navbarRef,
    box: 'border-box',
  })

  const { height: windowHeight } = useWindowSize()
  const isMobile = useTailwindBreakpoint({ breakpoint: 'sm', mode: 'max' })
  // 25 or 10 percent of window height based on mobile/non-mobile
  const navbarThresholdFactor = isMobile ? 4 : 10
  const navbarThreshold = useMemo(
    () => windowHeight / navbarThresholdFactor,
    [navbarThresholdFactor, windowHeight],
  )

  const heroRef = useRef<HTMLDivElement>(null)
  const activeSectionIndex = useScrollSpy({
    sectionElementRefs: [
      heroRef,
      ...layoutSections.map((section) => section.ref),
    ],
    offsetPx: -windowHeight / 2,
  })

  // if activeSectionIndex is 0, it means we're on hero section
  const activeSection: string | null = useMemo(
    () =>
      (activeSectionIndex && activeSectionIndex > 0
        ? layoutSections[activeSectionIndex - 1]?.title
        : null) ?? null,
    [activeSectionIndex, layoutSections],
  )

  const calculateScrollTargetPostion = useCallback(
    (element?: HTMLDivElement | null) => {
      if (!element) return 0
      const distance = element.getBoundingClientRect().top
      const currentScrollTopPosition = getScrollPosition().scrollTop
      const willNavbarBeVisible =
        (distance < 0 && Math.abs(distance) >= navbarThreshold) ||
        (Math.round(distance) <= headerHeight && isNavbarVisible)
      return (
        currentScrollTopPosition +
        distance -
        headerHeight -
        (willNavbarBeVisible ? navbarHeight : 0)
      )
    },
    [headerHeight, isNavbarVisible, navbarHeight, navbarThreshold],
  )

  const occupiedHeight = useMemo(
    () => headerHeight + (isNavbarVisible ? navbarHeight : 0),
    [headerHeight, isNavbarVisible, navbarHeight],
  )

  const scrollToSection = useCallback(
    (slug: Section['slug']) => {
      const top = calculateScrollTargetPostion(
        layoutSections.find((s) => s.slug === slug)?.ref.current,
      )
      window.scrollTo({
        top,
        behavior: 'smooth',
      })
    },
    [calculateScrollTargetPostion, layoutSections],
  )

  const isAnimationsVisitedBefore = useAppSelector((state) =>
    selectRouteAnimationsVisited(state, baseRoute),
  )
  // we only need to set the initial state
  const [enableAnimations, setEnableAnimations] = useState<boolean>(
    !isAnimationsVisitedBefore,
  )
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(turnOffAnimationsForRoute(baseRoute))
  }, [baseRoute, dispatch])

  // FIXME: temp hook, flag feature
  useEffect(() => {
    const callback = (event: KeyboardEvent) => {
      if (
        (event.metaKey || event.ctrlKey) &&
        event.code === 'KeyF' &&
        event.altKey &&
        event.shiftKey
      ) {
        console.log('Pressed Command/Control + Shift + option + F')
        setEnableAnimations((e) => !e)
      }
    }
    document.addEventListener('keydown', callback)
    return () => {
      document.removeEventListener('keydown', callback)
    }
  }, [])
  const value: ILayoutContext = useMemo(
    () => ({
      isNavbarVisible,
      navbarHeight,
      headerHeight,
      navbarThreshold,
      occupiedHeight,
      enableAnimations,
      setIsNavbarVisible,
      calculateScrollTargetPostion,
      scrollToSection,
      activeSection,
      baseRoute,
    }),
    [
      isNavbarVisible,
      navbarHeight,
      enableAnimations,
      headerHeight,
      navbarThreshold,
      occupiedHeight,
      setIsNavbarVisible,
      calculateScrollTargetPostion,
      scrollToSection,
      activeSection,
      baseRoute,
    ],
  )
  return (
    <LayoutContext.Provider value={value}>
      <Header ref={headerRef} />
      {hasNavbar && (
        <Navbar sections={layoutSections} ref={navbarRef} extra={navbarExtra} />
      )}
      <Fragment
        key={enableAnimations ? 'with-animations' : 'without-animations'}
      >
        <div ref={heroRef}>{children}</div>
        {layoutSections.map(({ title, Component, slug, ref }) => (
          <div
            key={slug}
            ref={ref}
            className={`
              mb-s32 border-t
              md:mb-s64
              lg:mb-s128
            `}
          >
            <SectionTitle enableAnimations={enableAnimations}>
              {title}
            </SectionTitle>
            <Component />
          </div>
        ))}
      </Fragment>
      <Footer />
    </LayoutContext.Provider>
  )
}
