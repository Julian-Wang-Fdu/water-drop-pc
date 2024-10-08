
import './index.css'
import { ApolloProvider } from '@apollo/client'
import { client } from './utils/apollo.ts'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ROUTE_CONFIG } from './routes/index.ts'



createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <BrowserRouter>
    <Routes>
      {ROUTE_CONFIG.map((item)=>(
        <Route path={item.path} 
        key={item.key} 
        element={<item.element/>}/>
        ))}
    </Routes>
    </BrowserRouter>
  </ApolloProvider>
)
