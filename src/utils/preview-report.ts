export const isPreviewReport =
  sessionStorage.getItem('previewReport') === 'true'

export const getPreviewReportId = () =>
  sessionStorage.getItem('previewReportId')

export const setIsPreviewReport = (reportId: string | null) => {
  if (reportId) sessionStorage.setItem('previewReportId', reportId)
  sessionStorage.setItem('previewReport', 'true')
}
