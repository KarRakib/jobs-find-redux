// Modal.js

import { useState } from "react";
import { useGetUserByIdQuery } from "../Redux/features/Auth/authapi";
import ChatBox from "../pages/candidateDashboard/Chatbox";

// eslint-disable-next-line react/prop-types
const Modal = ({ isOpen, onClose, id, jobId }) => {
  const { data, isLoading, isError, error } = useGetUserByIdQuery(id)
  const [isOpenT, setIsOpenT] = useState(true);
  console.log(data?._id);
  const toggleChatBox = () => {
    setIsOpenT(!isOpenT);
  };
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  if (!data) {
    return <p>User not found.</p>;
  }
  if (!isOpen) return null;
  console.log(data);


  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-overlay absolute inset-0 bg-gray-500 opacity-75"></div>
      <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-content py-4 text-left px-6">
          <div className="flex justify-between items-center pb-3">
            <p className="text-2xl font-bold">Modal Title</p>
            <button
              onClick={onClose}
              className="modal-close-button cursor-pointer z-50"
            >
              X
            </button>
          </div>
          <form  >
            <div className='flex flex-col w-full max-w-xs'>
              <label className='mb-2' htmlFor='firstName'>
                Full Name
              </label>
              <input type='text' readOnly value={data?.firstName + data?.lastName} id='firstName' />
            </div>
            <div className='flex flex-col w-full max-w-xs'>
              <label className='mb-2' htmlFor='lastName'>
                Email
              </label>
              <input type='text' readOnly value={data?.email} id='lastName' />
            </div>
            <div className='flex flex-col w-full max-w-xs'>
              <label className='mb-3' htmlFor='country'>
                Country
              </label>
              <input type='text' readOnly value={data.country} id='address' />
            </div>
            <div className='flex flex-col w-full max-w-xs'>
              <label className='mb-2' htmlFor='address'>
                Street Address
              </label>
              <input type='text' readOnly value={data?.address} id='address' />
            </div>
          </form>
          <ChatBox jobId={jobId} candName={data?.firstName} candId={data?._id}  />
        </div>
      </div>
      
    </div>
  );
};

export default Modal;
