
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Book, GraduationCap, BarChart, Calendar, MessageCircle, ChartLine, FileText, Calculator, School, UserIcon } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { path: '/', label: 'Home', icon: <Book className="w-5 h-5 mr-2" /> },
    { path: '/dashboard', label: 'My Subjects', icon: <GraduationCap className="w-5 h-5 mr-2" /> },
    { path: '/analytics', label: 'Learning Analytics', icon: <BarChart className="w-5 h-5 mr-2" /> },
    { path: '/schedule', label: 'Study Schedule', icon: <Calendar className="w-5 h-5 mr-2" /> },
    { path: '/ai-tutor', label: 'AI Tutor', icon: <MessageCircle className="w-5 h-5 mr-2" /> },
    { path: '/explain-to-me', label: 'Concept Explainer', icon: <School className="w-5 h-5 mr-2" /> },
    { path: '/essay-analysis', label: 'Essay Feedback', icon: <FileText className="w-5 h-5 mr-2" /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 dark:bg-card/80 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-blue to-teal flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xl">A+</span>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-white dark:bg-background rounded-full border-2 border-blue animate-pulse-soft"></div>
          </div>
          <span className="text-xl font-bold text-gradient">AI+ Education</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${
                isActive(link.path) ? 'text-blue font-medium after:w-full' : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link 
            to="/profile" 
            className="ml-4 p-2 rounded-full hover:bg-muted transition-colors duration-300"
            aria-label="User Profile"
          >
            <UserIcon className="w-5 h-5" />
          </Link>
        </nav>
        
        <button 
          className="md:hidden p-2 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>
      
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-background/95 dark:bg-background/95 backdrop-blur-md pt-20 px-4 animate-fade-in">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center py-3 px-4 rounded-xl transition-colors duration-300 ${
                  isActive(link.path) 
                    ? 'bg-blue/10 text-blue font-medium' 
                    : 'hover:bg-muted'
                }`}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
            <div className="border-t border-border my-4"></div>
            <Link
              to="/profile"
              className="flex items-center py-3 px-4 rounded-xl transition-colors duration-300 hover:bg-muted"
            >
              <UserIcon className="w-5 h-5 mr-2" />
              Profile
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
