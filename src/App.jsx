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


// applicants: []
// companyName: "Rakib Form"
// email: "employer1@gamil.com"
// employmentType: "Part Time"
// experience: "2years"
// location: "london"
// overview: "I need SEO expert to you "
// position: "SEO Expert"
// queries: Array(1)
// 0: {id: '6507ad11f09e228da0bf9585', email: 'candidate@gmail.com', question: 'fffdfasfasd', qusId: 0.06601321378533576, reply: Array(0)}


// _id: "6507b9934b9dcff3abea4523"