import React, { Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
export default function App () {
  const Chat = React.lazy(() => import('./pages/Chat'))
  return (
    <Suspense fallback={<>Loading ...</>}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to={'/chat'} />} />
          <Route path='/chat' element={<Chat />}></Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  )
}




