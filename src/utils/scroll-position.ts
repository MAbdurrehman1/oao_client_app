export function getScrollPosition(element: HTMLElement | Window = window) {
  if (element instanceof Window) {
    return {
      scrollTop: window.scrollY || document.documentElement.scrollTop,
      scrollLeft: window.scrollX || document.documentElement.scrollLeft,
    }
  } else {
    return {
      scrollTop: element.scrollTop,
      scrollLeft: element.scrollLeft,
    }
  }
}
