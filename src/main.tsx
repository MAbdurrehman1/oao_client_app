// Sentry initialization should be imported first!
// eslint-disable-next-line simple-import-sort/imports
import './sentry'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { router } from './router.tsx'

import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import './global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
