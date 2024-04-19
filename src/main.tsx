import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Home } from './pages/Home/Home.tsx'
import { RouterProvider } from 'react-router-dom'
import router from './routes.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryCliente = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* esse querycliente é para usar a biblioteca para states e stateless */}
    <QueryClientProvider client={queryCliente}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
)
