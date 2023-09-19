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
    <nav
      className={`fixed w-full z-[999] ${pathname === "/" ? null : "bg-white"
        }`}
    >
      <ul className=' max-w-sm md:max-w-7xl justify-between flex gap-3 h-full items-center'>
        <li className=' font-semibold text-2xl'>
          <Link to='/'>JobBox</Link>
        </li>
        <div className="flex gap-3">
          <li>
            <Link className='hover:text-primary' to='/jobs'>
              Jobs
            </Link>
          </li>

          {
            email ? (
              <>
                <button onClick={handleLogOut} className='border border-black px-2 py-1 rounded-full hover:border-primary hover:text-rose-400 hover:bg-primary hover:px-4 transition-all '> logOut</button>
              </>
            ) :
              <li>
                <Link
                  className='border border-black px-2 py-1 rounded-full hover:border-primary hover:text-rose-400 hover:bg-primary hover:px-4 transition-all '
                  to='/login'
                >
                  Login
                </Link>
              </li>
          }
          {email&&role && <Link to={'/dashboard'} className='border border-black px-2 py-1 rounded-full hover:border-primary hover:text-rose-400 hover:bg-primary hover:px-4 transition-all '> Deashboard</Link >}
          {email&& !role && <Link to={'/register'} className='border border-black px-2 py-1 rounded-full hover:border-primary hover:text-rose-400 hover:bg-primary hover:px-4 transition-all '> Get Started</Link >}
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
