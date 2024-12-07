import { forwardRef, type ReactNode } from 'react'
import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDebounceCallback } from 'usehooks-ts'

import { useLayoutContext } from '@/hooks/use-layout-context'
import { getScrollPosition } from '@/utils/scroll-position'
import { cn } from '@/utils/styles'

import { MobileNavbar } from './mobile-navbar'
import { type Section } from './types'

interface NavbarProps {
  sections: Section[]
  extra?: ReactNode
}

export const Navbar = forwardRef<HTMLDivElement, NavbarProps>(
  ({ sections, extra }, ref) => {
    if (!ref) throw new Error('[index-page]: Navbar ref MUST be set')
    const {
      isNavbarVisible,
      setIsNavbarVisible,
      navbarThreshold,
      headerHeight,
      scrollToSection,
    } = useLayoutContext()

    const [prevScrollPos, setPrevScrollPos] = useState(0)

    // detect scroll position on intial render
    // if the scroll is not at 0, hide the sticky navbar
    useEffect(() => {
      const currentScrollPos = getScrollPosition().scrollTop
      setIsNavbarVisible(currentScrollPos === 0)
      setPrevScrollPos(currentScrollPos)
    }, [setIsNavbarVisible])

    const handleScrollCallback = useCallback(() => {
      /* Design documentation:
       * Scroll aware navigation
       * This hides when a user scrolls down.
       * It animates into view when a user scrolls upward by a set amount of % of viewport.
       * Nav items act as page links to relevant section further down the page */
      const currentScrollPos = Math.max(0, getScrollPosition().scrollTop)
      const lastScrollPos = Math.max(0, prevScrollPos)
      if (lastScrollPos < currentScrollPos) {
        // scrolling down
        setIsNavbarVisible(false)
        setPrevScrollPos(currentScrollPos)
      } else if (
        currentScrollPos + navbarThreshold <= lastScrollPos ||
        currentScrollPos < navbarThreshold
      ) {
        // scrolling up or when scroll doesn't have enough room to make threshold logic work
        setIsNavbarVisible(true)
        setPrevScrollPos(currentScrollPos)
      } else if (isNavbarVisible) {
        // update scroll position when window.scroll is called throughout the app
        setPrevScrollPos(currentScrollPos)
      }
    }, [prevScrollPos, navbarThreshold, isNavbarVisible, setIsNavbarVisible])

    const handleScroll = useDebounceCallback(handleScrollCallback, 10)
    useEffect(() => {
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }, [handleScroll])

    const handleNavbarLinkClick = useCallback(
      (slug: Section['slug']) => {
        scrollToSection(slug)
      },
      [scrollToSection],
    )
    if (!sections.length) return null

    return (
      <nav
        ref={ref}
        className={cn(
          `
            fixed inset-x-0 -top-14 z-10 border-b bg-background transition-[top]
            md:top-0 md:mt-0
          `,
        )}
        style={{
          top: isNavbarVisible ? headerHeight : undefined,
        }}
      >
        <div
          className={`
            container flex flex-col items-center justify-between space-y-s16
            px-s24 py-[1.125rem]
            md:flex-row md:space-y-0
          `}
        >
          <MobileNavbar
            sections={sections}
            onClick={(slug) => handleNavbarLinkClick(slug)}
          />
          <div
            className={`
              hidden
              md:flex md:flex-row md:space-x-s16
              lg:space-x-s24
            `}
          >
            {sections.map(({ slug, title }) => (
              <Link
                key={slug}
                to={`#${slug}`}
                className="py-1.5"
                onClick={() => handleNavbarLinkClick(slug)}
              >
                {title}
              </Link>
            ))}
          </div>
          {extra && extra}
        </div>
      </nav>
    )
  },
)

Navbar.displayName = 'Navbar'
