"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// Placeholder testimonial data
const testimonials = [
  {
    id: 1,
    content: "The AI automation system they built for our client onboarding reduced our process from 2 weeks to just 3 days. Our team can now focus on strategy instead of paperwork.",
    author: "Sarah Johnson",
    position: "Operations Director",
    company: "TechGrowth Partners",
    avatar: "/avatars/avatar1.png",
    platform: "slack", // slack, whatsapp, notion
    delay: 0.1
  },
  {
    id: 2,
    content: "We tried 3 different automation vendors before finding this team. They actually took the time to understand our business processes before suggesting solutions. The ROI has been incredible.",
    author: "Michael Chen",
    position: "CEO",
    company: "Retail Innovations Inc.",
    avatar: "/avatars/avatar2.png",
    platform: "notion",
    delay: 0.3
  },
  {
    id: 3,
    content: "Their warehouse AI implementation reduced our picking errors by 94% and increased throughput by 37%. The system paid for itself within 4 months.",
    author: "Alex Rivera",
    position: "Logistics Manager",
    company: "Global Distributors",
    avatar: "/avatars/avatar3.png",
    platform: "whatsapp",
    delay: 0.5
  },
  {
    id: 4,
    content: "What impressed me most was how they handled the transition. The training for our team was comprehensive, and they stayed on as support until we were fully comfortable with the new systems.",
    author: "Priya Patel",
    position: "HR Director",
    company: "EdTech Solutions",
    avatar: "/avatars/avatar4.png",
    platform: "slack",
    delay: 0.7
  }
];

// Chat bubble component
const ChatBubble = ({ testimonial, index }: { testimonial: typeof testimonials[0], index: number }) => {
  // Different styling based on platform
  const getBubbleStyle = () => {
    switch (testimonial.platform) {
      case 'slack':
        return "bg-[#1a1d21] border-[#424242]";
      case 'whatsapp':
        return "bg-[#1f2c34] border-[#394349]";
      case 'notion':
        return "bg-[#191919] border-[#333333]";
      default:
        return "bg-gray-900 border-gray-800";
    }
  };

  // Different header styling based on platform
  const getHeaderStyle = () => {
    switch (testimonial.platform) {
      case 'slack':
        return "border-b border-[#424242] pb-3";
      case 'whatsapp':
        return "text-[#25D366]";
      case 'notion':
        return "text-gray-400";
      default:
        return "";
    }
  };

  // Animation variants
  const bubbleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: testimonial.delay
      }
    }
  };

  // Float animation based on index (alternating)
  const floatAnimation = {
    y: index % 2 === 0 ? [0, -8, 0] : [0, -12, 0],
    transition: {
      duration: index % 2 === 0 ? 4 : 5,
      repeat: Infinity,
      ease: "easeInOut",
      delay: index * 0.5
    }
  };

  return (
    <motion.div
      variants={bubbleVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      animate={floatAnimation}
      className={`rounded-xl border p-5 shadow-lg max-w-md ${getBubbleStyle()}`}
    >
      {/* Message header */}
      <div className={`flex items-center mb-4 ${getHeaderStyle()}`}>
        <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3 bg-gray-700 flex-shrink-0">
          {/* Placeholder avatar */}
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-lg font-bold">
            {testimonial.author.charAt(0)}
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-white">{testimonial.author}</h4>
          <p className="text-sm text-gray-400">{testimonial.position}, {testimonial.company}</p>
        </div>
        
        {/* Platform indicator */}
        {testimonial.platform === 'slack' && (
          <div className="ml-auto bg-[#611f69] rounded p-1">
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 2a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm12-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 2a5 5 0 1 1 0-10 5 5 0 0 1 0 10zM6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 2a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm12-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 2a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" />
            </svg>
          </div>
        )}
        
        {testimonial.platform === 'whatsapp' && (
          <div className="ml-auto">
            <svg className="w-5 h-5 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </div>
        )}
        
        {testimonial.platform === 'notion' && (
          <div className="ml-auto">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466l1.823 1.447zm1.26 2.66v13.752c0 .84.608 1.12 1.544.98l14.362-1.12c.934-.14.934-.7.934-1.213V5.857c0-.513-.233-.793-.748-.747l-15.346.934c-.56.047-.746.327-.746.827zm14.546 1.54v11.665c0 .233-.28.42-.606.42-.187 0-.374-.047-.56-.187l-4.389-2.52v2.146c0 .373-.374.606-.748.606-.187 0-.374-.047-.56-.187l-4.577-2.707v2.52c0 .28-.187.42-.467.42l-1.544-.093c-.28 0-.374-.093-.374-.42V9.497c0-.233.187-.42.467-.42.186 0 .373.047.56.187l4.576 2.707v-2.52c0-.28.187-.42.467-.42.187 0 .373.047.56.187l4.389 2.52V9.497c0-.187.187-.42.467-.42.28 0 .374.093.374.42z" />
            </svg>
          </div>
        )}
      </div>
      
      {/* Message content */}
      <p className="text-gray-200 leading-relaxed">{testimonial.content}</p>
      
      {/* Message timestamp */}
      <div className="mt-4 text-xs text-gray-500 flex justify-end">
        {testimonial.platform === 'slack' && "Posted in #testimonials"}
        {testimonial.platform === 'whatsapp' && "Sent • Read"}
        {testimonial.platform === 'notion' && "Last edited 2 days ago"}
      </div>
      
      {/* Platform-specific UI elements */}
      {testimonial.platform === 'slack' && (
        <div className="mt-3 flex gap-2">
          <span className="text-xs bg-gray-800 text-gray-400 px-2 py-1 rounded hover:bg-gray-700 cursor-pointer">
            👍 1
          </span>
          <span className="text-xs bg-gray-800 text-gray-400 px-2 py-1 rounded hover:bg-gray-700 cursor-pointer">
            💯 2
          </span>
        </div>
      )}
      
      {testimonial.platform === 'notion' && (
        <div className="mt-3 flex gap-2">
          <span className="text-xs bg-gray-800 text-gray-400 px-2 py-1 rounded hover:bg-gray-700 cursor-pointer">
            Add comment
          </span>
        </div>
      )}
    </motion.div>
  );
};

const Testimonials = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
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
      id="testimonials" 
      ref={sectionRef}
      className="py-20 md:py-28 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-40 right-20 w-80 h-80 bg-purple-900/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-40 left-10 w-60 h-60 bg-blue-900/10 rounded-full blur-3xl -z-10"></div>
      
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
            What Our <span className="gradient-text">Clients Say</span>
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-gray-300 max-w-2xl mx-auto text-lg"
          >
            Real feedback from businesses that have transformed their operations with our AI automation solutions.
          </motion.p>
        </motion.div>
        
        {/* Chat bubbles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {testimonials.map((testimonial, index) => (
            <ChatBubble 
              key={testimonial.id} 
              testimonial={testimonial} 
              index={index}
            />
          ))}
        </div>
        
        {/* View Project Walkthrough Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="button-primary py-4 px-10 text-lg flex items-center mx-auto"
          >
            <span>View Real Project Walkthrough</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
            </svg>
          </motion.button>
          
          {/* Additional info */}
          <p className="text-gray-500 mt-4 text-sm">
            See exactly how we implemented AI automation for a mid-sized business
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
