import './App.css'


import { RouterProvider } from 'react-router-dom'
import Router from './Router/Router'

function App() {
console.log(import.meta.env.rakib);
  return (
    <>
      <RouterProvider router={Router}>
     
      </RouterProvider>
    </>
  )
}

export default App
