import React from "react";
import HeroSection from "../../components/heroSection/HeroSection";
import Layout from "../../components/layout/Layout";

import Gemini from "../gemini/Gemini";
import Message from "../message/Message";

import GovScheme from "../govscheme/GovScheme";
import Skills from "../skills/Skills";
import Scrap from "../scrap/Scrap";

const HomePage = () => {
  
  const storedUser = localStorage.getItem("users");
  const user = storedUser ? JSON.parse(storedUser) : null;

  return (
    <div>
      <Layout>
        <HeroSection />

        {user?.role ==='user'&&  <Gemini />}
        
        {(user?.role ==='user' || user?.role ==='scrapdealer') &&  <Scrap />}
        {(user?.role ==='user' || user?.role ==='ngo') &&   <Message />}

        {user?.role ==='user' &&  <GovScheme />}
        {user?.role ==='user' &&  <Skills />}
         

         
      </Layout>
    </div>
  );
};

export default HomePage;
