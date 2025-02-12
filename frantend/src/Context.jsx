import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

// Create the context
export const AuthContext = createContext();

// Provide the context
export const AuthProvider = ({ children }) => {

  const [loading, setLoading] = useState(false);
  const [delectcommeny, setDelectcommeny] = useState(0);
  
  

  
  
  const [x, setX] = useState({
userId: null,
name: "",
phone: "",
detailsId: null,
isLogin:false

  });

  
  
  
  
  
  

  useEffect(() => {
    
    
    chacker()
    //alert(auth_cookia)
    //chackAuthCookia();
   // const cookies = Cookies.get(); // Get all cookies
    //setAuth_cookia(cookies?.authToken || null); // Set authToken if exists
  }, []);
  
  
  
  
  
  
  
  
  



const chacker = () => {
    axios.get(import.meta.env.VITE_API_URL + '/api/verify/user/cookia', { withCredentials: true })
        .then((response) => {
setX(x => ({ ...x, userId: response.data.userId }));
setX(x => ({ ...x, name: response.data.name }));
setX(x => ({ ...x, phone: response.data.phone }));
setX(x => ({ ...x, isLogin: true}));
          

          
          
      
        })
        .catch((error) => {

setX(x => ({ ...x, userId: null }));
setX(x => ({ ...x, name: ""}));
setX(x => ({ ...x, phone: "" }));
setX(x => ({ ...x, isLogin: false}));
          //  setUser(null);                  // Set user to null in case of error
            console.error("Error fetching user data:", error); // Log the error
            //return false;                   // Return false to indicate failure
        });
};












  return (
    <AuthContext.Provider value={{
  
      loading,setLoading,
      delectcommeny,setDelectcommeny,x,setX
      
    }}>
      {children}
    </AuthContext.Provider>
  );
};