import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'


import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import { Toaster } from 'sonner'
import { router } from './routes/index.tsx'
import { ThemeProvider } from './components/modules/provider/theme-provider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
        <RouterProvider router={router}/>
        <Toaster richColors />
      </ThemeProvider>
    </Provider>
  </StrictMode>,
)