"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  ClockIcon,
  ArrowDownIcon,
  BanknotesIcon
} from '@heroicons/react/24/outline';

// Stats data
const stats = [
  {
    id: 'onboarding',
    value: 92,
    label: 'faster client onboarding',
    suffix: '%',
    icon: ClockIcon,
    color: 'from-purple-500 to-fuchsia-500',
    delay: 0.1
  },
  {
    id: 'tasks',
    value: 43,
    label: 'drop in repetitive manual tasks',
    suffix: '%',
    icon: ArrowDownIcon,
    color: 'from-blue-500 to-cyan-500',
    delay: 0.3
  },
  {
    id: 'savings',
    value: 125,
    label: 'saved through optimized workflows',
    prefix: '$',
    suffix: 'K',
    icon: BanknotesIcon,
    color: 'from-green-500 to-emerald-500',
    delay: 0.5
  }
];

// Counter animation component
const AnimatedCounter = ({ value, prefix = '', suffix = '' }: { value: number, prefix?: string, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  
  useEffect(() => {
    if (!isInView) return;
    
    let startValue = 0;
    const duration = 1500; // ms
    const frameDuration = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameDuration);
    const incrementValue = value / totalFrames;
    
    let currentFrame = 0;
    
    const counter = setInterval(() => {
      currentFrame++;
      const progress = Math.min(currentFrame / totalFrames, 1);
      const easedProgress = easeOutCubic(progress);
      const currentValue = Math.floor(value * easedProgress);
      
      setCount(currentValue);
      
      if (currentFrame === totalFrames) {
        clearInterval(counter);
      }
    }, frameDuration);
    
    return () => clearInterval(counter);
  }, [isInView, value]);
  
  // Easing function for smoother animation
  function easeOutCubic(x: number): number {
    return 1 - Math.pow(1 - x, 3);
  }
  
  return <span ref={ref}>{prefix}{count}{suffix}</span>;
};

const SuccessMetrics = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
  
  return (
    <section 
      id="success-metrics" 
      ref={sectionRef}
      className="py-20 md:py-28 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-900/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
          >
            Our <span className="gradient-text">Success Metrics</span>
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
          >
            We've helped clients save over <span className="font-bold text-white">3,000 hours</span> in the last 12 months
          </motion.p>
        </motion.div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              variants={itemVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: stat.delay }}
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              className="relative bg-gray-900 border border-gray-800 rounded-2xl p-8 overflow-hidden"
            >
              {/* Gradient background */}
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${stat.color}`}></div>
              
              {/* Icon */}
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${stat.color} p-0.5 mb-6 mx-auto`}>
                <div className="w-full h-full bg-gray-900 rounded-lg flex items-center justify-center">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
              </div>
              
              {/* Stat value */}
              <h3 className="text-4xl md:text-5xl font-bold mb-3 text-center">
                <AnimatedCounter 
                  value={stat.value} 
                  prefix={stat.prefix || ''} 
                  suffix={stat.suffix || ''} 
                />
              </h3>
              
              {/* Stat label */}
              <p className="text-gray-400 text-center text-lg">
                {stat.label}
              </p>
              
              {/* Decorative elements */}
              <motion.div 
                className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-gradient-to-br opacity-10"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.05, 0.1, 0.05],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          ))}
        </div>
        
        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-16"
        >
          <a 
            href="#contact" 
            className="inline-flex items-center button-primary py-3 px-8 text-lg"
          >
            <span>Calculate Your Potential Savings</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default SuccessMetrics;
