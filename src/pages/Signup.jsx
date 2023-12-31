import { useEffect, useState } from "react";
import loginImage from "../assets/login.svg";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createUser } from "../Redux/features/Auth/authSlice";
import toast from "react-hot-toast";
const Signup = () => {
  const { handleSubmit, register, reset, control } = useForm();
  const password = useWatch({ control, name: "password" });
  const confirmPassword = useWatch({ control, name: "confirmPassword" });
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(true);
  const dispatch = useDispatch()

  useEffect(() => {
    if (
      password !== undefined &&
      password !== "" &&
      confirmPassword !== undefined &&
      confirmPassword !== "" &&
      password === confirmPassword
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [password, confirmPassword]);

  const onSubmit = ({email, password}) => {
        dispatch(createUser({email,password}))
        reset()
        navigate('/')
        toast.success('welcome')
  };

  return (
    <div className='flex flex-col md:flex-row h-screen items-center pt-14'>
    <div className='w-full md:w-1/2'>
      <img src={loginImage} className='h-full w-full' alt='' />
    </div>
    <div className='w-full md:w-1/2 flex justify-center'>
      <div className='bg-[#FFFAF4] rounded-lg p-10 w-full md:w-3/4 lg:w-1/2'>
        <h1 className='mb-10 font-medium text-2xl text-center'>Sign up</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
          <div className='flex flex-col items-start'>
            <label htmlFor='email' className='ml-5'>
              Email
            </label>
            <input
              type='email'
              name='email'
              id='email'
              {...register("email")}
              className='w-full'
            />
          </div>
  
          <div className='flex flex-col items-start'>
            <label htmlFor='password' className='ml-5'>
              Password
            </label>
            <input
              type='password'
              name='password'
              id='password'
              {...register("password")}
              className='w-full'
            />
          </div>
          <div className='flex flex-col items-start'>
            <label htmlFor='confirm-password' className='ml-5'>
              Confirm Password
            </label>
            <input
              type='password'
              id='confirm-password'
              {...register("confirmPassword")}
              className='w-full'
            />
          </div>
          <div className='!mt-8'>
            <button
              type='submit'
              className='font-bold text-white py-3 rounded-full bg-primary w-full disabled:bg-gray-300 disabled:cursor-not-allowed'
              disabled={disabled}
            >
              Sign up
            </button>
          </div>
          <div className='text-center'>
            <p>
              Already have an account?{" "}
              <span
                className='text-primary hover:underline cursor-pointer'
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
  
  );
};

export default Signup;
