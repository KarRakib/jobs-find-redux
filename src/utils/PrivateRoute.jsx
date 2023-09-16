  
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../components/reusable/Loading";
import { useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
    const {user:{email},isLoading} = useSelector(state=> state.auth)
  const { pathname } = useLocation();
 

  if (isLoading) {
    return <Loading />;
   
  }

  if (!isLoading && !email) {
    return <Navigate to='/login' state={{ path: pathname }} />;
  }

  return children;
};

export default PrivateRoute;
