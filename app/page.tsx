"use client";

import HeroSection from './components/home/HeroSection';
import SocialProof from './components/home/SocialProof';
import HowItWorks from './components/home/HowItWorks';
import UseCaseExplorer from './components/home/UseCaseExplorer';
import SuccessMetrics from './components/home/SuccessMetrics';
import Testimonials from './components/home/Testimonials';
import DemoLab from './components/home/DemoLab';
import ContactCTA from './components/home/ContactCTA';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Social Proof + Logos */}
      <SocialProof />
      
      {/* How It Works (3-Step Process) */}
      <HowItWorks />
      
      {/* Use Case Explorer */}
      <UseCaseExplorer />
      
      {/* Success Metrics */}
      <SuccessMetrics />
      
      {/* Testimonials */}
      <Testimonials />
      
      {/* AI Demo Lab (Optional) */}
      <DemoLab />
      
      {/* Bottom CTA (Sticky) */}
      <ContactCTA />
    </div>
  );
}
