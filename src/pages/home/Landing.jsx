import  { useLayoutEffect, useRef,} from "react";
import hero1 from "../../assets/hero-01.jpg";
import hero2 from "../../assets/hero-02.jpg";
import hero3 from "../../assets/hero-03.jpg";
import { BiSearchAlt } from "react-icons/bi";
import Badge from "../../components/reusable/Badge";
import { gsap } from "gsap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const [query, setQurey] = useState('')
  const navigate = useNavigate()
  const handleInputChange =(e)=>{
    setQurey(e.target.value)
  }
  const handleSubmit = () =>{
    const queryParams = `?query=${encodeURIComponent(query)}`;

    // Use navigate to go to the "/jobs" route with the query parameter
    navigate(`/jobs${queryParams}`);
  }
  const keywords = [
    "Web Developer",
    "Web Designer",
    "Writer",
    "Fullstack",
    "Senior",
    "Team Lead",
    "Administration",
    "SQA",
    "Tester",
  ];

  const el = useRef();
  const tl = useRef();
  const tl2 = useRef();

  useLayoutEffect(() => {
    let cards = gsap.utils.toArray(".statCard");

    let ctx = gsap.context(() => {
      tl.current = gsap
        .timeline({ repeat: -1 })
        .to("#hero1", { opacity: 1, duration: 2 })
        .to("#hero1", { opacity: 0, display: "none", duration: 2, delay: 1 })
        .to("#hero2", { opacity: 1, duration: 2 })
        .to("#hero2", { opacity: 0, display: "none", duration: 2, delay: 1 })
        .to("#hero3", { opacity: 1, duration: 2 })
        .to("#hero3", { opacity: 0, display: "none", duration: 2, delay: 1 });

      tl2.current = gsap
        .timeline()
        .from("#hero-title", { delay: 0.2, y: 50, opacity: 0, duration: 0.3 })
        .from("#hero-subtitle", { y: 50, opacity: 0, duration: 0.3 })
        .from("#search-container", { y: 50, opacity: 0, duration: 0.3 })
        .from("#search-button", {
          x: -100,
          opacity: 0,
          duration: 0.5,
          ease: "power2",
        })
        .from(".badge-container", { opacity: 0 })
        .from(".badge", { opacity: 0, y: 50, stagger: 0.1 });
    }, el);

    const movement = (e) => {
      cards.forEach((card, index) => {
        const depth = 90;
        const moveX = (e.pageX - window.innerWidth / 2) / depth;
        const moveY = (e.pageY - window.innerHeight / 2) / depth;
        index++;
        gsap.to(card, {
          x: moveX * index,
          y: moveY * index,
        });
      });
    };

    document.addEventListener("mousemove", movement);

    return () => {
      ctx.revert();

      document.removeEventListener("mousemove", movement);
    };
  }, []);

  return (
    <div ref={el} className='h-screen'>
    <div className='max-w-2xl h-[80vh] rounded-b-full absolute top-0 left-1/2 -translate-x-1/2 overflow-hidden z-0'>
      {/* ... Your images */}
    </div>
    <div className='h-full w-full flex items-center z-10 relative'>
      <div className='flex w-full flex-col md:flex-row'>
        <div className='w-full md:w-1/2 flex flex-col items-start'>
          <h1 id='hero-title' className='heroElement font-bold text-4xl md:text-7xl'>
            Find the perfect <br /> job for you
          </h1>
          <p id='hero-subtitle' className='mt-2 md:mt-5 text-base md:text-lg'>
            Search your career opportunity through 12,800 jobs
          </p>
          <div
            id='search-container'
            className='bg-white rounded-full p-3 flex w-full max-w-xl overflow-hidden mt-2 md:mt-5  shadow-lg'
          >
            <input
              className='flex-auto text-base md:text-lg p-2 border-none outline-none focus:ring-0'
              type='text'
              name='search'
              id='search'
              onChange={handleInputChange}
              placeholder='Job title or Keyword'
            />
            <button
              onClick={handleSubmit}
              id='search-button'
              className='p-2 rounded-full bg-primary h-10 w-10 md:h-14 md:w-14 grid place-items-center'
            >
              <BiSearchAlt size='23' color='white' />
            </button>
          </div>
          <div className='mt-8 md:mt-16'>
            <h2 className='badge-container text-base md:text-lg'>Popular Search</h2>
            <div className='mt-2 md:mt-3 max-w-xl flex flex-wrap gap-2 md:gap-3'>
              {keywords.map((item) => (
                <Badge key={item} className='badge text-base md:text-lg'>
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <div className='flex flex-col md:flex-row justify-between md:ml-5 mt-5 md:mt-0'>
          <div className='statCard rounded-3xl shadow-2xl p-3 md:p-7 bg-white'>
            <div>
              <span className='text-lg md:text-2xl font-bold'>319 </span>
              <span className='text-sm md:text-base'>Job offers</span>
            </div>
            <p className='font-light text-gray-500 text-xs md:text-sm'>
              In Business Development
            </p>
          </div>
          <div className='statCard rounded-3xl shadow-2xl p-3 md:p-7 bg-white mt-3 md:mt-0'>
            <div>
              <span className='text-lg md:text-2xl font-bold'>265 </span>
              <span className='text-sm md:text-base'>Job offers</span>
            </div>
            <p className='font-light text-gray-500 text-xs md:text-sm'>
              In Marketing & Communication
            </p>
          </div>
          <div className='statCard rounded-3xl shadow-2xl p-3 md:p-7 bg-white mt-3 md:mt-0'>
            <div>
              <span className='text-lg md:text-2xl font-bold'>324 </span>
              <span className='text-sm md:text-base'>Job offers</span>
            </div>
            <p className='font-light text-gray-500 text-xs md:text-sm'>
              In Project Management
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default Landing;
