import './App.css'


import { RouterProvider } from 'react-router-dom'
import Router from './Router/Router'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './Firebase/firebase.config'
import { useDispatch } from 'react-redux'
import { getUser, setUser, toggle } from './Redux/features/Auth/authSlice'
import  { Toaster } from 'react-hot-toast';
function App() {
  console.log(import.meta.env.VITE_SOME_KEY) 
  console.log(import.meta.env.VITE_SERVER_URL) 
  const dispatch = useDispatch()
useEffect(()=>{
  onAuthStateChanged(auth,(user)=>{
    if(user){
      console.log(user);
      dispatch(getUser(user?.email))
    }else{
      dispatch(toggle())
    }
  })
},[dispatch])
  return (
    <>
    <Toaster
  position="top-right"
  reverseOrder={false}
/>
      <RouterProvider router={Router}>
     
      </RouterProvider>
    </>
  )
}

export default App
