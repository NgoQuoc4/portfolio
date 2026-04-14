import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LanguageContext } from '../context/LanguageContext';
import { Briefcase, Code, Terminal, LogOut, Globe } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { lang, toggleLanguage, t } = useContext(LanguageContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed w-full z-50 top-0 left-0 bg-neo-bg/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center gap-2 text-2xl font-extrabold font-display text-neo-fg">
            <div className="p-2 rounded-2xl shadow-inset bg-neo-bg">
              <Terminal className="text-neo-accent" size={24} />
            </div>
            <span>DevFolio</span>
          </Link>
          
          <div className="hidden md:flex space-x-8 items-center">
            <a href="#about" className="text-neo-muted hover:text-neo-accent transition-colors font-medium">{t('nav_about')}</a>
            <a href="#projects" className="text-neo-muted hover:text-neo-accent transition-colors font-medium">{t('nav_projects')}</a>
            <a href="#contact" className="text-neo-muted hover:text-neo-accent transition-colors font-medium">{t('nav_contact')}</a>
            
            <button 
              onClick={toggleLanguage} 
              className="flex items-center gap-2 px-4 py-2 rounded-2xl font-bold text-sm text-neo-fg shadow-extruded-small hover:shadow-extruded-hover active:shadow-inset transition-all"
              title="Change Language"
            >
              <Globe size={18} className="text-neo-accent" /> {lang.toUpperCase()}
            </button>

            {user ? (
              <div className="flex items-center space-x-4 pl-8 relative before:absolute before:left-0 before:top-2 before:bottom-2 before:w-[2px] before:bg-neo-bg before:shadow-[inset_1px_1px_2px_rgba(163,177,198,0.5),inset_-1px_-1px_2px_rgba(255,255,255,0.5)]">
                <Link to="/admin/dashboard" className="flex items-center gap-2 text-sm font-bold text-neo-fg hover:text-neo-accent transition-colors px-4 py-2 rounded-2xl shadow-extruded-small active:shadow-inset">
                  <Briefcase size={16} /> {t('nav_dashboard')}
                </Link>
                <button onClick={handleLogout} className="flex items-center gap-2 text-sm font-bold text-red-500 hover:text-red-400 transition-colors px-4 py-2 rounded-2xl shadow-extruded-small active:shadow-inset">
                  <LogOut size={16} /> {t('nav_logout')}
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4 pl-8 relative before:absolute before:left-0 before:top-2 before:bottom-2 before:w-[2px] before:bg-neo-bg before:shadow-[inset_1px_1px_2px_rgba(163,177,198,0.5),inset_-1px_-1px_2px_rgba(255,255,255,0.5)]">
                <Link to="/admin/login" className="px-6 py-2 rounded-2xl text-sm font-bold bg-neo-bg text-neo-accent shadow-extruded hover:shadow-extruded-hover hover:-translate-y-[1px] active:translate-y-[0.5px] active:shadow-inset transition-all">{t('nav_login')}</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
