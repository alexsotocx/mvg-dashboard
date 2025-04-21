import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { MVGDashboard } from './MVGDashboard.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Questionnary } from './Questionnary.tsx'
import { ThemeProvider } from './contexts/themes.tsx'
import { TestComponent } from './context-component.tsx'
import { CounterWithReducer } from './UseReducerExample.tsx'

const queryClient = new QueryClient({

});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path='/mvg' element={<MVGDashboard />} />
          <Route path='/survey/:id' element={<Questionnary />} />
          <Route path='/context' element={
            <ThemeProvider>
              <TestComponent />
            </ThemeProvider>

          } />
          <Route path='/reducer' element={<CounterWithReducer />} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)
