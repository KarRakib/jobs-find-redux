import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";


import { Link, useLocation } from "react-router-dom";
import { auth } from "../../Firebase/firebase.config";
import { logout } from "../../Redux/features/Auth/authSlice";

const Navbar = () => {
  const { user:{email ,role}} = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const handleLogOut = () => {
    signOut(auth).then(() => {
      dispatch(logout())
    })
  }
  const { pathname } = useLocation();

  return (
    <nav className={`fixed w-full z-[999] ${pathname === "/" ? null : "bg-white"}`}>
    <div className='max-w-screen-lg mx-auto px-1'>
      <ul className='flex justify-between items-center h-full'>
        <li className='font-semibold text-xl md:text-2xl'>
          <Link to='/'>JobBox</Link>
        </li>
        
        <div className='flex gap-2 items-center mr-7'>
          <li>
            <Link className='hover:text-primary' to='/jobs'>
              Jobs
            </Link>
          </li>
  
          {email ? (
            <>
              <button
                onClick={handleLogOut}
                className='border border-black px-2 py-1 rounded-full hover:border-primary hover:text-rose-400 hover:bg-primary hover:px-4 transition-all'
              >
                Log Out
              </button>
            </>
          ) : (
            <li>
              <Link
                className='border border-black px-1 py-1 rounded-full hover:border-primary hover:text-rose-400 hover:bg-primary hover:px-4 transition-all'
                to='/login'
              >
                Login
              </Link>
            </li>
          )}
          {email && role && (
            <Link
              to={'/dashboard'}
              className='border border-black px-1 py-1 rounded-full hover:border-primary hover:text-rose-400 hover:bg-primary hover:px-4 transition-all'
            >
              Dashboard
            </Link>
          )}
          {email && !role && (
            <Link
              to={'/register'}
              className='border border-black px-1 py-1 rounded-full hover:border-primary hover:text-rose-400 hover:bg-primary hover:px-4 transition-all'
            >
              Get Started
            </Link>
          )}
        </div>
      </ul>
    </div>
  </nav>
  
  );
};

export default Navbar;
