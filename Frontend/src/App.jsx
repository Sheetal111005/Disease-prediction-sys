// import React, { Suspense } from 'react'
// import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
// export default function App () {
//   const Chat = React.lazy(() => import('./pages/Chat'))
//   return (
//     <Suspense fallback={<>Loading ...</>}>
//       <BrowserRouter>
//         <Routes>
//           <Route path='/' element={<Navigate to={'/chat'} />} />
//           <Route path='/chat' element={<Chat />}></Route>
//         </Routes>
//       </BrowserRouter>
//     </Suspense>
//   )
// }

import React from "react";
import SymptomForm from "./components/SymptomForm";
import TextPredictionForm from "./components/TextPredictionForm";
import ModelBasedForm from "./components/ModelBasedForm";
function App() {
  return (
    <div className="p-6 max-w-3xl mx-auto font-sans">
      <h1 className="text-2xl font-bold mb-4 text-center">🧬 Disease Prediction</h1>
      <SymptomForm />
      <hr className="my-6" />
      <TextPredictionForm />
      <hr className="my-6" />
      <ModelBasedForm />
    </div>
  );
}

export default App;


