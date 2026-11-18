import React from 'react';
import { Sparkles, Target, Cpu, PenTool, Users, Building2 } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import ScrollReveal from '../components/ScrollReveal';

const features = [
  {
    icon: Sparkles,
    title: 'Creative & Innovative Solutions',
    description:
      'We bring fresh, creative ideas and innovative approaches to every project, ensuring your brand stands apart.',
  },
  {
    icon: Target,
    title: 'Customized Business Strategies',
    description:
      'Every business is unique. We craft tailored strategies that align with your specific goals and vision.',
  },
  {
    icon: Cpu,
    title: 'Modern Technologies',
    description:
      'We leverage the latest technologies and tools to build solutions that are future-ready and scalable.',
  },
  {
    icon: PenTool,
    title: 'Professional Design Approach',
    description:
      'Our design philosophy combines aesthetics with functionality, creating experiences that leave lasting impressions.',
  },
  {
    icon: Users,
    title: 'Customer-Focused Solutions',
    description:
      'Your success is our priority. We work closely with you to understand and exceed your expectations.',
  },
  {
    icon: Building2,
    title: 'Complete Digital Services Under One Roof',
    description:
      'From marketing to development, get all your digital needs fulfilled by a single trusted partner.',
  },
];

const FeatureCard = ({ feature, index }) => {
  const IconComponent = feature.icon;

  return (
    <ScrollReveal direction="up" delay={index * 0.1}>
      <div className="glass-card rounded-xl p-6 relative overflow-hidden group h-full">
        {/* Gold corner accent */}
        <div
          className="absolute top-0 right-0 w-20 h-20"
          style={{
            background:
              'linear-gradient(225deg, rgba(212,175,55,0.08) 0%, transparent 60%)',
          }}
        />

        <div className="w-16 h-16 rounded-2xl bg-brand-gold/10 flex items-center justify-center mb-4 group-hover:bg-brand-gold/20 transition-colors duration-300">
          <IconComponent
            size={28}
            className="text-brand-gold group-hover:scale-110 transition-transform duration-300"
          />
        </div>

        <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
        <p className="text-brand-grey text-sm leading-relaxed">{feature.description}</p>

        {/* Bottom gold line */}
        <div className="w-0 group-hover:w-12 h-0.5 bg-brand-gold transition-all duration-500 mt-4 rounded-full" />
      </div>
    </ScrollReveal>
  );
};

const WhyChooseUs = () => {
  return (
    <section id="why-choose" className="section-padding bg-brand-charcoal">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Why Choose Advyntra?"
          subtitle="What makes us the right partner for your digital journey"
          gold
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
