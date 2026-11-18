import React from 'react';
import { ClipboardList, Lightbulb, Code, RefreshCw, Rocket } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import ScrollReveal from '../components/ScrollReveal';

const steps = [
  {
    num: 1,
    icon: ClipboardList,
    title: 'Understand Your Requirements',
    description:
      'We start by listening to your needs, understanding your business, and defining clear project objectives.',
  },
  {
    num: 2,
    icon: Lightbulb,
    title: 'Plan the Best Solution',
    description:
      'Our team develops a comprehensive strategy and roadmap tailored to achieve your goals effectively.',
  },
  {
    num: 3,
    icon: Code,
    title: 'Design & Development',
    description:
      'We bring the plan to life with creative design and robust development using modern technologies.',
  },
  {
    num: 4,
    icon: RefreshCw,
    title: 'Review & Improvements',
    description:
      'We refine and optimize based on your feedback, ensuring every detail meets the highest standards.',
  },
  {
    num: 5,
    icon: Rocket,
    title: 'Final Delivery & Support',
    description:
      'We deliver the final product and provide ongoing support to ensure continued success.',
  },
];

const Process = () => {
  return (
    <section className="section-padding bg-brand-black">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Our Working Process"
          subtitle="A streamlined approach to delivering exceptional results"
          gold
        />

        {/* Desktop horizontal timeline */}
        <div className="hidden lg:block mt-16 relative">
          {/* Connecting line */}
          <div className="absolute top-[60px] left-[10%] right-[10%] h-0.5 bg-brand-gold/30" />

          <div className="flex justify-between relative">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <ScrollReveal key={index} direction="up" delay={index * 0.15}>
                  <div className="flex flex-col items-center text-center w-48">
                    {/* Icon */}
                    <div className="mb-3">
                      <IconComponent size={24} className="text-brand-gold" />
                    </div>

                    {/* Number circle */}
                    <div className="w-12 h-12 rounded-full bg-brand-gold text-brand-black font-bold flex items-center justify-center text-lg relative z-10 mb-4">
                      {step.num}
                    </div>

                    {/* Title */}
                    <h3 className="text-white font-semibold text-sm mb-2">{step.title}</h3>

                    {/* Description */}
                    <p className="text-brand-grey text-xs leading-relaxed">{step.description}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        {/* Mobile vertical timeline */}
        <div className="lg:hidden mt-12 relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-brand-gold/30" />

          <div className="space-y-10">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <ScrollReveal key={index} direction="left" delay={index * 0.1}>
                  <div className="flex gap-6 items-start relative">
                    {/* Circle on line */}
                    <div className="w-12 h-12 rounded-full bg-brand-gold text-brand-black font-bold flex items-center justify-center text-lg flex-shrink-0 relative z-10">
                      {step.num}
                    </div>

                    {/* Content */}
                    <div className="pt-1">
                      <div className="flex items-center gap-2 mb-1">
                        <IconComponent size={18} className="text-brand-gold" />
                        <h3 className="text-white font-semibold">{step.title}</h3>
                      </div>
                      <p className="text-brand-grey text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
