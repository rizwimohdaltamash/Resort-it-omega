import React from "react";
import Layout from "../../components/layout/Layout";
import Hero from "../../lottie/hero1.json";
import Lottie from "lottie-react";

const UserDashboard = () => {
  // get user from localStorage
  const storedUser = localStorage.getItem("users");
  const user = storedUser ? JSON.parse(storedUser) : null;

  return (
    <Layout>
       {/* User Info Section */}
       <div className="flex flex-col bg-gray-100">
       <div className="flex flex-row h-1/2 justify-center bg-white text-black p-8  shadow-md mb-8">
          <div className=" w-[65%] lg:w-1/2">
            <h1 className=" text-lg lg:text-4xl font-bold text-[#0ae854f8]">
              Welcome, {user?.name}
            </h1>
            <p className="lg:text-2xl text-gray-800 mt-4">
              Email: {user?.email}
            </p>
            <p className="lg:text-2xl text-gray-800 mt-4">Role: {user?.role}</p>
           
          </div>

          {/* Hero Icon */}
          <div className=" w-[35%] lg:w-[25%] flex flex-row justify-end">
            <Lottie animationData={Hero} />
          </div>
        </div>
      </div>
     
     

     
    </Layout>
  );
};

export default UserDashboard;
