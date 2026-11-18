import React from 'react';
import { motion } from 'framer-motion';
import {
  Megaphone,
  Palette,
  Video,
  Globe,
  Smartphone,
  Code,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import ScrollReveal from '../components/ScrollReveal';

const servicesData = [
  {
    icon: Megaphone,
    title: 'Digital Marketing',
    contactValue: 'Digital Marketing',
    description:
      'Strategic digital marketing solutions to amplify your brand\'s online presence and reach your target audience effectively.',
    subServices: [
      'Digital Marketing Strategy',
      'Social Media Management',
      'Social Media Advertising',
      'Facebook & Instagram Ads',
      'Content Management',
    ],
  },
  {
    icon: Palette,
    title: 'Creative Design & Branding',
    contactValue: 'Creative Design & Branding',
    description:
      'Stunning visual identities and creative designs that make your brand stand out in the digital landscape.',
    subServices: [
      'Logo Design',
      'Graphic Design',
      'Brand Identity Design',
      'Advertisement Design',
      'Promotional Poster Design',
    ],
  },
  {
    icon: Video,
    title: 'Video & AI Advertising',
    contactValue: 'Video & AI Advertising',
    description:
      'Engaging video content and AI-powered advertising solutions that captivate your audience.',
    subServices: [
      'Promotional Video Production',
      'Product Advertisement Videos',
      'AI Model Advertising',
      'AI-Powered Creative Content',
    ],
  },
  {
    icon: Globe,
    title: 'Website Development',
    contactValue: 'Website Development',
    description:
      'Modern, responsive websites and web applications built with cutting-edge technologies.',
    subServices: [
      'Business Website Development',
      'E-commerce Website Development',
      'Responsive Website Design',
      'Web Application Development',
    ],
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    contactValue: 'Mobile App Development',
    description:
      'Powerful mobile applications designed to engage users and drive business growth.',
    subServices: [
      'Android Application Development',
      'Mobile App UI/UX Design',
      'Custom Mobile Applications',
    ],
  },
  {
    icon: Code,
    title: 'Custom Software Solutions',
    contactValue: 'Custom Software Solutions',
    description:
      'Tailored software solutions designed to solve your unique business challenges.',
    subServices: [
      'Business Software Development',
      'Custom Software Solutions',
      'Technology-Based Business Solutions',
    ],
  },
];

const ServiceCard = ({ service, index }) => {
  const IconComponent = service.icon;

  const handleLearnMore = (e) => {
    e.preventDefault();
    // Dispatch custom event to preselect service in contact form
    window.dispatchEvent(
      new CustomEvent('preselectService', { detail: service.contactValue })
    );
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ScrollReveal direction="up" delay={index * 0.1}>
      <motion.div
        whileHover={{ y: -5 }}
        className="glass-card rounded-xl p-6 group cursor-pointer gold-glow-hover transition-all duration-300 h-full"
      >
        <div className="w-14 h-14 rounded-lg bg-brand-gold/10 flex items-center justify-center mb-4">
          <IconComponent
            className="text-brand-gold group-hover:scale-110 transition-transform duration-300"
            size={28}
          />
        </div>

        <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
        <p className="text-brand-grey text-sm mb-4">{service.description}</p>

        <ul className="space-y-1 mb-4">
          {service.subServices.slice(0, 3).map((sub, i) => (
            <li key={i} className="flex items-center gap-1 text-xs text-brand-grey/70">
              <ChevronRight size={12} className="text-brand-gold/50" />
              {sub}
            </li>
          ))}
          {service.subServices.length > 3 && (
            <li className="text-xs text-brand-grey/50">
              +{service.subServices.length - 3} more
            </li>
          )}
        </ul>

        <button
          onClick={handleLearnMore}
          className="inline-flex items-center gap-1 text-brand-gold text-sm font-semibold group/link"
        >
          Learn More
          <ArrowRight
            size={16}
            className="group-hover/link:translate-x-1 transition-transform duration-300"
          />
        </button>
      </motion.div>
    </ScrollReveal>
  );
};

const Services = () => {
  return (
    <section id="services" className="section-padding bg-brand-charcoal">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Our Services"
          subtitle="Comprehensive digital solutions to transform your business"
          gold
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {servicesData.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
