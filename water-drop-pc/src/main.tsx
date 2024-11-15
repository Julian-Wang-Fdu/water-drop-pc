
import './index.css'
import { ApolloProvider } from '@apollo/client'
import { client } from './utils/apollo.ts'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {ROUTE_COMPONENT } from './routes'
import UserInfo from './components/UserInfo'
import Layout from './components/Layout'
import Login from './contianers/Login'
import { routes } from './routes/menus.tsx'
import enUS from 'antd/lib/locale/en_US'
import { ConfigProvider } from 'antd';

createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <ConfigProvider locale={enUS}>
    <BrowserRouter>
    <UserInfo>
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/' element={<Layout/>}>
        {routes.map((item) => {
            const Component = ROUTE_COMPONENT[item.key];
            return (
                <Route
                  path={item.path}
                  key={item.path}
                  element={<Component />}
                />
              );
            })}
      </Route>
    </Routes>
    </UserInfo>
    </BrowserRouter>
    </ConfigProvider>
  </ApolloProvider>
)
