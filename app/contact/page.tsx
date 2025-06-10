"use client";

import ContactCTA from '../components/home/ContactCTA';
import { Metadata } from 'next';

export const metadata = {
  title: 'Contact Us | AI Automation Agency',
  description: 'Get in touch with our AI automation experts to discuss your business needs and automation opportunities.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="pt-24 pb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
          <span className="gradient-text">Contact Us</span>
        </h1>
        <p className="text-xl text-gray-300 text-center max-w-2xl mx-auto mb-12">
          Ready to transform your business operations with AI automation? 
          Get in touch with our team of experts today.
        </p>
      </div>
      
      <ContactCTA />
    </div>
  );
}
