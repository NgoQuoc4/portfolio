import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GitBranch, ExternalLink, Mail, User, Code, Send, MapPin, Phone } from 'lucide-react';
import emailjs from '@emailjs/browser';
import Navbar from '../components/Navbar';
import api from '../services/api';
import { LanguageContext } from '../context/LanguageContext';
import { PortfolioContext } from '../context/PortfolioContext';

const Home = () => {
  const { t } = React.useContext(LanguageContext);
  const { projects, profile } = React.useContext(PortfolioContext);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState(null);

  // Safe fallbacks for display
  const p_name = profile?.name || "Nguyễn Văn A";
  const p_title = profile?.title || "Full-stack Developer";
  const p_avatar = profile?.avatar_url || "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?auto=format&fit=crop&w=800&q=80";
  const p_location = profile?.location || "TP. Hồ Chí Minh, Việt Nam";
  const p_email = profile?.email || "contact@example.com";
  const p_phone = profile?.phone || "+84 123 456 789";
  const p_about1 = profile?.about_text_1 || t('hero_desc');
  const p_about2 = profile?.about_text_2;
  const p_skills = profile?.skills?.length ? profile.skills : ['React.js', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS'];

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1. Save to database (as before)
      await api.post('/messages', formData);

      // 2. Send email via EmailJS
      // Replace these placeholders with your actual EmailJS keys
      const SERVICE_ID = 'service_t8i2irb';
      const TEMPLATE_ID = 'template_oxg03rp';
      const PUBLIC_KEY = 'wnkgezVAD2gezpEr2';

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: 'Admin', // Or your name
      };

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);

      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus(null), 3000);
    } catch (error) {
      console.error('Submission error:', error);
      setFormStatus('error');
    }
  };

  return (
    <div className="min-h-screen pt-20 font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative px-4 py-32 md:py-52 flex items-center justify-center overflow-hidden">
        {/* Neumorphic Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.05, 1], rotate: [0, 90, 180, 360] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="absolute rounded-full shadow-extruded w-[600px] h-[600px] border-[20px] border-neo-bg opacity-30"
          />
          <motion.div
            animate={{ scale: [1, 0.95, 1], rotate: [360, 180, 90, 0] }}
            transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
            className="absolute rounded-full shadow-inset-deep w-[400px] h-[400px] border-[20px] border-neo-bg opacity-30"
          />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-neo-bg shadow-extruded-small text-neo-fg text-sm font-bold mb-10 whitespace-nowrap"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
            {t('hero_available')}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold font-display tracking-tight mb-8 text-neo-fg leading-[1.1]"
          >
            {t('hero_hi')} <span className="relative whitespace-nowrap text-neo-accent">
              <span className="relative z-10">{p_name && typeof p_name === 'string' ? (p_name.split(' ')[p_name.split(' ').length - 1] || 'a') : 'a'}</span>
            </span>
            <br className="hidden md:block" />
            <span className="text-neo-fg">
              {p_title}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="text-xl md:text-2xl text-neo-muted mb-16 max-w-3xl mx-auto leading-relaxed font-medium"
          >
            {p_about1}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-6 justify-center mt-10"
          >
            <a href="#projects" className="inline-flex items-center justify-center gap-2 px-10 py-5 text-lg font-bold bg-neo-accent text-white rounded-2xl shadow-[5px_5px_10px_rgba(163,177,198,0.6),-5px_-5px_10px_rgba(255,255,255,0.5)] hover:-translate-y-[1px] hover:shadow-[7px_7px_15px_rgba(163,177,198,0.7),-7px_-7px_15px_rgba(255,255,255,0.6)] active:translate-y-[0.5px] active:shadow-[inset_5px_5px_10px_rgba(0,0,0,0.2),inset_-5px_-5px_10px_rgba(255,255,255,0.1)] transition-all duration-300">
              {t('hero_btn_projects')} <Code size={20} />
            </a>
            <a href="#about" className="inline-flex items-center justify-center gap-2 px-10 py-5 text-lg font-bold bg-neo-bg text-neo-fg rounded-2xl shadow-extruded hover:-translate-y-[1px] hover:shadow-extruded-hover active:translate-y-[0.5px] active:shadow-inset transition-all duration-300 group">
              {t('hero_btn_about')}
              <User size={20} className="group-hover:text-neo-accent transition-colors" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            {/* Avatar & Basic Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:w-1/3 flex flex-col items-center text-center"
            >
              <div className="p-4 rounded-[40px] shadow-extruded mb-8 inline-block">
                <div className="w-64 h-64 rounded-[32px] overflow-hidden shadow-inset-deep">
                  <img src={p_avatar} alt="Avatar" className="w-full h-full object-cover" />
                </div>
              </div>
              <h3 className="text-3xl font-bold font-display text-neo-fg mb-2">{p_name}</h3>
              <p className="text-neo-accent font-bold mb-8">{p_title}</p>

              <div className="w-full p-8 rounded-[32px] shadow-inset-deep space-y-6 text-left">
                <div className="flex items-center gap-4 text-neo-fg font-medium">
                  <div className="p-3 shadow-extruded-small rounded-xl text-neo-accent"><MapPin size={20} /></div>
                  <span>{p_location}</span>
                </div>
                <div className="flex items-center gap-4 text-neo-fg font-medium">
                  <div className="p-3 shadow-extruded-small rounded-xl text-neo-accent"><Mail size={20} /></div>
                  <span>{p_email}</span>
                </div>
                <div className="flex items-center gap-4 text-neo-fg font-medium">
                  <div className="p-3 shadow-extruded-small rounded-xl text-neo-accent"><Phone size={20} /></div>
                  <span>{p_phone}</span>
                </div>
              </div>
            </motion.div>

            {/* Description & Skills */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:w-2/3"
            >
              <h2 className="text-4xl md:text-5xl font-extrabold font-display mb-8 text-neo-fg">{t('about_title')}</h2>
              <div className="text-neo-muted leading-relaxed space-y-5 text-lg mb-12">
                <p>{p_about1}</p>
                {p_about2 && <p>{p_about2}</p>}
              </div>

              <h3 className="text-2xl font-bold font-display mb-8 text-neo-fg">{t('about_skills')}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {p_skills && Array.isArray(p_skills) && p_skills.map((skill, index) => (
                  <div key={index} className="flex items-center justify-center p-5 rounded-2xl shadow-extruded text-neo-fg font-bold hover:-translate-y-[1px] hover:shadow-extruded-hover transition-all duration-300 cursor-default">
                    {skill}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-extrabold font-display mb-16 text-center text-neo-fg">{t('projects_title')}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.length > 0 ? projects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group rounded-[32px] overflow-hidden bg-neo-bg shadow-extruded hover:-translate-y-[2px] hover:shadow-extruded-hover transition-all duration-300"
              >
                <div className="aspect-video relative overflow-hidden shadow-inset m-4 rounded-[24px]">
                  {project.image_url ? (
                    <img src={project.image_url} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-neo-muted font-bold">{t('projects_no_image')}</div>
                  )}
                </div>
                <div className="p-8 pt-4">
                  <h3 className="text-2xl font-bold font-display text-neo-fg mb-3">{project.title}</h3>
                  <p className="text-neo-muted mb-6 line-clamp-3 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-3 mb-8">
                    {project.tech_stack && Array.isArray(project.tech_stack) && project.tech_stack.map((tech, i) => (
                      <span key={i} className="px-4 py-2 text-xs font-bold text-neo-accent shadow-extruded-small rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    {project.github_link && (
                      <a href={project.github_link} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-neo-fg shadow-extruded-small rounded-2xl hover:shadow-extruded-hover hover:-translate-y-[1px] active:shadow-inset transition-all">
                        <GitBranch size={18} /> {t('projects_code')}
                      </a>
                    )}
                    {project.live_demo && (
                      <a href={project.live_demo} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-neo-accent shadow-extruded-small rounded-2xl hover:shadow-extruded-hover hover:-translate-y-[1px] active:shadow-inset transition-all">
                        <ExternalLink size={18} /> {t('projects_demo')}
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            )) : (
              <p className="col-span-full text-center text-gray-500 py-10">{t('projects_empty')}</p>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold font-display mb-4 text-neo-fg">{t('contact_title')}</h2>
            <p className="text-lg text-neo-muted font-medium">{t('contact_desc')}</p>
          </div>

          <motion.form
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            onSubmit={handleContactSubmit}
            className="space-y-8 p-10 rounded-[32px] shadow-extruded"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-sm font-bold text-neo-fg flex items-center gap-2"><User size={16} /> {t('contact_name')}</label>
                <input
                  type="text" required
                  value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-6 py-4 rounded-2xl bg-neo-bg shadow-inset-deep text-neo-fg focus:outline-none focus:ring-2 focus:ring-neo-accent focus:ring-offset-2 transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-bold text-neo-fg flex items-center gap-2"><Mail size={16} /> {t('contact_email')}</label>
                <input
                  type="email" required
                  value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-6 py-4 rounded-2xl bg-neo-bg shadow-inset-deep text-neo-fg focus:outline-none focus:ring-2 focus:ring-neo-accent focus:ring-offset-2 transition-all"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            <div className="space-y-4">
              <label className="text-sm font-bold text-neo-fg">{t('contact_msg')}</label>
              <textarea
                required rows="5"
                value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-6 py-4 rounded-2xl bg-neo-bg shadow-inset-deep text-neo-fg focus:outline-none focus:ring-2 focus:ring-neo-accent focus:ring-offset-2 transition-all resize-none"
                placeholder={t('contact_msg')}
              ></textarea>
            </div>

            <button type="submit" className="w-full flex items-center justify-center gap-3 px-8 py-5 font-bold text-white bg-neo-accent rounded-2xl shadow-extruded hover:-translate-y-[1px] hover:shadow-extruded-hover active:translate-y-[0.5px] active:shadow-inset transition-all duration-300">
              {t('contact_btn')} <Send size={18} />
            </button>

            {formStatus === 'success' && <p className="text-green-500 text-center font-medium mt-4">{t('contact_success')}</p>}
            {formStatus === 'error' && <p className="text-red-500 text-center font-medium mt-4">{t('contact_error')}</p>}
          </motion.form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-neo-muted font-bold">
        <p>{t('footer_rights')}</p>
      </footer>
    </div>
  );
};

export default Home;
