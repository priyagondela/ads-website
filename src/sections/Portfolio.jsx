import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, FolderOpen, ExternalLink } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import ScrollReveal from '../components/ScrollReveal';
import { getProjects } from '../firebase/firestore';

const categories = [
  'All',
  'Websites',
  'Mobile Applications',
  'Branding & Logos',
  'Graphic Designs',
  'Promotional Videos',
  'Digital Marketing',
];

const placeholderProjects = [
  { id: 'p1', title: 'Coming Soon', category: 'Websites', description: 'Website project coming soon' },
  { id: 'p2', title: 'Coming Soon', category: 'Mobile Applications', description: 'Mobile app project coming soon' },
  { id: 'p3', title: 'Coming Soon', category: 'Branding & Logos', description: 'Branding project coming soon' },
  { id: 'p4', title: 'Coming Soon', category: 'Graphic Designs', description: 'Graphic design project coming soon' },
  { id: 'p5', title: 'Coming Soon', category: 'Promotional Videos', description: 'Video project coming soon' },
  { id: 'p6', title: 'Coming Soon', category: 'Digital Marketing', description: 'Digital marketing project coming soon' },
];

const PortfolioCard = ({ project }) => {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="glass-card rounded-xl overflow-hidden group"
      >
        <div className="aspect-video bg-brand-charcoal relative overflow-hidden flex items-center justify-center">
          {project.coverImage ? (
            <img
              src={project.coverImage}
              alt={project.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <FolderOpen size={48} className="text-brand-gold/30" />
          )}
          <div className="absolute inset-0 bg-brand-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button
              onClick={() => setShowDetail(true)}
              className="btn-outline text-sm flex items-center gap-2"
            >
              <Eye size={16} />
              View Project
            </button>
          </div>
        </div>
        <div className="p-4">
          <span className="text-xs text-brand-gold bg-brand-gold/10 px-2 py-1 rounded-full inline-block mb-2">
            {project.category}
          </span>
          <h3 className="text-lg font-semibold text-white">{project.title}</h3>
          <p className="text-sm text-brand-grey line-clamp-2 mt-1">{project.description}</p>
        </div>
      </motion.div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {showDetail && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setShowDetail(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6"
              onClick={(e) => e.stopPropagation()}
            >
              {project.coverImage && (
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full rounded-xl object-cover mb-4"
                  style={{ maxHeight: 300 }}
                />
              )}
              <span className="text-xs text-brand-gold bg-brand-gold/10 px-2 py-1 rounded-full">
                {project.category}
              </span>
              <h2 className="text-2xl font-bold text-white mt-3">{project.title}</h2>
              <p className="text-brand-grey mt-3 leading-relaxed">{project.description}</p>

              {/* Additional images */}
              {project.images && project.images.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {project.images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`${project.title} ${i + 1}`}
                      className="w-full rounded-lg object-cover"
                      loading="lazy"
                    />
                  ))}
                </div>
              )}

              {project.projectUrl && (
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary mt-4 inline-flex"
                >
                  <ExternalLink size={16} className="mr-2" />
                  Visit Project
                </a>
              )}

              <button
                onClick={() => setShowDetail(false)}
                className="btn-outline w-full mt-4"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const firestoreProjects = await getProjects();
        if (firestoreProjects.length > 0) {
          setProjects(firestoreProjects);
        } else {
          setProjects(placeholderProjects);
        }
      } catch (err) {
        // Firestore not available yet, use placeholders
        console.log('Using placeholder projects');
        setProjects(placeholderProjects);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="section-padding bg-brand-black">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Our Work"
          subtitle="Showcasing our best projects and creative solutions"
          gold
        />

        {/* Category Filters */}
        <div className="flex overflow-x-auto gap-2 pb-4 mt-10 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-brand-gold text-brand-black'
                  : 'bg-brand-charcoal text-brand-grey hover:text-brand-gold border border-brand-gold/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-card rounded-xl overflow-hidden animate-pulse">
                <div className="aspect-video bg-brand-charcoal" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-brand-charcoal rounded w-20" />
                  <div className="h-5 bg-brand-charcoal rounded w-32" />
                  <div className="h-3 bg-brand-charcoal rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <PortfolioCard key={project.id} project={project} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {!loading && filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <FolderOpen size={48} className="text-brand-gold/30 mx-auto mb-4" />
            <p className="text-brand-grey">No projects in this category yet.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
