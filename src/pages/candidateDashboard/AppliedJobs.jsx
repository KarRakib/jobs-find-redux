  
import { useSelector } from "react-redux";
import JobCard from "../../components/reusable/JobCard";
import Loading from "../../components/reusable/Loading";
import { useAppliedJobQuery } from "../../Redux/features/Job/JobApi";


const AppliedJobs = () => {
  const {
    user: { email },
  } = useSelector((state) => state.auth);
  const {data, isLoading} = useAppliedJobQuery(email)
  console.log(data);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h1 className='text-xl py-5'>Applied jobs</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5 pb-5'>
        {data?.data?.map((job) => (
          // eslint-disable-next-line react/jsx-key
          <JobCard data={job} />
        ))}
      </div>
    </div>
  );
};

export default AppliedJobs;
