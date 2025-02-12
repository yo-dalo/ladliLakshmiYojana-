import React, { useState, useContext, useEffect } from "react";
import Nav from "../Part/Nav";
import Footer from "../Part/Footer";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context";

const Profile = () => {
  const [data, setData] = useState({});
  const [havePlans, setHavePlans] = useState(null);
  const { setLoading } = useContext(AuthContext);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getuserprofile = () => {
      setLoading(true);
      axios
        .get(import.meta.env.VITE_API_URL + "/api/show/user/profile", { withCredentials: true })
        .then((response) => {
          setData(response?.data?.message[0]);
          setLoading(false);
        })
        .catch((error) => {
          console.error("getuserprofile", error);
          setError("Failed to fetch profile data.");
          setLoading(false);
        });
    };

    const userHavePlans = () => {
      setLoading(true);
      axios
        .get(import.meta.env.VITE_API_URL + "/api/show/user/have/plans", { withCredentials: true })
        .then((response) => {
          setHavePlans(response?.data?.results[0]);
          setLoading(false);
        })
        .catch((error) => {
          console.error("userHavePlans", error);
          setError("Failed to fetch user plans.");
          setLoading(false);
        });
    };

    getuserprofile();
    userHavePlans();
  }, []);

  if (error) return <p>{error}</p>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="flex flex-col justify-between">
      <Nav />
      <div className="max-w-3xl h-fit flex-1 mx-auto bg-white shadow-md rounded-lg mt-8 p-6">
        <header className="flex justify-between items-center border-b pb-4 mb-6">
          <h1 className="text-xl font-bold text-gray-700">User Profile</h1>
          <button className="text-sm text-red-500 hover:underline">Edit Registration Details</button>
        </header>

        <div className="flex items-center space-x-4 mb-6">
          <div className="bg-gray-200 rounded-full h-16 w-16 flex items-center justify-center text-2xl font-bold text-gray-500">
            A
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">{data.UserName || "N/A"}</h2>
            <p className="text-sm text-gray-600">Reg. No: {data?.RegNo || "N/A"}</p>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-gray-700">
            <span className="font-bold">Father's Name:</span> {data?.FatherName || "N/A"}
          </p>
          <p className="text-gray-700">
            <span className="font-bold">Mother's Name:</span> {data?.MotherName || "N/A"}
          </p>
          <p className="text-gray-700">
            <span className="font-bold">Mobile Number:</span> {data?.Phone || "N/A"}
          </p>
          <p className="text-gray-700">
            <span className="font-bold">Email ID:</span> {data?.Email || "N/A"}
          </p>
          <p className="text-gray-700">
            <span className="font-bold">Age:</span> {data?.Age || "N/A"}
          </p>
          <p className="text-gray-700">
            <span className="font-bold">DOB:</span> {data?.DOB || "N/A"}
          </p>
          <p className="text-gray-700">
            <span className="font-bold">District:</span> {data?.District || "N/A"}
          </p>
          <p className="text-gray-700">
            <span className="font-bold">Address:</span> {data?.Address || "N/A"}, {data?.District || "N/A"},{" "}
            {data?.State || "N/A"}
          </p>
          <p className="text-gray-700">
            <span className="font-bold">Pincode:</span> {data?.Pincode || "N/A"}
          </p>
        </div>

        <div className="bg-blue-100 border border-blue-300 p-4 rounded-lg flex items-center justify-between">
          <div>
            <h3 className="text-blue-800 font-bold">My Purchase Plans</h3>
            {havePlans ? (
              <p className="text-sm text-blue-700">
                {havePlans?.PlanName || "N/A"} year plan {havePlans?.PlanDuration || "N/A"}-month subscription for
                exclusive deals and discounts.
              </p>
            ) : (
              <p className="text-sm text-blue-700">No plans purchased yet.</p>
            )}
          </div>
          <Link to="/paymentinfo" className="text-sm text-blue-500 underline">
            View
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;