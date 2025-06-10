"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Placeholder company logos
const companyLogos = [
  { name: "Company 1", logo: "/logos/logo1.svg" },
  { name: "Company 2", logo: "/logos/logo2.svg" },
  { name: "Company 3", logo: "/logos/logo3.svg" },
  { name: "Company 4", logo: "/logos/logo4.svg" },
  { name: "Company 5", logo: "/logos/logo5.svg" },
  { name: "Company 6", logo: "/logos/logo6.svg" },
  { name: "Company 7", logo: "/logos/logo7.svg" },
  { name: "Company 8", logo: "/logos/logo8.svg" },
];

// Placeholder automation screenshots
const automationScreenshots = [
  {
    id: 1,
    title: "Client Onboarding Automation",
    description: "Automated welcome sequence with dynamic personalization",
    image: "/screenshots/automation1.jpg",
    category: "CRM",
  },
  {
    id: 2,
    title: "Lead Nurturing Workflow",
    description: "Multi-channel engagement based on prospect behavior",
    image: "/screenshots/automation2.jpg",
    category: "Marketing",
  },
  {
    id: 3,
    title: "Inventory Management System",
    description: "Real-time stock alerts with predictive ordering",
    image: "/screenshots/automation3.jpg",
    category: "Operations",
  },
  {
    id: 4,
    title: "Customer Support AI",
    description: "Intelligent ticket routing and response suggestions",
    image: "/screenshots/automation4.jpg",
    category: "Support",
  },
  {
    id: 5,
    title: "Sales Pipeline Automation",
    description: "Deal progress tracking with win probability forecasting",
    image: "/screenshots/automation5.jpg",
    category: "Sales",
  },
  {
    id: 6,
    title: "Document Processing System",
    description: "Automated extraction and classification of key information",
    image: "/screenshots/automation6.jpg",
    category: "Operations",
  },
];

// Logo carousel component
const LogoCarousel = () => {
  // Duplicate logos for infinite scroll effect
  const allLogos = [...companyLogos, ...companyLogos];
  
  return (
    <div className="w-full overflow-hidden bg-gray-900/50 backdrop-blur-sm py-8 rounded-xl">
      <motion.div
        className="flex"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          x: {
            duration: 20,
            ease: "linear",
            repeat: Infinity,
          },
        }}
      >
        <div className="flex items-center gap-16 px-8">
          {allLogos.map((company, index) => (
            <div 
              key={`${company.name}-${index}`} 
              className="flex-shrink-0 h-12 w-32 relative grayscale hover:grayscale-0 transition-all duration-300"
            >
              <div className="bg-gray-800/80 rounded-lg h-full w-full flex items-center justify-center">
                <span className="text-gray-400 text-sm font-medium">{company.name}</span>
                {/* In a real implementation, you would use:
                <Image 
                  src={company.logo}
                  alt={company.name}
                  fill
                  className="object-contain p-2"
                /> */}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

// Screenshot card component
const ScreenshotCard = ({ screenshot, index }: { screenshot: typeof automationScreenshots[0], index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-xl bg-gray-900 border border-gray-800 hover:border-purple-500/50 transition-all duration-300"
    >
      <div className="aspect-video w-full relative overflow-hidden">
        {/* Placeholder for screenshot image */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20 flex items-center justify-center">
          <div className="w-full h-full bg-gray-800 opacity-80 backdrop-blur-sm">
            {/* This would be an actual image in production */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4/5 h-4/5 bg-gray-700 rounded-lg p-3">
                <div className="w-full h-6 bg-gray-600 rounded-md mb-3"></div>
                <div className="grid grid-cols-3 gap-2 h-5/6">
                  <div className="bg-gray-600/80 rounded-md"></div>
                  <div className="bg-gray-600/60 rounded-md"></div>
                  <div className="bg-gray-600/40 rounded-md"></div>
                </div>
              </div>
            </div>
            
            {/* Blurred UI elements to simulate interface */}
            <div className="absolute top-2 left-2 right-2 h-6 bg-gray-700 rounded-t-md flex items-center px-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                <div className="w-2 h-2 rounded-full bg-gray-500"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Category badge */}
        <div className="absolute top-3 right-3 bg-gray-800/90 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded-full text-gray-300 border border-gray-700">
          {screenshot.category}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-purple-400 transition-colors">
          {screenshot.title}
        </h3>
        <p className="text-gray-400 text-sm">
          {screenshot.description}
        </p>
      </div>
      
      {/* Hover overlay with view button */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="button-primary py-2 px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100"
        >
          View Details
        </motion.button>
      </div>
    </motion.div>
  );
};

const SocialProof = () => {
  // Animation variants for the section
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="social-proof" className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-12"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Trusted by <span className="gradient-text">Industry Leaders</span>
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            We've helped businesses across industries transform their operations with intelligent automation.
          </motion.p>
        </motion.div>
        
        {/* Logo carousel */}
        <motion.div
          variants={itemVariants}
          className="mb-20"
        >
          <LogoCarousel />
        </motion.div>
        
        {/* Automation screenshots */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mb-12 text-center"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Our <span className="gradient-text">Automation Showcase</span>
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-gray-400 max-w-2xl mx-auto text-lg mb-8"
          >
            Real solutions we've built for real businesses. Names blurred for client privacy.
          </motion.p>
        </motion.div>
        
        {/* Screenshots grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {automationScreenshots.map((screenshot, index) => (
            <ScreenshotCard 
              key={screenshot.id} 
              screenshot={screenshot} 
              index={index}
            />
          ))}
        </div>
        
        {/* CTA button */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="button-primary py-3 px-8 text-lg"
          >
            See More Case Studies
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProof;
