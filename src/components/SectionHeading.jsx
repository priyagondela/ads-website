import React from 'react';

const SectionHeading = ({ title, subtitle, centered = true, gold = false }) => {
  return (
    <div className={centered ? 'text-center' : ''}>
      <h2
        className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 ${
          gold ? 'gold-gradient' : 'text-white'
        }`}
      >
        {title}
      </h2>
      <div
        className={`w-20 h-1 bg-brand-gold rounded-full ${
          centered ? 'mx-auto' : 'mx-0'
        }`}
      />
      {subtitle && (
        <p
          className={`text-brand-grey text-lg mt-4 max-w-2xl ${
            centered ? 'mx-auto' : ''
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
