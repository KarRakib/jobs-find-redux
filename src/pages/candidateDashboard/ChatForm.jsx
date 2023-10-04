import  { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useChatAnswerMutation, useChatQustionMutation, useGetSigleMessageByIdQuery,   useMesssageSetMutation } from '../../Redux/features/Auth/authApi';
import { useSelector } from 'react-redux';

function ChatForm() {
  const {id} = useParams()
  console.log(id);
  const {user} = useSelector(state => state.auth)
  const {data} = useGetSigleMessageByIdQuery(id,{pollingInterval:500})
  const [saveMessage] = useMesssageSetMutation()
  const [updateMessage, {data:update}] = useChatQustionMutation()
  const [updateAnwaser,{data: answar}] = useChatAnswerMutation()
  const [message, setMessage] = useState('');
  console.log(data?.data);
  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() === '') return;
   if(user?.role === "employer"){
    const data ={
      question : message,
      messId:id
      
    }
    console.log(data);
    updateMessage(data)
   }else{
   const data ={
      ans : message,
      id
      
    }
    console.log(data);
    updateAnwaser(data)
   }
    setMessage('');
  };
console.log(update);
console.log(answar);
  return (
    
    <div className="container mx-auto shadow-lg rounded-lg">         
        <div className="flex flex-row justify-between bg-white">
                  <div className="w-full px-5 flex flex-col justify-between">
            <div className="flex flex-col mt-5">
            
           
              <div className="flex justify-end mb-4">
                <div className='block py-2'>
                 {
                  data?.data?.messages.map(mess=>(
                    // eslint-disable-next-line react/jsx-key
                    <div
                    className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                  >
                   {mess?.reply}
                  </div>
                  ))
                 }                 
                </div>
                <img
                  src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                  className="object-cover h-8 w-8 rounded-full"
                  alt=""
                />
              </div>
              <div className="flex justify-start mb-4">
                <img
                  src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                  className="object-cover h-8 w-8 rounded-full"
                  alt=""
                />
               <div className='block py-2'>
               {
                  data?.data?.messages.map(mass=> (
                    // eslint-disable-next-line react/jsx-key
                    <div
                  className="ml-2 py-1 px-2 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
                >
                  {mass.question}
                </div>
                  ))
                }

               </div>
              </div>
            </div>
            <form  className="py-1 flex">
              <input
                className="w-full bg-gray-300 py-2 px-3 rounded-xl"
                type="text"
                placeholder="type your message here..."
                onChange={handleInputChange}
              />
               <button type="button"  onClick={handleSubmit} className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none">
               <span className="font-bold">Send</span>
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 ml-2 transform rotate-90">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
               </svg>
            </button>
            </form>
          </div>
          
          
          </div>
        </div>

 
  );
}

export default ChatForm;
