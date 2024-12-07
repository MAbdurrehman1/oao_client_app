type BoxSizesKey = keyof Pick<
  ResizeObserverEntry,
  'borderBoxSize' | 'contentBoxSize' | 'devicePixelContentBoxSize'
>
export function extractSize(
  entry: ResizeObserverEntry,
  box: BoxSizesKey,
  sizeType: keyof ResizeObserverSize,
): number | undefined {
  if (!entry[box]) {
    if (box === 'contentBoxSize') {
      return entry.contentRect[sizeType === 'inlineSize' ? 'width' : 'height']
    }
    return undefined
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return Array.isArray(entry[box])
    ? // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      entry[box][0][sizeType]
    : // @ts-expect-error Support Firefox's non-standard behavior
      (entry[box][sizeType] as number)
}
