import React from "react";
import { useNavigate } from "react-router-dom";
import Bot from "../../lottie/bot.json";
import Lottie from "lottie-react";

const Gemini = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => {
          navigate("/gemini");
        }}
        className="fixed right-4 bottom-32 lg:bottom-12 w-[20%] lg:w-[5%] border-2 border-[#51e883f8] bg-[#cdf9dcf8] rounded-full py-2 lg:py-2 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-110 z-40"
      >
        <Lottie animationData={Bot} />
      </button>
    </div>
  );
};

export default Gemini;
