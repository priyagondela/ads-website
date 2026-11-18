import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Loader2,
  CheckCircle,
  AlertCircle,
  MessageCircle,
  MapPin,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { submitEnquiry } from '../firebase/firestore';
import SectionHeading from '../components/SectionHeading';
import ScrollReveal from '../components/ScrollReveal';

const serviceOptions = [
  'Digital Marketing',
  'Creative Design & Branding',
  'Video & AI Advertising',
  'Website Development',
  'Mobile App Development',
  'Custom Software Solutions',
  'Other',
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const lastSubmitTime = useRef(0);

  // Listen for service preselection from Services section
  useEffect(() => {
    const handlePreselect = (e) => {
      setFormData((prev) => ({ ...prev, service: e.detail }));
    };
    window.addEventListener('preselectService', handlePreselect);
    return () => window.removeEventListener('preselectService', handlePreselect);
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = 'Please enter your full name (at least 2 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    const phoneRegex = /^(\+91[\s-]?)?[6-9]\d{9}$/;
    if (!formData.phone || !phoneRegex.test(formData.phone.replace(/[\s-]/g, ''))) {
      newErrors.phone = 'Please enter a valid Indian phone number.';
    }

    if (!formData.service) {
      newErrors.service = 'Please select a service.';
    }

    if (!formData.message || formData.message.trim().length < 10) {
      newErrors.message = 'Please enter a message (at least 10 characters).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSuccess(false);

    // Rate limiting
    const now = Date.now();
    if (now - lastSubmitTime.current < 60000) {
      setSubmitError('Please wait a moment before submitting again.');
      return;
    }

    if (!validateForm()) return;

    setLoading(true);
    try {
      await submitEnquiry({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        service: formData.service,
        message: formData.message.trim(),
      });
      lastSubmitTime.current = Date.now();
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error('Submit error:', err);
      setSubmitError('Something went wrong. Please try again or contact us via WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full bg-brand-black/50 border border-brand-gold/20 rounded-lg px-4 py-3 text-white placeholder-brand-grey/50 focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold/50 transition duration-200';

  return (
    <section id="contact" className="section-padding bg-brand-charcoal">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Let's Build Something Great Together!"
          subtitle="Have an idea or looking for digital solutions for your business? Let's discuss how Advyntra can help you grow."
          gold
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          {/* Contact Form */}
          <ScrollReveal direction="left">
            <div className="glass-card rounded-2xl p-6 sm:p-8">
              <form onSubmit={handleSubmit} noValidate>
                <div className="space-y-5">
                  {/* Name */}
                  <div>
                    <label className="text-sm font-medium text-brand-grey mb-1 block">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className={inputClass}
                      required
                    />
                    {errors.name && (
                      <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-sm font-medium text-brand-grey mb-1 block">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      className={inputClass}
                      required
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="text-sm font-medium text-brand-grey mb-1 block">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                      className={inputClass}
                      required
                    />
                    {errors.phone && (
                      <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
                    )}
                  </div>

                  {/* Service */}
                  <div>
                    <label className="text-sm font-medium text-brand-grey mb-1 block">
                      Select a Service
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className={inputClass}
                      required
                    >
                      <option value="" disabled>
                        Select a Service
                      </option>
                      {serviceOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    {errors.service && (
                      <p className="text-red-400 text-xs mt-1">{errors.service}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="text-sm font-medium text-brand-grey mb-1 block">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project or idea..."
                      rows={4}
                      className={`${inputClass} resize-none`}
                      required
                    />
                    {errors.message && (
                      <p className="text-red-400 text-xs mt-1">{errors.message}</p>
                    )}
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} className="mr-2" />
                      Send Message
                    </>
                  )}
                </button>

                {/* Success */}
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-green-400 mt-4 p-3 bg-green-400/10 rounded-lg"
                  >
                    <CheckCircle size={18} />
                    <span className="text-sm">
                      Your message has been sent successfully! We'll get back to you soon.
                    </span>
                  </motion.div>
                )}

                {/* Error */}
                {submitError && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-red-400 mt-4 p-3 bg-red-400/10 rounded-lg"
                  >
                    <AlertCircle size={18} />
                    <span className="text-sm">{submitError}</span>
                  </motion.div>
                )}
              </form>
            </div>
          </ScrollReveal>

          {/* Contact Info */}
          <ScrollReveal direction="right">
            <div className="space-y-6">
              <div className="glass-card rounded-2xl p-6 sm:p-8">
                <h3 className="font-bold text-xl text-white">ADVYNTRA DIGITAL SERVICES</h3>
                <p className="text-brand-gold text-xs tracking-[0.3em] mt-1">
                  INNOVATE • CREATE • GROW
                </p>

                <div className="w-full h-px bg-brand-gold/20 my-6" />

                <div className="space-y-4">
                  <a
                    href="https://wa.me/917671827725"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-3 items-start group"
                  >
                    <MessageCircle
                      size={20}
                      className="text-brand-gold flex-shrink-0 mt-0.5"
                    />
                    <span className="text-brand-grey text-sm group-hover:text-brand-gold transition-colors">
                      +91 76718 27725
                    </span>
                  </a>

                  <div className="flex gap-3 items-start">
                    <MapPin size={20} className="text-brand-gold flex-shrink-0 mt-0.5" />
                    <span className="text-brand-grey text-sm">
                      12-258, Ramalayam Street, ASR Colony, Turangi, Kakinada, Andhra Pradesh
                      – 533001, India
                    </span>
                  </div>
                </div>

                <a
                  href="https://wa.me/917671827725"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full mt-6"
                >
                  <MessageCircle size={18} className="mr-2" />
                  Chat on WhatsApp
                </a>
              </div>

              <div className="glass-card rounded-xl p-4 text-center border border-brand-gold/20">
                <p className="text-brand-grey text-sm">
                  💬 We typically respond within 24 hours
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
