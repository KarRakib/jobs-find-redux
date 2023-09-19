

import { useParams } from "react-router-dom";
import meeting from "../assets/meeting.jpg";
import { BsArrowRightShort, BsArrowReturnRight } from "react-icons/bs";
import { useGetJobByIdQuery, useJobApplyMutation, useQustionMutation, useReplyMutation } from "../Redux/features/Job/JobApi";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
const JobDetails = () => {
  const { user } = useSelector(state => state.auth)
  const [answar, setAnswar] = useState('')
  const { id } = useParams()
  const [sendQuestion, { data: questions }] = useQustionMutation()
  const [sendReply, { data: replys }] = useReplyMutation()
  const navigate = useNavigate();
  const { register, reset, handleSubmit } = useForm()
  const { data, isLoading } = useGetJobByIdQuery(id)
  console.log('check id', data?.data);
  const {
    companyName,
    position,
    location,
    experience,
    workLevel,
    employmentType,
    salaryRange,
    skills,
    requirements,
    responsibilities,
    overview,
    queries,
    _id,
    applicants,
    email: postEmail,
  } = data?.data || {};
 console.log(applicants);
 const matchingApplicants = applicants.filter(appli => appli.email === user?.email);


console.log(matchingApplicants);
  const [apply, { data: result }] = useJobApplyMutation()
 
  const handleApply = () => {
    if (user.role === 'employer') {
      toast.error('Apply only for Candidate')
      return
    }
    if (user.role === '') {
      navigate('/register')
      return
    }
    const data = {
      userId: user?._id,
      email: user?.email,
      jobId: _id,
      
    }
    if (user.role === 'candidate') {
      toast.success('your Apply ok')
      apply(data)
    }
 
  }
  const handleQustion = (data) => {
   
    const update = {
      userId: user?._id,
      qusId: Math.floor(Math.random() * 10001),
      ...data,
      email: user?.email,
      jobId: _id,
    };
    console.log(update);
    sendQuestion(update)
    reset()
  };
  const handleReply = (id,qusId) => {
    const data = {
      userId: id,
      jobId : _id,
      reply: answar,
     
    }
    console.log(data.jobId);
    sendReply(data)


  }
  console.log(user.email === postEmail);
  return (
    <div className='pt-14 grid grid-cols-12 gap-5'>
      <div className='col-span-9 mb-10'>
        <div className='h-80 rounded-xl overflow-hidden'>
          <img className='h-full w-full object-cover' src={meeting} alt='' />
        </div>
        <div className='space-y-5'>
          <div className='flex justify-between items-center mt-5'>
            <h1 className='text-xl font-semibold text-primary'>{position}</h1>
            {<button onClick={handleApply} className='btn'>Apply</button>}
          </div>
          <div>
            <h1 className='text-primary text-lg font-medium mb-3'>Overview</h1>
            <p>{overview}</p>
          </div>
          <div>
            <h1 className='text-primary text-lg font-medium mb-3'>Skills</h1>
            <ul>
              {skills?.map((skill) => (
                // eslint-disable-next-line react/jsx-key
                <li className='flex items-center'>
                  <BsArrowRightShort /> <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className='text-primary text-lg font-medium mb-3'>
              Requirements
            </h1>
            <ul>
              {requirements?.map((skill) => (
                // eslint-disable-next-line react/jsx-key
                <li className='flex items-center'>
                  <BsArrowRightShort /> <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className='text-primary text-lg font-medium mb-3'>
              Responsibilities
            </h1>
            <ul>
              {responsibilities?.map((skill) => (
                // eslint-disable-next-line react/jsx-key
                <li className='flex items-center'>
                  <BsArrowRightShort /> <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <hr className='my-5' />
        <div>
          <div>
            <h1 className='text-xl font-semibold text-primary mb-5'>
              General Q&A
            </h1>
            <div className='text-primary my-2'>
              {queries?.map(({ question, email, reply, id,qusId }) => (
                // eslint-disable-next-line react/jsx-key
                <div>
                  <small>{email}</small>
                  <p className='text-lg font-medium'>{question}</p>
                  {reply?.map((item, index) => (
                    // eslint-disable-next-line react/jsx-key
                    <p className={`flex items-center gap-2 relative left-5`}>
                      <BsArrowReturnRight /> {item}
                    </p>
                  ))}

                  {user.email === postEmail && <div className='flex gap-3 my-5'>
                    <input onBlur={(e) => setAnswar(e.target.value)} placeholder='Reply' type='text' className='w-full' />
                    <button onClick={() => handleReply(id,qusId)}
                      className='shrink-0 h-14 w-14 bg-primary/10 border border-primary hover:bg-primary rounded-full transition-all  grid place-items-center text-primary hover:text-white'
                      type='button'
                    >
                      <BsArrowRightShort size={30} />
                    </button>
                  </div>}
                </div>
              ))}
            </div>

            {user.role === "candidate" &&
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
            }
          </div>
        </div>
      </div>
      <div className='col-span-3'>
        <div className='rounded-xl bg-primary/10 p-5 text-primary space-y-5'>
          <div>
            <p>Experience</p>
            <h1 className='font-semibold text-lg'>{experience}</h1>
          </div>
          <div>
            <p>Work Level</p>
            <h1 className='font-semibold text-lg'>{workLevel}</h1>
          </div>
          <div>
            <p>Employment Type</p>
            <h1 className='font-semibold text-lg'>{employmentType}</h1>
          </div>
          <div>
            <p>Salary Range</p>
            <h1 className='font-semibold text-lg'>{salaryRange}</h1>
          </div>
          <div>
            <p>Location</p>
            <h1 className='font-semibold text-lg'>{location}</h1>
          </div>
        </div>
        <div className='mt-5 rounded-xl bg-primary/10 p-5 text-primary space-y-5'>
          <div>
            <h1 className='font-semibold text-lg'>{companyName}</h1>
          </div>
          <div>
            <p>Company Size</p>
            <h1 className='font-semibold text-lg'>Above 100</h1>
          </div>
          <div>
            <p>Founded</p>
            <h1 className='font-semibold text-lg'>2001</h1>
          </div>
          <div>
            <p>Email</p>
            <h1 className='font-semibold text-lg'>company.email@name.com</h1>
          </div>
          <div>
            <p>Company Location</p>
            <h1 className='font-semibold text-lg'>Los Angeles</h1>
          </div>
          <div>
            <p>Website</p>
            <a className='font-semibold text-lg' href='#'>
              https://website.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
