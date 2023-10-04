  

import { useLocation } from "react-router-dom";
import { useGetJobsQuery } from "../Redux/features/Job/JobApi";
import JobCard from "../components/reusable/JobCard";

const Jobs = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query');
  console.log(query);
  const {data:jobs} = useGetJobsQuery()

  const filteredItems = jobs?.filter(
    (product) => product.position.toLowerCase().indexOf(query?.toLowerCase()) !== -1
  );
  console.log(filteredItems);

  console.log('check',jobs);
  return (
    <div className='pt-14'>
      <div className='bg-primary/10 p-5 rounded-2xl'>
      { filteredItems? <h1 className='font-semibold text-xl'>Find Jobs</h1> : <h1> No Found </h1> }
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-5'>
        { query?
          filteredItems?.map(data=><JobCard data={data} key={data._id} />):
          jobs?.map(data=><JobCard data={data} key={data._id} />)
        }
      </div>
    </div>
  );
};

export default Jobs;
