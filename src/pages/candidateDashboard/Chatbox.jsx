import { useChatQustionMutation, useMesssageSetMutation } from "../../Redux/features/Auth/authApi";
import { useSelector } from "react-redux";
import { BsArrowRightShort } from "react-icons/bs";
import { useForm } from "react-hook-form";


// eslint-disable-next-line react/prop-types
const ChatBox = ({  jobId, candId, candName }) => {

  const { register, reset, handleSubmit } = useForm()
  const [postMessages, { data: postData }] = useMesssageSetMutation();
  const [qusSend, { data: qusData }] = useChatQustionMutation();
  const { user } = useSelector(state => state.auth);
  console.log(user);
  
  const empId = user?._id;
  
  const handleQustion = async (data) => {
    try {
      // Create a conditional object based on candId and empId
      const update = {
        candId: candId,
        candName,
        empName: user?.firstName + ' ' + user?.lastName, // Fix the name concatenation
        empId: empId,
        messages: [],
        jobId: jobId,
      };
  
      // Post the initial message
      const postResponse = await postMessages(update);
  
      if (postResponse.data) {
        const messId = postResponse.data.insertedId;
        
        // Update the message with additional data
        const updateMess = {
          messId: messId,
          ...data
        };
  
        const qusResponse = await qusSend(updateMess);
        console.log(qusResponse);
  
        console.log('postData:', postResponse);
        console.log('qusData:', qusResponse);
  
        // Check if both mutations were successful
        if (postResponse.data.acknowledged && qusResponse.data.acknowledged) {
          console.log('Both mutations were successful.');
        } else {
          console.log('One or both mutations failed.');
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    
          <form onSubmit={handleSubmit(handleQustion)}>
            <div className='flex gap-3 my-5'>
              <input
                placeholder='Ask a question...'
                type='text'
                className='w-full'
                {...register('question')}
              />
              <button
                className='shrink-0 h-14 w-14 bg-primary/10 border border-primary hover:bg-primary rounded-full transition-all  grid place-items-center text-primary hover:text-white'
                type='submit'
              >
                <BsArrowRightShort size={30} />
              </button>
            </div>
          </form>
      
  );
};

export default ChatBox;
