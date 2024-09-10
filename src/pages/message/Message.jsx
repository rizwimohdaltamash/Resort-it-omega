import React from "react";
import { useNavigate } from "react-router-dom";
import Community from "../../lottie/community.json";
import Lottie from "lottie-react";

const Message = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-col-reverse lg:flex-row justify-center items-center bg-gray-100">
      
      <div className="w-full md:w-2/3 lg:w-1/2 flex flex-col justify-center items-center p-4 lg:p-8 lg:mt-8 mb-8 rounded-lg">
        <h1 className="text-2xl lg:text-3xl font-bold mb-4 text-center text-black">
        Clean Future Network :{" "}
          <span className="text-[#51cf7bf8]">CleanConnect</span>
        </h1>
        <p className="text-center  lg:text-lg text-black leading-relaxed">
          Welcome to{" "}
          <span className="text-[#1ca54af8] font-semibold">Clean Connect</span>!
          This platform empowers you to make a difference in your community by
          uploading pictures of areas that need cleaning. Nearby NGOs will
          access these, visit the locations, and ensure they are cleaned up.
          
        </p>
        <button
          onClick={() => {
            navigate("/message");
          }}
          className="bg-[#33c664f8] hover:bg-[#1ca54af8] w-[60%] md:w-1/2 lg:w-1/3 mt-6 py-3 rounded-full text-white text-xl font-semibold shadow-2xl hover:shadow-4xl transition-transform transform hover:-translate-y-1"
        >
          Just Connect it
        </button>
      </div>

      <div className="w-full lg:w-1/2 flex justify-center mt-8 mb-8">
        <div className="bg-gray-100 shadow-2xl rounded-lg overflow-hidden w-[80%] lg:w-[50%] p-4">
          <div className="bg-gray-200 flex justify-center">
            <Lottie className="w-2/3" animationData={Community} />
          </div>

          <div className="mt-4 p-1 rounded">
            <h1 className="text-xl font-bold text-gray-600">Clean Connect</h1>
            <p className="text-md text-gray-400">
              Connecting people with ngo's nation wide, and creating solutions
              to get all problems.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Message;
