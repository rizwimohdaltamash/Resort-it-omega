import React from 'react'
import { useNavigate } from "react-router-dom";
import GovSchemes from "../../lottie/gov.json";
import Lottie from "lottie-react";


const GovScheme = () => {
    const navigate = useNavigate();
  return (
    <div className=' w-full flex flex-col lg:flex-row justify-center items-center bg-gray-200'>




<div className=' w-full lg:w-1/2 flex justify-center mt-8 mb-8'>
        <div className='bg-gray-100 shadow-2xl rounded-lg overflow-hidden w-[80%] lg:w-[50%] p-4'>
        <div className='bg-gray-200 flex justify-center'> <Lottie className='w-2/3' animationData={GovSchemes} /></div>
         
          <div className='mt-4 p-1 rounded'>
            <h1 className='text-xl font-bold text-gray-600' >GovSchema</h1>
            <p className='text-md text-gray-400'>Be updated with government bodies  working on waste management and segregation.</p>
          </div>
        </div>
      </div>

      <div className='w-full  md:w-2/3 lg:w-1/2 flex flex-col justify-center items-center p-4 lg:p-8 lg:mt-8 mb-8 rounded-lg'>
  <h1 className='text-2xl lg:text-3xl font-bold mb-4 text-center'>
    Stay Updated with <span className='text-[#51cf7bf8]'>GovSchema</span>
  </h1>
  <p className='text-center  lg:text-lg text-gray-700 leading-relaxed'>
    Welcome to <span className='text-[#1ca54af8] font-semibold'>GovSchema</span>! Stay informed about the latest government schemes and policies. Our platform is dedicated to bringing you the most current and relevant information to help you navigate through the  opportunities provided by the government.
  </p>
  <button
    onClick={() => {
      navigate("/govscheme");
    }}
    className='bg-[#33c664f8] hover:bg-[#1ca54af8] w-[60%] md:w-1/2 lg:w-1/3 mt-6 py-3 rounded-full text-white text-xl font-semibold shadow-2xl hover:shadow-4xl transition-transform transform hover:-translate-y-1'
  >
    Explore Schemes
  </button>
</div>

   
    </div>
  )
}

export default GovScheme
