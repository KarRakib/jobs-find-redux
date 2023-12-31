/* eslint-disable react/jsx-key */

import { Link } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useState } from "react";

import { useGetMessageByIdQuery } from "../../Redux/features/Auth/authApi";

const Sidebar = () => {

  const { user: { role, _id } } = useSelector(state => state.auth)
  console.log(_id);
  const { data: getMessageById } = useGetMessageByIdQuery(_id)
  console.log(getMessageById?.data   );
 
  return (
    <div className='bg-primary/10 col-span-2 h-screen sticky top-0'>
      <ul className='flex flex-col gap-2 w-full h-full  p-3'>
        <div className='flex justify-between items-center text-primary my-1'>
          <Link to='/' className='flex items-center'>
            <FaChevronLeft />
            <h1>Back</h1>
          </Link>
          <h1 className='text-xl'>Dashboard</h1>
        </div>
        {role === "candidate" && <>
          <li>
            <Link
              className='hover:bg-primary hover:text-white bg-primary/10 transition-all w-full block py-2 px-3 rounded-full'
              to='applied-jobs'
            >
              Applied Jobs
            </Link>
          </li
          >
        </>}
        {role === "employer" && <>
          <li> <Link
            className='hover:bg-primary hover:text-white bg-primary/10 transition-all w-full block py-2 px-3 rounded-full'
            to='add-job'
          >
            Add Job
          </Link> </li>
          <li> <Link
            className='hover:bg-primary hover:text-white bg-primary/10 transition-all w-full block py-2 px-3 rounded-full'
            to={"/dashboard/my-jobs"}
          >
            My Posted Job
          </Link> </li>
        </>}
        <li>
         
            <ul>
             {getMessageById?.data?.map(mess=> <Link to={`/dashboard/inbox/${mess._id}`}><li key={mess._id}>{mess.candName}</li></Link>)}
            </ul>
         
        </li>
      </ul>

    </div>
  );
};

export default Sidebar;
