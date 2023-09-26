
import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";
import loginImage from "../assets/login.svg";
import { useDispatch, useSelector } from "react-redux";
import { logInUser,logInGoogle } from "../Redux/features/Auth/authSlice";
import { useEffect } from "react";
import toast from 'react-hot-toast';
const Login = () => {
  const {isLoading, email,isError,error} = useSelector(state=> state.auth.user)
  const user = useSelector(state=> state.auth.user)
  console.log(user);
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch()
const handleGoogle =()=>{
  dispatch(logInGoogle())
}
  const onSubmit = ({email, password}) => {
    dispatch(logInUser({email,password}))
  };
useEffect(()=>{
  if(!isLoading&&email){
    navigate('/')
  }
},[isLoading,email])
console.log(email);
useEffect(()=>{
  if(isError){
    toast.error(error)
  }
},[isError,error])
  return (
    <div className='flex flex-col md:flex-row h-screen items-center'>
  <div className='w-full md:w-1/2'>
    <img src={loginImage} className='h-full w-full' alt='' />
  </div>
  <div className='w-full md:w-1/2 flex justify-center'>
    <div className='bg-[#FFFAF4] rounded-lg p-10 w-full md:w-3/4 lg:w-2/4'>
      <h1 className='mb-10 font-medium text-2xl text-center'>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
        <div className='flex flex-col items-start'>
          <label htmlFor='email' className='ml-5'>
            Email
          </label>
          <input type='email' {...register("email")} id='email' className='w-full' />
        </div>
        <div className='flex flex-col items-start'>
          <label htmlFor='password' className='ml-5'>
            Password
          </label>
          <input type='password' id='password' {...register("password")} className='w-full' />
        </div>
        <div className='relative !mt-8'>
          <button
            type='submit'
            className='font-bold text-white py-3 rounded-full bg-primary w-full'
          >
            Login
          </button>
        </div>
        <div>
          <p>
            Don't have an account?{" "}
            <span
              className='text-primary hover:underline cursor-pointer'
              onClick={() => navigate("/signup")}
            >
              Sign up
            </span>
          </p>
        </div>
      </form>
      <button onClick={handleGoogle} type='submit' className='font-bold text-white py-3 rounded-full bg-primary w-full mt-4'>
        Login with Google
      </button>
    </div>
  </div>
</div>

  );
};

export default Login;
