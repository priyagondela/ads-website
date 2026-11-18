import React from "react";
import { MapPin, MessageCircle, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About Us", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Our Work", href: "#work" },
    { name: "Contact Us", href: "#contact" },
  ];

  const services = [
    "Digital Marketing",
    "Creative Design",
    "Video & AI",
    "Web Development",
    "Mobile Apps",
    "Software Solutions",
  ];

  return (
    <footer className="bg-brand-charcoal border-t border-brand-gold/10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1 - Brand */}
          <div className="space-y-4">
            <img src="/logo.png" alt="Advyntra Digital Services" className="h-12" />
            <p className="text-brand-gold text-xs tracking-[0.3em] font-medium">
              INNOVATE . CREATE . GROW
            </p>
            <p className="text-white/60 text-sm leading-relaxed">
              Creative digital solutions company dedicated to helping businesses
              grow in the digital world.
            </p>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h4 className="text-brand-gold font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-brand-gold transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Services */}
          <div>
            <h4 className="text-brand-gold font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-white/60 text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h4 className="text-brand-gold font-semibold mb-4">Get In Touch</h4>
            <div className="space-y-4">
              <a
                href="https://wa.me/917671827725"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/60 hover:text-brand-gold transition-colors text-sm"
              >
                <MessageCircle className="w-5 h-5 text-brand-gold flex-shrink-0" />
                +91 76718 27725
              </a>

              <div className="flex items-start gap-3 text-white/60 text-sm">
                <MapPin className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                <span>12-258, Ramalayam Street, ASR Colony, Turangi, Kakinada, Andhra Pradesh – 533001, India</span>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <a href="#" className="text-white/60 hover:text-brand-gold transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-white/60 hover:text-brand-gold transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-white/60 hover:text-brand-gold transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-white/60 hover:text-brand-gold transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-brand-gold/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/60 text-sm">
            © 2026 Advyntra Digital Services. All Rights Reserved.
          </p>
          <p className="text-brand-grey text-sm font-medium tracking-wider">
            ADVYNTRA DIGITAL SERVICES
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
