import React, { useState } from 'react';
import Layout from '../layout/Layout';

const schemes = [
  {
    name: 'Swachh Bharat Mission (SBM)',
    description: 'A mission aimed at achieving a clean India by eliminating open defecation and improving solid waste management across urban and rural areas. The initiative includes constructing toilets, promoting cleanliness, and implementing effective waste management practices.',
    website: 'https://swachhbharat.mygov.in/',
  },
  {
    name: 'National Mission on Sustainable Habitat',
    description: 'This mission focuses on sustainable urban planning, aiming to reduce environmental impact through better waste management, energy efficiency, and water conservation. It supports initiatives to make cities more sustainable and livable.',
    website: 'http://www.moef.nic.in/sites/default/files/Mission-Sustainable-Habitat.pdf',
  },
  {
    name: 'Solid Waste Management Rules, 2016',
    description: 'These rules provide a comprehensive framework for managing solid waste, including segregation at source, collection, processing, and disposal. The aim is to ensure effective waste management practices to minimize environmental impact.',
    website: 'https://www.moef.gov.in/wp-content/uploads/2017/07/Solid-Waste-Management.pdf',
  },
  {
    name: 'Plastic Waste Management Rules, 2016',
    description: 'The rules focus on reducing plastic waste by promoting recycling and reuse. They mandate extended producer responsibility and the creation of mechanisms for managing plastic waste effectively to reduce plastic pollution.',
    website: 'https://www.moef.gov.in/wp-content/uploads/2018/03/PWM-Rule-2016.pdf',
  },
  {
    name: 'Atal Mission for Rejuvenation and Urban Transformation (AMRUT)',
    description: 'AMRUT aims to improve urban infrastructure by providing financial support for the development of amenities such as water supply, sewerage, and urban transport. It focuses on making urban areas more sustainable and resilient.',
    website: 'http://amrut.gov.in/',
  },
  {
    name: 'Ministry of Housing and Urban Affairs (MoHUA)',
    description: 'MoHUA is responsible for implementing various urban development programs, including those related to waste management. It aims to enhance the quality of life in urban areas through effective policies and initiatives.',
    website: 'https://mohua.gov.in/',
  },
  {
    name: 'Central Pollution Control Board (CPCB)',
    description: 'CPCB oversees the implementation of pollution control measures, including those related to waste management. It monitors pollution levels and provides guidelines to ensure compliance with environmental regulations.',
    website: 'https://cpcb.nic.in/',
  },
];

const GovSchemePage = () => {
  const [selectedScheme, setSelectedScheme] = useState(null);

  const handleExploreMore = (scheme) => {
    if (selectedScheme === scheme) {
      setSelectedScheme(null); // Close the scheme details if already open
    } else {
      setSelectedScheme(scheme); // Open the selected scheme details
    }
  };

  return (
    <Layout>
        <div className="min-h-screen bg-[#003311f8] text-white p-6">
      {/* Display detailed information of selected scheme */}
      {selectedScheme && (
        <div className="mb-12">
          <div className="p-6 border border-[#51cf7bf8] rounded-lg shadow-md bg-[#0a2540] w-full mx-auto">
            <h2 className="text-3xl font-bold text-[#51cf7bf8] mb-4">{selectedScheme.name}</h2>
            <p className="text-lg text-gray-300 mb-4">{selectedScheme.description}</p>
            <a
              href={selectedScheme.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 hover:underline"
            >
              {selectedScheme.website}
            </a>
          </div>
        </div>
      )}

      {/* Display cards for each scheme */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {schemes.map((scheme, index) => (
          <div key={index} className="p-6 border border-[#51cf7bf8] rounded-lg shadow-md bg-[#0a2540]">
            <h3 className="text-2xl font-semibold text-[#51cf7bf8] mb-2">{scheme.name}</h3>
            <p className="text-lg text-gray-300 mb-4">{scheme.description.substring(0, 100)}...</p>
            <button
              onClick={() => handleExploreMore(scheme)}
              className="bg-[#51cf7bf8] text-white py-2 px-4 rounded hover:bg-[#51cf7bf8] transition duration-300"
            >
              {selectedScheme === scheme ? 'Explore Less' : 'Explore More'}
            </button>
          </div>
        ))}
      </div>
    </div>
    </Layout>
    
  );
};

export default GovSchemePage;
