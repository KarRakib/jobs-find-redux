  

import { useGetJobsQuery } from "../Redux/features/Job/JobApi";
import JobCard from "../components/reusable/JobCard";

const Jobs = () => {
  const {data:jobs} = useGetJobsQuery()
  return (
    <div className='pt-14'>
      <div className='bg-primary/10 p-5 rounded-2xl'>
        <h1 className='font-semibold text-xl'>Find Jobs</h1>
      </div>
      <div className='grid grid-cols-2 gap-5 mt-5'>
        {
          jobs?.map(data=><JobCard data={data} key={data._id} />)
        }
      </div>
    </div>
  );
};

export default Jobs;
