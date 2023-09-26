  
import { useNavigate, useParams } from "react-router-dom";
import candidate from "../../assets/candidate.svg";
import employer from "../../assets/employer.svg";
import CandidateRegistration from "./CandidateRegistration";
import EmployerRegistration from "./EmployerRegistration";

const AccountCreator = () => {
  const navigate = useNavigate();
  const { type } = useParams();

  if (type === "candidate") {
    return <CandidateRegistration />;
  }

  if (type === "employer") {
    return <EmployerRegistration />;
  }

  return (
    <div className='h-screen pt-14'>
  <h1 className='text-center my-10 text-2xl'>Continue as ...</h1>
  <div className='flex flex-col md:flex-row justify-center items-center'>
    <div
      onClick={() => navigate("/register/candidate")}
      className='flex flex-col justify-between transition-all shadow-2xl rounded-lg p-5 border border-white hover:border-primary hover:shadow-2xl hover:scale-105 group m-4'
    >
      <img className='h-60 md:h-72' src={candidate} alt='' />
      <p className='text-center text-3xl'>Candidate</p>
    </div>
    <div
      onClick={() => navigate("/register/employer")}
      className='flex flex-col justify-between transition-all shadow-2xl rounded-lg p-5 border border-white hover:border-primary hover:shadow-2xl hover:scale-105 group m-4'
    >
      <img className='h-60 md:h-72' src={employer} alt='' />
      <p className='text-center text-3xl'>Employer</p>
    </div>
  </div>
</div>

  );
};

export default AccountCreator;
