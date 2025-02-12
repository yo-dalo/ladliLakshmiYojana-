import React, { useState, useContext ,useEffect} from 'react';
import { AuthContext } from '../Context';
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import { HiOutlineBars3 } from "react-icons/hi2";
const Nav3 = () => {
  const {x} = useContext(AuthContext);
  const [nav_open, setNav_open] = useState(0);
  
  const navigate = useNavigate();
  
  
  useEffect(()=>{

  },[])
  
  
  
  
  return (
  
     <div className="w-full max-ph:scale-0 max-ph:h-0 px-20 flex justify-between items-center bg_color_1 overflow-hidden h-10 my_font_1 ">
     <div className="flex gap-12"> 
     <Link to="/" className="text-black hover:bg-indigo-300 px-3 py-1 rounded-2xl font-bold" > Home </Link>
     <Link to="/plans" className="text-black hover:bg-indigo-300 px-3 py-1 rounded-2xl font-bold" > Plans </Link>
     <Link to="/About" className="text-black hover:bg-indigo-300 px-3 py-1 rounded-2xl   font-bold" > About </Link>
     <Link to="/PrivacyPolicy" className="text-black hover:bg-indigo-300 px-3 py-1 rounded-2xl cursor-pointer font-bold" > Privacy Policy </Link>
     </div>
    
     
     
     
       <div className="flex gap-7"> 
       {x.isLogin &&  <Link to="/profile" className="tx_color_1  py-1 px-2 rounded-2xl cg font-bold" > {x.name} </Link>}
       {!x.isLogin && 
       <>
     <Link to="/Login" className="tx_color_1  py-1 px-2 rounded-2xl cg font-bold" > Login </Link>
     <Link to="/Ragistration"  className="tx_color_1 py-1 px-2 cg rounded-2xl font-bold" > Ragistration </Link>
     </>
       }
     </div>
    
    
   
    </div>
  )
}

export default Nav3