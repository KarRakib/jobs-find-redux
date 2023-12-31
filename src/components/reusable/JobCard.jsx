  import { Link } from "react-router-dom";
// eslint-disable-next-line react/prop-types
const JobCard = ({ data }) => {


 
  const { _id, position, companyName, location, employmentType,jobs } =
    data || {};

  return (
    <div
      key={_id}
      className='border border-gray-300 shadow-xl p-5 rounded-2xl text-primary'
    >
      <div className='flex justify-between  text-primary'>
        <div>
          <p className='text-xl'>{position}</p>
          <small className='text-primary/70 '>
            by{" "}
            <span className='font-semibold hover:text-primary cursor-pointer hover:underline transition-all'>
              {companyName}
            </span>
          </small>
        </div>
        <p>{location}</p>
      </div>
      <div className='flex justify-between items-center mt-5'>
        <p>{employmentType}</p>
        {!jobs && <p className="bg-black text-white px-1 rounded-md">Job Close</p>}
        {/* <button className='btn' onClick={() => navigate(`/job-details/${_id}`)}>
          Details
        </button> */}
        <Link to={`/job-details/${_id}`}>Details</Link>
      </div>
    </div>
  );
};

export default JobCard;
