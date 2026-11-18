import React from 'react';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Services from '../sections/Services';
import Portfolio from '../sections/Portfolio';
import WhyChooseUs from '../sections/WhyChooseUs';
import Process from '../sections/Process';
import Contact from '../sections/Contact';

const HomePage = () => {
  return (
    <main className="overflow-hidden">
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <WhyChooseUs />
      <Process />
      <Contact />
    </main>
  );
};

export default HomePage;
