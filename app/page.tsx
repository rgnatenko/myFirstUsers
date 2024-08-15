'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import Modal from '@/components/Modal'; // We'll create this component

interface Example {
  title: string;
  duration: string;
  tag: string;
}

const MarketingDashboard = () => {
  const [selectedExample, setSelectedExample] = useState<Example | null>(null);

  const categories = [
    { title: 'ACQUISITION', items: ['Content', 'SEO', 'Sales', 'Social', 'Ads'] },
    { title: 'CONVERSION', items: ['Copywriting', 'Landing Page'] },
    { title: 'MORE', items: ['Retention', 'Brand', 'Referral', 'Creative'] },
    { title: 'NEWSLETTER', items: [] },
  ];

  const examples = [
    { title: 'Same interview. 700x reach.', duration: '30 secs', tag: 'Social' },
    { title: 'Posting seltzer. Making money.', duration: '2 mins', tag: 'Creative' },
    { title: 'The saleswoman closing 33% of cold pitches', duration: '2 min', tag: 'Sales' },
    { title: 'A full-time "pizza influencer"', duration: '2 mins', tag: 'Content' },
    // Add more examples here
  ];

  const openModal = (example: Example) => {
    setSelectedExample(example);
  };

  const closeModal = () => {
    setSelectedExample(null);
  };

  return (
    <div className="p-[5%] bg-white text-gray-800 min-h-screen">
      <header className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-4 sm:mb-0">MARKETING EXAMPLES</h1>
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <button className="bg-gray-200 hover:bg-gray-300 transition-colors px-4 py-2 rounded-lg text-sm text-gray-700">
            Get 6 new tips in your inbox every Monday
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 transition-colors px-4 py-2 rounded-lg text-sm font-semibold text-white">
            Yes Please :)
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
        <div className="lg:col-span-1">
          {categories.map((category, index) => (
            <div key={index} className="mb-6">
              <h2 className="font-bold text-lg mb-3 text-blue-600">{category.title}</h2>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item, itemIndex) => (
                  <span key={itemIndex} className="bg-gray-200 hover:bg-gray-300 transition-colors px-3 py-1 rounded-full text-sm cursor-pointer text-gray-700">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {examples.map((example, index) => (
            <Card 
              key={index} 
              className="bg-gray-100 hover:bg-gray-200 transition-colors p-6 rounded-xl shadow-md cursor-pointer"
              onClick={() => openModal(example)}
            >
              <h3 className="font-bold text-lg mb-3 text-blue-600">{example.title}</h3>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{example.duration}</span>
                <span className="bg-blue-600 px-3 py-1 rounded-full text-xs font-semibold text-white">{example.tag}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {selectedExample && (
        <Modal title={selectedExample.title} onClose={closeModal}>
          <p>Duration: {selectedExample.duration}</p>
          <p>Tag: {selectedExample.tag}</p>
          {/* Add more content for the modal here */}
        </Modal>
      )}
    </div>
  );
};

export default MarketingDashboard;