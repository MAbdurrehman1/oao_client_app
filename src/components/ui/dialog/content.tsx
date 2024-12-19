import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
  type ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { useLocation } from 'react-router'
import { Close as DialogClose, Content, Portal } from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

import { buttonVariants } from '@/components/ui/button/variants'
import { cn } from '@/utils/styles'
import { generateTestId } from '@/utils/test'

import { DialogHeader } from './header'
import { DialogOverlay } from './overlay'

export const DIALOG_CONTENT_HEIGHT_CSS_VAR = '--dialog-content-height'

/**
 * Figma Design Docs:
 *  The modal header is sticky, with a minimised effect triggered on scroll,
 *  this causes the header to take up less vertical space.
 */

export const DialogContent = forwardRef<
  ElementRef<typeof Content> | null,
  ComponentPropsWithoutRef<typeof Content> & {
    header?: ReactNode
    headerClassName?: string
    contentClassName?: string
    scrollBehaviour?: 'smooth' | 'auto' | 'instant'
  }
>(
  (
    {
      className,
      children,
      header,
      headerClassName,
      contentClassName,
      scrollBehaviour,
      ...props
    },
    forwardedRef,
  ) => {
    const contentRef = useRef<HTMLDivElement | null>(null)
    useImperativeHandle(forwardedRef, () => contentRef.current!, [contentRef])
    const [initialLocation, setInitialLocation] = useState<string | null>(null)
    const [isHeaderCompactMode, setIsHeaderCompactMode] =
      useState<boolean>(false)

    const handleScrollCallback = useCallback(() => {
      const currentScrollPos = contentRef.current?.scrollTop ?? 0
      setIsHeaderCompactMode(currentScrollPos > 0)
    }, [])

    // a hack to set a css variable to be accessed in the children
    useEffect(() => {
      const id = setTimeout(() => {
        const dialogContentHeight = contentRef.current?.clientHeight
        if (dialogContentHeight)
          document.body.style.setProperty(
            DIALOG_CONTENT_HEIGHT_CSS_VAR,
            dialogContentHeight.toString() + 'px',
          )
      }, 100)
      return () => clearTimeout(id)
    }, [isHeaderCompactMode])

    // docs: https://react.dev/reference/react-dom/components/common#ref-callback
    const setContentRefCallback = useCallback(
      (node: HTMLDivElement) => {
        if (node && !contentRef.current) {
          contentRef.current = node
          if (forwardedRef) {
            if (typeof forwardedRef === 'function') forwardedRef(node)
            else forwardedRef.current = node
          }
          node.addEventListener('scroll', () => handleScrollCallback(), false)
        }
      },
      [forwardedRef, handleScrollCallback],
    )

    // since callback ref cleanup function is a canary feature:
    // https://react.dev/reference/react-dom/components/common#returns
    // this is a hack to remove listener when this component is unmounting.
    useEffect(() => {
      return () =>
        contentRef.current?.removeEventListener(
          'scroll',
          () => handleScrollCallback(),
          false,
        )
    }, [contentRef, handleScrollCallback])

    // scroll to top if location changed.
    const location = useLocation()
    useEffect(() => {
      if (!initialLocation) {
        setInitialLocation(location.pathname)
      } else if (location.pathname !== initialLocation) {
        setInitialLocation(location.pathname)
        // scroll to 1 to keep header in compact mode if it already is,
        // to prevent unwanted layout shift
        contentRef.current?.scrollTo({
          top: isHeaderCompactMode ? 1 : 0,
          behavior: scrollBehaviour ?? 'instant',
        })
      }
    }, [
      contentRef,
      initialLocation,
      isHeaderCompactMode,
      location,
      scrollBehaviour,
    ])

    return (
      <Portal>
        <DialogOverlay />
        <Content
          className={cn(
            `
              fixed left-1/2 top-1/2 z-50 flex size-[95%] max-w-[72.5rem]
              -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden
              rounded-md bg-background shadow-main duration-200
              data-[state=open]:animate-in
              data-[state=closed]:animate-out data-[state=closed]:fade-out-0
              data-[state=open]:fade-in-0
              data-[state=closed]:zoom-out-95
              data-[state=open]:zoom-in-95
              data-[state=closed]:slide-out-to-left-1/2
              data-[state=closed]:slide-out-to-top-[48%]
              data-[state=open]:slide-in-from-left-1/2
              data-[state=open]:slide-in-from-top-[48%]
            `,
            className,
          )}
          {...props}
        >
          {header && (
            <div
              className={cn(
                `
                  shrink-0 grow-0 px-s24
                  lg:px-s64
                `,
                headerClassName,
              )}
            >
              <DialogHeader
                className={cn(
                  `
                    sticky top-0 flex w-full shrink-0 grow-0 flex-row
                    items-center justify-between bg-background
                  `,
                  isHeaderCompactMode
                    ? 'py-4'
                    : `
                      py-s24
                      md:py-s64
                    `,
                )}
              >
                {header}
                <DialogClose
                  className={buttonVariants({
                    size: 'icon',
                    className: 'grow-0 shrink-0',
                  })}
                  {...generateTestId('dialog-close')}
                >
                  <X className="size-4" />
                  <span className="sr-only">Close</span>
                </DialogClose>
              </DialogHeader>
            </div>
          )}
          <div
            ref={setContentRefCallback}
            className={cn(
              `
                h-full overflow-y-auto p-s24 transition-all
                lg:p-s64
              `,
              contentClassName,
            )}
          >
            {children}
          </div>
        </Content>
      </Portal>
    )
  },
)
DialogContent.displayName = Content.displayName
