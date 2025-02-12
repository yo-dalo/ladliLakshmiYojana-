import React, { useState,useRef, useContext ,useEffect} from 'react';
import { AuthContext } from '../Context';
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import axios from "axios";

import RightSwiper from "./RightSwiper"

import { SlControlPlay } from "react-icons/sl";
import { IoIosHeartEmpty } from "react-icons/io";
import { TfiComment } from "react-icons/tfi";
import { GoHeart } from "react-icons/go";
//#272B37
import { Autoplay, Pagination, Navigation ,Scrollbar} from 'swiper/modules';
const Home_scoller = () => {
  const {x} = useContext(AuthContext);

const [scrollertext, setScrollertext] = useState([
  
  "बेटी की शादी में चिंता को अलविदा कहें",
  "बेटी की खुशियां, हमारी प्राथमिकता।",
  "लाड़ली लक्ष्मी योजना – बेटी की शादी के हर खर्चे का समाधान।",
  ]);
  const [text, setText] = useState("Secure Future for Daughter’s Marriage");
  const [data, setData] = useState([]);





const fetchPoster = async () => {
        try {
            const response = await axios.get(import.meta.env.VITE_API_URL+'/api/show/posters');
            console.log('API Response:', response.data); // Log response for debugging
            setData(response.data || []); // Use fallback if results are missing
          
        } catch (error) {
            console.error('API Error:', error.response?.data || error.message);
        }
    };


useEffect(() => {
        fetchPoster();
        
    }, []);





  return (
    <div className="  lp:bg-amber-600    max-ph:min-h-screen max-ph:h-[110vh]  max-ph:flex-col    w-full my-font flex justify-self-center items-center h-1/3t h-[40vh]     bg-fuchsia-50">
    <div className=" max-ph:min-h-[50vh] relative   bg-cyan-400 w-full overflow-hidden flex-1 h-full ">
    
    
        <div className="absolute text-amber-400 z-40 max-ph:top-20 top-10 left-6"> 
        <h1 className=" max-ph:text-4xl w-[60%]  text-4xl max-ph:w-[80%] text-white font-bold mb-8"> {text}</h1>
        <div className="inline py-4 text-xs rounded-full font-bold  bg_color_1 text-white  px-10"> 
        <Link to={x.isLogin?"/plans":"/Login"}> JOIN NOW </Link>
        </div>
        
        </div>
    <Swiper 
    
    
    onSlideChange={(e) => (setText(data[e.activeIndex]?.Text))}
    
    
    spaceBetween={30}
        direction={'vertical'}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
    
    
    
        
        className="mySwiper flex w-full h-full bg-amber-300"
      >
      
    {data?.map((i,k)=>(
        <SwiperSlide  key={k} className="w-full flex justify-center items-center relative h-full bg-amber-300">
        <img className="w-full h-full object-cover" src={`${import.meta.env.VITE_API_URL+'/images/'+i?.Img}`} />
        </SwiperSlide>
    ))}
       
      </Swiper>
    
    </div>
    
    
    
    
    
    
    
    
    <div className=" max-ph:w-full max-ph:min-h-fit  h-full cg gap-4 flex flex-col w-[40%]">
   
     <RightSwiper />


    </div>
    
    
    
    
    </div>
  )
}

export default Home_scoller