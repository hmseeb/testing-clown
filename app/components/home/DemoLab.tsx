"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, useDragControls, PanInfo } from 'framer-motion';
import Image from 'next/image';

// Demo flow data structure
const demoFlows = [
  {
    id: 'client-onboarding',
    title: 'Client Onboarding Automation',
    description: 'Drag the client data card to the workflow to see how our AI automatically processes new client information.',
    videoUrl: '/videos/client-onboarding-demo.mp4',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
    dragItem: {
      id: 'client-data',
      name: 'New Client Data',
      type: 'data-card'
    },
    dropZone: {
      id: 'onboarding-workflow',
      name: 'Onboarding Workflow'
    },
    steps: [
      'Data extraction from forms',
      'CRM integration',
      'Welcome email sequence',
      'Document generation',
      'Team notification'
    ]
  },
  {
    id: 'content-generation',
    title: 'AI Content Generation',
    description: 'Drag the content brief to the AI writer to generate marketing copy, blog posts, and social media content.',
    videoUrl: '/videos/content-generation-demo.mp4',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
      </svg>
    ),
    dragItem: {
      id: 'content-brief',
      name: 'Content Brief',
      type: 'document'
    },
    dropZone: {
      id: 'ai-writer',
      name: 'AI Writer Engine'
    },
    steps: [
      'Brief analysis',
      'Tone matching',
      'Content structuring',
      'Draft generation',
      'SEO optimization'
    ]
  },
  {
    id: 'data-analysis',
    title: 'Automated Data Analysis',
    description: 'Drag the raw data file to the analysis engine to automatically generate insights and visualizations.',
    videoUrl: '/videos/data-analysis-demo.mp4',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
    dragItem: {
      id: 'raw-data',
      name: 'Raw Data File',
      type: 'data-file'
    },
    dropZone: {
      id: 'analysis-engine',
      name: 'Analysis Engine'
    },
    steps: [
      'Data cleaning',
      'Pattern recognition',
      'Anomaly detection',
      'Visualization creation',
      'Insight generation'
    ]
  }
];

const DemoLab = () => {
  const [selectedDemo, setSelectedDemo] = useState(demoFlows[0]);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const dragControls = useDragControls();
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const dragItemControls = useAnimation();
  const processingControls = useAnimation();
  
  // Reset state when demo changes
  useEffect(() => {
    setIsDragging(false);
    setIsProcessing(false);
    setIsComplete(false);
    setCurrentStep(-1);
    dragItemControls.start({ x: 0, y: 0 });
  }, [selectedDemo, dragItemControls]);

  // Handle drag end
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    
    // Check if dragged over drop zone
    if (dropZoneRef.current) {
      const dropZoneRect = dropZoneRef.current.getBoundingClientRect();
      const isDraggedOverDropZone = 
        info.point.x > dropZoneRect.left &&
        info.point.x < dropZoneRect.right &&
        info.point.y > dropZoneRect.top &&
        info.point.y < dropZoneRect.bottom;
      
      if (isDraggedOverDropZone) {
        // Animate to center of drop zone
        const dropZoneCenterX = dropZoneRect.left + dropZoneRect.width / 2;
        const dropZoneCenterY = dropZoneRect.top + dropZoneRect.height / 2;
        
        dragItemControls.start({
          x: dropZoneCenterX - event.clientX,
          y: dropZoneCenterY - event.clientY,
          scale: 0.8,
          opacity: 0,
          transition: { duration: 0.3 }
        }).then(() => {
          // Start processing animation
          setIsProcessing(true);
          processSteps();
        });
      } else {
        // Return to original position
        dragItemControls.start({ x: 0, y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } });
      }
    }
  };

  // Process steps sequentially
  const processSteps = () => {
    let stepIndex = 0;
    
    const interval = setInterval(() => {
      if (stepIndex < selectedDemo.steps.length) {
        setCurrentStep(stepIndex);
        stepIndex++;
      } else {
        clearInterval(interval);
        setIsProcessing(false);
        setIsComplete(true);
        
        // Play video after completion
        if (videoRef.current) {
          videoRef.current.play().catch(e => console.log("Video play prevented:", e));
        }
      }
    }, 800);
    
    return () => clearInterval(interval);
  };

  // Reset the demo
  const resetDemo = () => {
    setIsComplete(false);
    setCurrentStep(-1);
    dragItemControls.start({ x: 0, y: 0, scale: 1, opacity: 1 });
    
    // Pause video
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  // Select a different demo
  const handleDemoSelect = (demo: typeof demoFlows[0]) => {
    resetDemo();
    setSelectedDemo(demo);
  };

  return (
    <section id="demo-lab" className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Lab background elements */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.png')] opacity-5"></div>
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-purple-900/10 to-transparent"></div>
      <div className="absolute -left-20 top-40 w-40 h-40 rounded-full bg-purple-700/10 blur-3xl"></div>
      <div className="absolute -right-20 bottom-40 w-60 h-60 rounded-full bg-blue-700/10 blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
          >
            AI <span className="gradient-text">Demo Lab</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-300 max-w-2xl mx-auto text-lg"
          >
            Interact with our AI automation workflows to see how they work in real-time.
            <span className="block mt-2 text-purple-400 font-medium">Drag and drop elements to trigger automations.</span>
          </motion.p>
        </div>
        
        {/* Demo selection tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {demoFlows.map((demo) => (
            <motion.button
              key={demo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleDemoSelect(demo)}
              className={`px-6 py-3 rounded-full text-lg font-medium border flex items-center transition-all duration-300 ${
                selectedDemo.id === demo.id 
                  ? "bg-purple-900/30 border-purple-500/50 text-white" 
                  : "bg-gray-900/50 border-gray-700 text-gray-400 hover:text-white hover:border-gray-500"
              }`}
            >
              <span className="mr-2 text-xl">{demo.icon}</span>
              {demo.title.split(' ')[0]}
            </motion.button>
          ))}
        </div>
        
        {/* Lab workspace */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gray-900/80 backdrop-blur-md border border-gray-800 rounded-2xl p-4 md:p-8 shadow-2xl relative overflow-hidden"
        >
          {/* Lab decoration elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500"></div>
          <div className="absolute top-2 left-4 flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="absolute top-3 right-4 text-xs text-gray-500 font-mono">AI LAB v1.0.2</div>
          
          {/* Lab content */}
          <div className="pt-8 pb-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left side - Interactive workflow */}
              <div className="bg-black/30 rounded-xl p-6 border border-gray-800 h-[500px] md:h-[600px] relative">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                  {selectedDemo.title}
                </h3>
                <p className="text-gray-400 mb-8">{selectedDemo.description}</p>
                
                {/* Workflow visualization */}
                <div className="relative h-[calc(100%-120px)]">
                  {/* Drop zone */}
                  <motion.div 
                    ref={dropZoneRef}
                    animate={{
                      boxShadow: isProcessing ? "0 0 0 2px rgba(139, 92, 246, 0.5)" : "0 0 0 1px rgba(75, 85, 99, 0.3)"
                    }}
                    className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 w-48 h-48 rounded-xl border border-gray-700 flex flex-col items-center justify-center transition-all ${
                      isDragging ? "bg-purple-900/20 border-purple-500/50" : "bg-gray-800/50"
                    }`}
                  >
                    <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                      </svg>
                    </div>
                    <span className="text-gray-400 text-center">
                      {isProcessing ? "Processing..." : selectedDemo.dropZone.name}
                    </span>
                    
                    {/* Processing animation */}
                    {isProcessing && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full h-full absolute">
                          <div className="absolute inset-0 bg-purple-500/10 animate-pulse rounded-xl"></div>
                        </div>
                        <svg className="animate-spin h-12 w-12 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      </div>
                    )}
                    
                    {/* Completion animation */}
                    {isComplete && (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        className="absolute inset-0 flex items-center justify-center bg-green-500/20 rounded-xl"
                      >
                        <div className="bg-green-500/30 rounded-full p-3">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-12 h-12 text-green-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                          </svg>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                  
                  {/* Processing steps */}
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 space-y-3 w-full max-w-[180px]">
                    {selectedDemo.steps.map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0.5 }}
                        animate={{ 
                          opacity: currentStep >= index ? 1 : 0.5,
                          x: currentStep >= index ? 0 : -10,
                          color: currentStep >= index ? "#ffffff" : "#6b7280"
                        }}
                        className="flex items-center"
                      >
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 ${
                          currentStep >= index ? "bg-green-500" : "bg-gray-700"
                        }`}>
                          {currentStep >= index ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 text-white">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                          ) : (
                            <span className="text-xs">{index + 1}</span>
                          )}
                        </div>
                        <span className="text-sm">{step}</span>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Draggable item */}
                  {!isProcessing && !isComplete && (
                    <motion.div
                      drag
                      dragControls={dragControls}
                      dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
                      dragElastic={0.1}
                      onDragStart={() => setIsDragging(true)}
                      onDragEnd={handleDragEnd}
                      animate={dragItemControls}
                      whileTap={{ scale: 1.05 }}
                      className="absolute top-10 left-1/2 transform -translate-x-1/2 w-40 h-28 bg-gradient-to-br from-purple-900/80 to-blue-900/80 rounded-lg border border-purple-500/50 p-4 cursor-grab active:cursor-grabbing shadow-lg"
                    >
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500"></div>
                      <div className="flex flex-col h-full justify-between">
                        <div className="flex items-center">
                          {selectedDemo.dragItem.type === 'data-card' && (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-purple-300 mr-2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
                            </svg>
                          )}
                          {selectedDemo.dragItem.type === 'document' && (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-300 mr-2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                            </svg>
                          )}
                          {selectedDemo.dragItem.type === 'data-file' && (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-300 mr-2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                            </svg>
                          )}
                          <span className="text-white font-medium">{selectedDemo.dragItem.name}</span>
                        </div>
                        
                        <div className="mt-2">
                          <div className="h-2 bg-white/20 rounded-full w-3/4"></div>
                          <div className="h-2 bg-white/20 rounded-full w-1/2 mt-1"></div>
                        </div>
                        
                        <div className="text-xs text-purple-200 mt-2 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 mr-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                          </svg>
                          Drag to process
                        </div>
                      </div>
                      
                      {/* Drag handle indicator */}
                      <motion.div 
                        className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center"
                        animate={{ y: [0, -3, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-purple-600">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                        </svg>
                      </motion.div>
                    </motion.div>
                  )}
                </div>
                
                {/* Reset button */}
                {isComplete && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    onClick={resetDemo}
                    className="absolute bottom-6 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md text-white flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                    Try Again
                  </motion.button>
                )}
              </div>
              
              {/* Right side - Video preview */}
              <div className="bg-black/30 rounded-xl p-6 border border-gray-800 h-[500px] md:h-[600px] relative flex flex-col">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                  Demo Video
                </h3>
                <p className="text-gray-400 mb-6">Watch how the automation works in a real-world scenario.</p>
                
                {/* Video placeholder */}
                <div className="flex-grow relative rounded-lg overflow-hidden bg-gray-900">
                  {/* Video element (would be actual video in production) */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <video
                      ref={videoRef}
                      className="absolute inset-0 w-full h-full object-cover opacity-80"
                      loop
                      muted
                      playsInline
                    >
                      <source src={selectedDemo.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    
                    {/* Video overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      {!isComplete && (
                        <div className="text-center">
                          <div className="w-20 h-20 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-purple-400">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                            </svg>
                          </div>
                          <p className="text-gray-400">Complete the workflow to see the demo</p>
                        </div>
                      )}
                    </div>
                    
                    {/* Video controls */}
                    {isComplete && (
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-black/50 backdrop-blur-sm rounded-lg p-2">
                        <div className="flex items-center">
                          <button 
                            onClick={() => videoRef.current?.paused ? videoRef.current?.play() : videoRef.current?.pause()}
                            className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-3"
                          >
                            {videoRef.current?.paused ? (
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-black">
                                <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-black">
                                <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z" clipRule="evenodd" />
                              </svg>
                            )}
                          </button>
                          <div className="text-xs text-white">Demo with narration</div>
                        </div>
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-white mr-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
                          </svg>
                          <div className="w-16 h-1 bg-gray-700 rounded-full">
                            <div className="w-3/4 h-full bg-white rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Narration indicators */}
                    {isComplete && (
                      <div className="absolute top-4 right-4 flex items-center bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                        <span className="text-xs text-white">REC</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Video info */}
                <div className="mt-4">
                  <h4 className="font-semibold text-white">{selectedDemo.title} Demo</h4>
                  <p className="text-gray-400 text-sm">See how this automation works in a real business environment.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Lab instructions */}
          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 inline-block mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
              Drag the colored card to the workflow engine to see the automation in action
            </p>
          </div>
        </motion.div>
        
        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="button-primary py-3 px-8 text-lg inline-flex items-center"
          >
            <span>See Custom Demo For Your Business</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default DemoLab;
