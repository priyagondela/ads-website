import React from "react";
import { Lightbulb, Palette, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading";
import ScrollReveal from "../components/ScrollReveal";

const highlights = [
  { icon: Lightbulb, label: "Innovation" },
  { icon: Palette, label: "Creativity" },
  { icon: TrendingUp, label: "Growth" },
];

const About = () => {
  return (
    <section id="about" className="section-padding bg-brand-black">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Who We Are" gold={true} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <ScrollReveal direction="left">
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Advyntra Digital Services is a creative digital and technology
              solutions company dedicated to helping businesses grow in the
              digital world. We combine creativity, technology, and innovation to
              deliver effective digital solutions that help brands build their
              identity, reach more customers, and achieve growth.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              From digital marketing and branding to website development, mobile
              applications, and customized software, we turn ideas into
              meaningful digital experiences.
            </p>

            <div className="grid grid-cols-3 gap-4 mt-8">
              {highlights.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="glass-card rounded-lg p-4 text-center"
                >
                  <Icon className="text-brand-gold mb-2 mx-auto" size={28} />
                  <span className="text-sm font-semibold">{label}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Right Column - Logo Card */}
          <ScrollReveal direction="right">
            <div className="glass-card rounded-2xl p-8 relative gold-glow">
              <img
                src="/logo.jpg"
                alt="Advyntra Digital Services"
                className="w-full max-w-sm mx-auto"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default About;
