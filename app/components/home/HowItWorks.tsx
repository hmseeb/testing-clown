"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Step data
const steps = [
  {
    number: 1,
    title: "Discover",
    description: "Deep-dive workshop to map your automation potential",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
  },
  {
    number: 2,
    title: "Design",
    description: "We build systems that talk to each other — with your goals in mind",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
  {
    number: 3,
    title: "Deploy",
    description: "We train your team & hand off like pros — or stay on retainer",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 0 1 0 1.953l-7.108 4.062A1.125 1.125 0 0 1 3 16.81V8.688ZM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 0 1 0 1.953l-7.108 4.062a1.125 1.125 0 0 1-1.683-.977V8.688Z" />
      </svg>
    ),
  },
];

const HowItWorks = () => {
  // Animation refs and hooks
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.6,
      },
    },
  };

  const circleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.2,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="py-20 md:py-32 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-purple-900/10 to-transparent"></div>
      <div className="absolute -left-20 top-40 w-40 h-40 rounded-full bg-purple-700/10 blur-3xl"></div>
      <div className="absolute -right-20 bottom-40 w-60 h-60 rounded-full bg-blue-700/10 blur-3xl"></div>

      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16 md:mb-24"
        >
          <motion.h2
            variants={titleVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
          >
            How <span className="gradient-text">It Works</span>
          </motion.h2>
          <motion.p
            variants={titleVariants}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            Our proven three-step process transforms your business operations through intelligent automation.
          </motion.p>
        </motion.div>

        {/* Steps - Desktop version (horizontal) */}
        <div className="hidden md:block">
          <div className="flex items-start justify-between relative">
            {/* Connecting line */}
            <div className="absolute top-24 left-[10%] right-[10%] h-1 flex items-center">
              <motion.div
                variants={lineVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="h-1 bg-gradient-to-r from-purple-500 to-blue-500 w-full origin-left"
              ></motion.div>
            </div>

            {/* Steps */}
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                variants={stepVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                custom={index}
                className="flex-1 px-4 relative z-10"
              >
                {/* Step number circle */}
                <div className="flex justify-center mb-8">
                  <motion.div
                    variants={circleVariants}
                    className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center shadow-lg shadow-purple-500/20"
                  >
                    <motion.span
                      variants={iconVariants}
                      className="text-white text-2xl font-bold"
                    >
                      {step.number}
                    </motion.span>
                  </motion.div>
                </div>

                {/* Step icon */}
                <motion.div
                  animate={pulseAnimation}
                  className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-800/80 border border-gray-700 flex items-center justify-center text-purple-400"
                >
                  {step.icon}
                </motion.div>

                {/* Step content */}
                <h3 className="text-2xl font-bold mb-3 text-center gradient-text">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-center">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Steps - Mobile version (vertical) */}
        <div className="md:hidden">
          <div className="relative">
            {/* Vertical connecting line */}
            <div className="absolute top-0 bottom-0 left-8 w-1">
              <motion.div
                variants={lineVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="w-1 bg-gradient-to-b from-purple-500 to-blue-500 h-full origin-top"
              ></motion.div>
            </div>

            {/* Steps */}
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                variants={stepVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                custom={index}
                className="flex mb-16 last:mb-0 relative z-10"
              >
                {/* Step number circle */}
                <motion.div
                  variants={circleVariants}
                  className="w-16 h-16 rounded-full gradient-bg flex-shrink-0 flex items-center justify-center shadow-lg shadow-purple-500/20"
                >
                  <motion.span
                    variants={iconVariants}
                    className="text-white text-2xl font-bold"
                  >
                    {step.number}
                  </motion.span>
                </motion.div>

                <div className="ml-6">
                  {/* Step icon */}
                  <motion.div
                    animate={pulseAnimation}
                    className="w-16 h-16 mb-4 rounded-full bg-gray-800/80 border border-gray-700 flex items-center justify-center text-purple-400"
                  >
                    {step.icon}
                  </motion.div>

                  {/* Step content */}
                  <h3 className="text-xl font-bold mb-2 gradient-text">
                    {step.title}
                  </h3>
                  <p className="text-gray-400">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-center mt-16"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="button-primary inline-flex items-center py-3 px-8 text-lg"
          >
            Start Your Automation Journey
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
