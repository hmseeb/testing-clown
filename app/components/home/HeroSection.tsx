"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Particle animation effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);

    // Particle properties
    const particleCount = 100;
    const particles: { x: number; y: number; size: number; speedX: number; speedY: number; opacity: number }[] = [];

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap particles around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${particle.opacity})`;
        ctx.fill();
      });
      
      // Draw connections between nearby particles
      particles.forEach((particleA, i) => {
        particles.slice(i + 1).forEach((particleB) => {
          const dx = particleA.x - particleB.x;
          const dy = particleA.y - particleB.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particleA.x, particleA.y);
            ctx.lineTo(particleB.x, particleB.y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
    };
  }, []);

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden py-20 lg:py-0">
      {/* Particle background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0"
        style={{ opacity: 0.6 }}
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 z-10"></div>
      
      {/* Content container */}
      <div className="container mx-auto relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left column - Text content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col space-y-8"
          >
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            >
              <span className="block mb-2">We don't just</span>
              <span className="block mb-2">automate tasks —</span>
              <span className="gradient-text">we engineer growth through AI.</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-300 max-w-xl"
            >
              Tailored AI workflows for founders, marketers, and teams ready to scale.
            </motion.p>
            
            <motion.div variants={itemVariants}>
              <Link href="#contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="button-primary text-lg px-8 py-4 shadow-lg shadow-purple-500/20"
                >
                  Let's Build Your System
                  <motion.span
                    className="inline-block ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    →
                  </motion.span>
                </motion.button>
              </Link>
            </motion.div>
            
            {/* Trust indicators */}
            <motion.div 
              variants={itemVariants}
              className="pt-8 border-t border-gray-800 mt-4"
            >
              <p className="text-gray-400 text-sm mb-4">Trusted by innovative teams</p>
              <div className="flex flex-wrap gap-8 items-center opacity-70">
                {/* Placeholder company logos - in a real implementation, replace with actual logos */}
                <div className="h-6 w-24 bg-gray-700 rounded animate-pulse"></div>
                <div className="h-6 w-20 bg-gray-700 rounded animate-pulse"></div>
                <div className="h-6 w-28 bg-gray-700 rounded animate-pulse"></div>
                <div className="h-6 w-24 bg-gray-700 rounded animate-pulse"></div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Right column - Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative"
          >
            {/* AI Automation Illustration/Mockup */}
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Main circular glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600/30 to-blue-600/30 blur-3xl"></div>
              
              {/* Mockup container */}
              <div className="relative h-full w-full rounded-2xl overflow-hidden border border-gray-800 bg-gray-900/80 backdrop-blur-sm shadow-xl">
                {/* Header bar */}
                <div className="h-10 bg-gray-800 flex items-center px-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="mx-auto text-xs text-gray-400 font-mono">AI Workflow Automation</div>
                </div>
                
                {/* Content area */}
                <div className="p-6">
                  {/* Workflow diagram */}
                  <div className="flex flex-col space-y-4">
                    {/* Connection lines */}
                    <motion.div 
                      className="absolute left-1/2 top-16 h-[calc(100%-4rem)] w-0.5 bg-gradient-to-b from-purple-500 to-blue-500"
                      initial={{ height: 0 }}
                      animate={{ height: "calc(100% - 4rem)" }}
                      transition={{ duration: 1.5, delay: 1 }}
                    ></motion.div>
                    
                    {/* Nodes */}
                    {[1, 2, 3, 4].map((i) => (
                      <motion.div 
                        key={i}
                        className="flex items-center space-x-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 + i * 0.2 }}
                      >
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold shadow-lg shadow-purple-500/20">
                          {i}
                        </div>
                        <div className="bg-gray-800 rounded-lg p-3 flex-1">
                          <div className="h-4 w-3/4 bg-gray-700 rounded mb-2"></div>
                          <div className="h-3 w-1/2 bg-gray-700 rounded"></div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Animated data flow */}
                  <motion.div
                    className="absolute right-8 bottom-8 flex items-center justify-center"
                    animate={{ scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                  >
                    <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-blue-500/30 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-blue-500/50 flex items-center justify-center">
                          <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
              
              {/* Floating elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-12 h-12 bg-purple-500/20 backdrop-blur-md rounded-lg border border-purple-500/30"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              ></motion.div>
              
              <motion.div
                className="absolute -bottom-6 -left-6 w-16 h-16 bg-blue-500/20 backdrop-blur-md rounded-full border border-blue-500/30"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              ></motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
