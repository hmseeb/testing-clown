"use client";

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// Data structure for industries and use cases
const industries = [
  {
    id: 'ecommerce',
    name: 'eCommerce',
    icon: '📦',
    description: 'Intelligent automation solutions for online retailers and eCommerce platforms.',
    useCases: [
      {
        id: 'abandoned-cart',
        title: 'Abandoned Cart Recovery',
        shortDesc: 'Smart follow-ups that convert abandoned carts into sales',
        fullDesc: 'Our AI-driven abandoned cart recovery system analyzes customer behavior patterns to send perfectly timed, personalized follow-ups. It dynamically adjusts messaging based on customer history, cart value, and previous interactions to maximize conversion rates.',
        stats: [
          { label: 'Recovery Rate', value: '32%' },
          { label: 'ROI', value: '11.3x' },
          { label: 'Setup Time', value: '2 days' }
        ],
        videoUrl: '/videos/abandoned-cart-demo.mp4',
        mockupImage: '/mockups/abandoned-cart.png'
      },
      {
        id: 'warehouse-ai',
        title: 'Warehouse AI Agents',
        shortDesc: 'Intelligent inventory management and fulfillment optimization',
        fullDesc: 'Our warehouse AI agents continuously monitor inventory levels, predict stock needs based on seasonal trends, and optimize picking routes for maximum efficiency. The system integrates with your existing warehouse management software to provide real-time insights and automated decision-making.',
        stats: [
          { label: 'Efficiency Gain', value: '27%' },
          { label: 'Error Reduction', value: '94%' },
          { label: 'Labor Savings', value: '$12K/mo' }
        ],
        videoUrl: '/videos/warehouse-ai-demo.mp4',
        mockupImage: '/mockups/warehouse-ai.png'
      }
    ]
  },
  {
    id: 'education',
    name: 'Education',
    icon: '🎓',
    description: 'Streamlined processes for educational institutions and online learning platforms.',
    useCases: [
      {
        id: 'student-onboarding',
        title: 'Automated Student Onboarding',
        shortDesc: 'Frictionless enrollment and course setup for new students',
        fullDesc: 'Our student onboarding automation handles the entire process from application to first day of class. It includes document collection, verification, personalized welcome sequences, course material distribution, and integration with learning management systems - all while keeping administrative staff informed at every step.',
        stats: [
          { label: 'Time Saved', value: '82%' },
          { label: 'Student Satisfaction', value: '4.8/5' },
          { label: 'Staff Hours Saved', value: '120+/month' }
        ],
        videoUrl: '/videos/student-onboarding-demo.mp4',
        mockupImage: '/mockups/student-onboarding.png'
      },
      {
        id: 'learning-paths',
        title: 'Adaptive Learning Paths',
        shortDesc: 'Personalized education journeys based on student performance',
        fullDesc: 'Our adaptive learning path system uses AI to analyze student performance and learning styles to dynamically adjust course content, difficulty, and pacing. It identifies knowledge gaps, recommends additional resources, and provides instructors with detailed insights on student progress and potential intervention points.',
        stats: [
          { label: 'Completion Rate', value: '+41%' },
          { label: 'Knowledge Retention', value: '+35%' },
          { label: 'Student Engagement', value: '3.2x higher' }
        ],
        videoUrl: '/videos/learning-paths-demo.mp4',
        mockupImage: '/mockups/learning-paths.png'
      }
    ]
  },
  {
    id: 'consulting',
    name: 'Consulting',
    icon: '📊',
    description: 'Powerful tools for consultants to deliver higher value with less manual effort.',
    useCases: [
      {
        id: 'client-reports',
        title: 'AI-Generated Client Reports',
        shortDesc: 'Data-rich, visually compelling reports created automatically',
        fullDesc: 'Our AI report generation system connects to your data sources, analyzes trends, identifies key insights, and compiles professionally designed reports with minimal human input. The system learns from feedback to continuously improve output quality and can generate reports on schedule or on demand in multiple formats.',
        stats: [
          { label: 'Time Saved', value: '15 hrs/report' },
          { label: 'Client Satisfaction', value: '+28%' },
          { label: 'Data Sources', value: '50+ integrated' }
        ],
        videoUrl: '/videos/client-reports-demo.mp4',
        mockupImage: '/mockups/client-reports.png'
      },
      {
        id: 'proposal-automation',
        title: 'Proposal Automation',
        shortDesc: 'Custom-tailored proposals that win more business',
        fullDesc: 'Our proposal automation system draws from your past successful proposals, client information, and project requirements to generate highly customized, compelling proposals. It includes dynamic pricing models, team allocation suggestions, timeline generation, and competitive positioning elements - all branded perfectly to your firm.',
        stats: [
          { label: 'Close Rate', value: '+37%' },
          { label: 'Creation Time', value: '-76%' },
          { label: 'Average Deal Size', value: '+22%' }
        ],
        videoUrl: '/videos/proposal-automation-demo.mp4',
        mockupImage: '/mockups/proposal-automation.png'
      }
    ]
  }
];

const UseCaseExplorer = () => {
  // State for selected industry and expanded use case
  const [selectedIndustry, setSelectedIndustry] = useState(industries[0]);
  const [expandedUseCase, setExpandedUseCase] = useState<string | null>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  // Handle industry tab selection
  const handleIndustrySelect = (industry: typeof industries[0]) => {
    setSelectedIndustry(industry);
    setExpandedUseCase(null); // Reset expanded use case when changing industry
  };

  // Handle use case expansion/collapse
  const handleUseCaseToggle = (useCaseId: string) => {
    // If clicking the already expanded use case, collapse it
    if (expandedUseCase === useCaseId) {
      setExpandedUseCase(null);
      // Pause video if it's playing
      if (videoRefs.current[useCaseId]) {
        videoRefs.current[useCaseId]!.pause();
      }
    } else {
      // Expand the clicked use case
      setExpandedUseCase(useCaseId);
      // Play the video after a short delay to allow animation
      setTimeout(() => {
        if (videoRefs.current[useCaseId]) {
          videoRefs.current[useCaseId]!.play().catch(e => console.log("Video play prevented:", e));
        }
      }, 500);

      // Pause any other videos
      Object.keys(videoRefs.current).forEach(key => {
        if (key !== useCaseId && videoRefs.current[key]) {
          videoRefs.current[key]!.pause();
        }
      });
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const tabVariants = {
    inactive: { 
      color: "#9ca3af", 
      backgroundColor: "rgba(31, 41, 55, 0.5)",
      borderColor: "rgba(75, 85, 99, 0.2)"
    },
    active: { 
      color: "#ffffff", 
      backgroundColor: "rgba(91, 33, 182, 0.15)",
      borderColor: "rgba(139, 92, 246, 0.5)",
      transition: { duration: 0.3 }
    },
  };

  return (
    <section id="use-cases" className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-900/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
          >
            Use Case <span className="gradient-text">Explorer</span>
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            Discover how our AI automation solutions transform operations across different industries.
          </motion.p>
        </motion.div>

        {/* Industry Tabs */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {industries.map((industry) => (
            <motion.button
              key={industry.id}
              variants={tabVariants}
              initial="inactive"
              animate={selectedIndustry.id === industry.id ? "active" : "inactive"}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleIndustrySelect(industry)}
              className="px-6 py-3 rounded-full text-lg font-medium border flex items-center transition-all duration-300"
            >
              <span className="mr-2 text-xl">{industry.icon}</span>
              {industry.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Industry Description */}
        <motion.div
          key={selectedIndustry.id + "-desc"}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <p className="text-gray-300 text-lg">{selectedIndustry.description}</p>
        </motion.div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimatePresence mode="wait">
            {selectedIndustry.useCases.map((useCase) => {
              const isExpanded = expandedUseCase === useCase.id;
              
              return (
                <motion.div
                  key={useCase.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className={`bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden ${
                    isExpanded ? 'lg:col-span-2' : ''
                  }`}
                >
                  <div 
                    className={`p-6 cursor-pointer ${isExpanded ? '' : 'hover:bg-gray-800/50'}`}
                    onClick={() => !isExpanded && handleUseCaseToggle(useCase.id)}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-2xl font-bold gradient-text">{useCase.title}</h3>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUseCaseToggle(useCase.id);
                        }}
                        className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
                      >
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          strokeWidth={2} 
                          stroke="currentColor" 
                          className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-gray-300 text-lg mb-4">{useCase.shortDesc}</p>

                    {/* Collapsed preview (shown when not expanded) */}
                    {!isExpanded && (
                      <div className="relative h-48 bg-gray-800 rounded-lg overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                            {/* Placeholder for mockup image */}
                            <div className="text-gray-600 flex flex-col items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mb-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                              </svg>
                              <span>Click to explore</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Expanded content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.5 }}
                          className="mt-6"
                        >
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Video/mockup preview */}
                            <div className="bg-gray-800 rounded-xl overflow-hidden aspect-video relative">
                              {/* Fallback mockup display */}
                              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                                <div className="w-4/5 h-4/5 bg-gray-700 rounded-lg p-3">
                                  <div className="w-full h-6 bg-gray-600 rounded-md mb-3"></div>
                                  <div className="grid grid-cols-3 gap-2 h-5/6">
                                    <div className="bg-gray-600/80 rounded-md"></div>
                                    <div className="bg-gray-600/60 rounded-md"></div>
                                    <div className="bg-gray-600/40 rounded-md"></div>
                                  </div>
                                </div>
                              </div>

                              {/* Video element - would play actual video in production */}
                              <video
                                ref={(el) => (videoRefs.current[useCase.id] = el)}
                                className="absolute inset-0 w-full h-full object-cover"
                                loop
                                muted
                                playsInline
                              >
                                <source src={useCase.videoUrl} type="video/mp4" />
                                Your browser does not support the video tag.
                              </video>

                              {/* Play button overlay */}
                              <div className="absolute inset-0 flex items-center justify-center">
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="w-16 h-16 rounded-full bg-purple-600/80 flex items-center justify-center"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    const video = videoRefs.current[useCase.id];
                                    if (video) {
                                      video.paused ? video.play() : video.pause();
                                    }
                                  }}
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-white">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                                  </svg>
                                </motion.button>
                              </div>
                            </div>

                            {/* Detailed description */}
                            <div className="flex flex-col justify-between">
                              <div>
                                <h4 className="text-xl font-semibold mb-4">About This Solution</h4>
                                <p className="text-gray-300 mb-6">{useCase.fullDesc}</p>
                              </div>

                              {/* Stats */}
                              <div className="grid grid-cols-3 gap-4">
                                {useCase.stats.map((stat, index) => (
                                  <div key={index} className="bg-gray-800/50 p-4 rounded-lg text-center">
                                    <div className="text-2xl font-bold gradient-text mb-1">{stat.value}</div>
                                    <div className="text-sm text-gray-400">{stat.label}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* CTA Button */}
                          <div className="mt-8 flex justify-center">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="button-primary py-3 px-8"
                            >
                              Request Demo
                            </motion.button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold mb-6">
            Need a custom solution for your industry?
          </h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="button-primary py-3 px-8 text-lg"
          >
            Let's Discuss Your Needs
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default UseCaseExplorer;
