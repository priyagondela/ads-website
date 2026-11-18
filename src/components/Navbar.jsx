import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Our Work", href: "#portfolio" },
  { label: "Why Choose Us", href: "#why-choose" },
  { label: "Contact Us", href: "#contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Track scroll position for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver to detect which section is in view
  useEffect(() => {
    const sectionIds = navLinks.map((link) => link.href.slice(1));
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  return (
    <nav
      className={`sticky top-0 z-40 border-b border-brand-gold/10 backdrop-blur-md transition-colors duration-300 ${
        scrolled ? "bg-brand-black/90" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        {/* Logo */}
        <a href="#home" onClick={(e) => handleLinkClick(e, "#home")}>
          <img src="/logo.jpg" alt="Advyntra" className="h-10 w-auto" />
        </a>

        {/* Desktop Links */}
        <div className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => {
            const id = link.href.slice(1);
            const isActive = activeSection === id;
            return (
              <a
                key={id}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`relative text-sm font-medium transition ${
                  isActive
                    ? "text-brand-gold"
                    : "text-brand-grey hover:text-brand-gold"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-brand-gold" />
                )}
              </a>
            );
          })}

          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, "#contact")}
            className="btn-primary"
          >
            Get Started
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="text-brand-grey lg:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full flex-col bg-brand-black/95 px-6 pt-24 lg:hidden"
          >
            {/* Close button inside panel */}
            <button
              className="absolute right-4 top-5 text-brand-grey"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X size={28} />
            </button>

            {navLinks.map((link) => {
              const id = link.href.slice(1);
              const isActive = activeSection === id;
              return (
                <a
                  key={id}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`border-b border-brand-gold/10 py-3 text-lg font-medium transition ${
                    isActive
                      ? "text-brand-gold"
                      : "text-brand-grey hover:text-brand-gold"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}

            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, "#contact")}
              className="btn-primary mt-6 text-center"
            >
              Get Started
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
