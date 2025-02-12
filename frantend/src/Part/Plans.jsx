import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/pagination';

import { Autoplay, Pagination, Navigation, Scrollbar, Virtual } from 'swiper/modules';
import axios from 'axios';

const Plans = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    // Fetch Plans from API
    const fetchPlans = async () => {
        try {
            const response = await axios.get(import.meta.env.VITE_API_URL+'/api/show/plans');
            console.log('API Response:', response.data); // Log response for debugging
            setData(response.data.results || []); // Use fallback if results are missing
        } catch (error) {
            console.error('API Error:', error.response?.data || error.message);
        }
    };

    // Lifecycle: Fetch Data + Resize Handler
    useEffect(() => {
        fetchPlans();
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div id="plans">
            <div className="sm:flex sm:flex-col sm:align-center p-10">
                {/* Billing Toggle Buttons */}
                <div className="relative self-center bg-slate-200 rounded-lg p-0.5 flex">
                    <button className="relative w-1/2 rounded-md py-2 text-sm font-medium whitespace-nowrap focus:outline-none sm:w-auto sm:px-8 bg-slate-50 border-slate-50 text-slate-900 shadow-sm">
                        Monthly billing
                    </button>
                    <button className="ml-0.5 relative w-1/2 border rounded-md py-2 text-sm font-medium whitespace-nowrap focus:outline-none sm:w-auto sm:px-8 border-transparent text-slate-900">
                        Yearly billing
                    </button>
                </div>

                {/* Plans Slider */}
                <div className="mt-12 flex max-ph:grid space-y-3 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6 md:max-w-5xl overflow-scroll md:mx-auto xl:grid-cols-3">
                    <Swiper
                        spaceBetween={30}
                        slidesPerView={isMobile ? 1 : 2}
                        centeredSlides={true}
                        virtual
                        pagination={{ clickable: true }}
                        navigation={true}
                        modules={[Virtual, Navigation, Pagination]}
                        className="mySwiper w-full h-full overflow-hidden"
                    >
                        {data.length > 0 ? (
                            data.map((plan) => (
                                <SwiperSlide key={plan.PlanId} className="border border-slate-200 rounded-lg shadow-sm divide-y divide-slate-200">
                                    <div className="p-6">
                                        <h2 className="text-xl leading-6 font-bold text-slate-900">{plan?.PlanName}</h2>
                                        <p className="mt-2 text-base text-slate-700 leading-tight">{plan?.PlanInformation}</p>
                                        <p className="mt-8">
                                            <span className="text-4xl font-bold text-slate-900 tracking-tighter">₹{plan?.PlanReturnPrice}</span>
                                            <span className="text-base font-medium text-slate-500">/mo</span>
                                        </p>
                                        <Link to={`/payment/${plan?.PlanId}`} className="mt-8 block w-full bg-slate-900 rounded-md py-2 text-sm font-semibold text-white text-center">
                                            Join as a Starter
                                        </Link>
                                    </div>
                                </SwiperSlide>
                            ))
                        ) : (
                            <div className="text-center text-gray-600 p-6">No plans available</div>
                        )}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default Plans;