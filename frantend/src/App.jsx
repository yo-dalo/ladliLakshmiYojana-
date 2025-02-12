import { useState ,useEffect,useContext} from 'react'
//import { Provider } from './Context';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { AuthContext } from './Context';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { ToastContainer } from 'react-toastify';
import './App.css'
import Home from './Page/Home'
import Login from './Page/Login'
import Form from './Page/Form'
import Ragistration from './Page/Ragistration'
//import Admin_home from './Admin/Admin_home'
import Payment from './Page/Payment'
import Loading from './Part/Loading'
import ProtectedRoute from './Part/ProtectedRoute'
import Upload from './Page/Upload'
import Profile from './Page/Profile'
import About from './Page/About'
import PrivacyPolicy from './Page/PrivacyPolicy'
import Error404 from './Page/Error404'
import Comment from './Page/Comment'
import PaymentTest from './Page/PaymentTest'
import GetPayment from './Page/GetPayment'
import PlansPage from './Page/PlansPage'


function App() {
    const { x} = useContext(AuthContext);

  
  
  
  
  
  
  return (
    <>
    <ToastContainer />
    <Loading />
        <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<Error404 />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/PaymentTest" element={<PaymentTest />} />
          <Route path="/Payment/:plansId/" element={<Payment />} />
          <Route path="/Form" element={<ProtectedRoute><Form /></ProtectedRoute>} />
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/Profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/comment" element={<Comment />} />
          <Route path="/plans" element={<PlansPage />} />
          <Route path="/About" element={<About />} />
          <Route path="/Upload" element={<Upload />} />
          <Route path="/Get" element={<ProtectedRoute><GetPayment /></ProtectedRoute>} />
         <Route path="/Ragistration" element={<Ragistration />} /> 
         {/*<Route path="/Admin" element={<Admin_home />} /> */}
        </Routes>
    </Router>

    </>
  )
}

export default App
