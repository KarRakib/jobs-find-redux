import { useParams } from "react-router-dom";
import { useGetUserByIdQuery } from "../../Redux/features/Auth/authApi";
import ChatBox from "./Chatbox";
import { useState } from "react";



const CanditateDetails = () => {
  const { id } = useParams()
  
  const { data, isLoading, isError, error } = useGetUserByIdQuery(id);
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatBox = () => {
    setIsOpen(!isOpen);
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
  console.log(data);
  console.log(id);
  return (
    <div>
      <h1 className='text-xl py-1'>User Details </h1>
      <div className='flex justify-center items-center overflow-auto p-10'>
        <div className='bg-secondary/20 shadow-lg p-10 rounded-2xl flex flex-wrap gap-3 max-w-3xl justify-between'>
          <h1 className='w-full text-2xl text-primary mb-5'>Candidate</h1>
          <div className='flex flex-col w-full max-w-xs'>
            <label className='mb-2' htmlFor='firstName'>
             Full Name
            </label>
            <input type='text' readOnly value={data?.firstName+ data?.lastName} id='firstName' />
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
        </div>
      </div>

      {/* Messgenger Section  */}
      <div className="flex items-center justify-end h-screen">
        <div className="w-12 h-12 rounded-full flex items-center justify-center">

          <svg onClick={() => toggleChatBox()} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
            <radialGradient id="8O3wK6b5ASW2Wn6hRCB5xa_YFbzdUk7Q3F8_gr1" cx="11.087" cy="7.022" r="47.612" gradientTransform="matrix(1 0 0 -1 0 50)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#1292ff"></stop><stop offset=".079" stopColor="#2982ff"></stop><stop offset=".23" stopColor="#4e69ff"></stop><stop offset=".351" stopColor="#6559ff"></stop><stop offset=".428" stopColor="#6d53ff"></stop><stop offset=".754" stopColor="#df47aa"></stop><stop offset=".946" stopColor="#ff6257"></stop></radialGradient><path fill="url(#8O3wK6b5ASW2Wn6hRCB5xa_YFbzdUk7Q3F8_gr1)" d="M44,23.5C44,34.27,35.05,43,24,43c-1.651,0-3.25-0.194-4.784-0.564	c-0.465-0.112-0.951-0.069-1.379,0.145L13.46,44.77C12.33,45.335,11,44.513,11,43.249v-4.025c0-0.575-0.257-1.111-0.681-1.499	C6.425,34.165,4,29.11,4,23.5C4,12.73,12.95,4,24,4S44,12.73,44,23.5z"></path><path d="M34.992,17.292c-0.428,0-0.843,0.142-1.2,0.411l-5.694,4.215	c-0.133,0.1-0.28,0.15-0.435,0.15c-0.15,0-0.291-0.047-0.41-0.136l-3.972-2.99c-0.808-0.601-1.76-0.918-2.757-0.918	c-1.576,0-3.025,0.791-3.876,2.116l-1.211,1.891l-4.12,6.695c-0.392,0.614-0.422,1.372-0.071,2.014	c0.358,0.654,1.034,1.06,1.764,1.06c0.428,0,0.843-0.142,1.2-0.411l5.694-4.215c0.133-0.1,0.28-0.15,0.435-0.15	c0.15,0,0.291,0.047,0.41,0.136l3.972,2.99c0.809,0.602,1.76,0.918,2.757,0.918c1.576,0,3.025-0.791,3.876-2.116l1.211-1.891	l4.12-6.695c0.392-0.614,0.422-1.372,0.071-2.014C36.398,17.698,35.722,17.292,34.992,17.292L34.992,17.292z" opacity=".05"></path><path d="M34.992,17.792c-0.319,0-0.63,0.107-0.899,0.31l-5.697,4.218	c-0.216,0.163-0.468,0.248-0.732,0.248c-0.259,0-0.504-0.082-0.71-0.236l-3.973-2.991c-0.719-0.535-1.568-0.817-2.457-0.817	c-1.405,0-2.696,0.705-3.455,1.887l-1.21,1.891l-4.115,6.688c-0.297,0.465-0.32,1.033-0.058,1.511c0.266,0.486,0.787,0.8,1.325,0.8	c0.319,0,0.63-0.107,0.899-0.31l5.697-4.218c0.216-0.163,0.468-0.248,0.732-0.248c0.259,0,0.504,0.082,0.71,0.236l3.973,2.991	c0.719,0.535,1.568,0.817,2.457,0.817c1.405,0,2.696-0.705,3.455-1.887l1.21-1.891l4.115-6.688c0.297-0.465,0.32-1.033,0.058-1.511	C36.051,18.106,35.531,17.792,34.992,17.792L34.992,17.792z" opacity=".07"></path><path fill="#fff" d="M34.394,18.501l-5.7,4.22c-0.61,0.46-1.44,0.46-2.04,0.01L22.68,19.74	c-1.68-1.25-4.06-0.82-5.19,0.94l-1.21,1.89l-4.11,6.68c-0.6,0.94,0.55,2.01,1.44,1.34l5.7-4.22c0.61-0.46,1.44-0.46,2.04-0.01	l3.974,2.991c1.68,1.25,4.06,0.82,5.19-0.94l1.21-1.89l4.11-6.68C36.434,18.901,35.284,17.831,34.394,18.501z"></path>
          </svg>
        </div>
        <ChatBox toggleChatBox={toggleChatBox}  candId={data?._id} isOpen={isOpen} />
      </div>

    </div>
  );
};

export default CanditateDetails;