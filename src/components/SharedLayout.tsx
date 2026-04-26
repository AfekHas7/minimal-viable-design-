import React, { ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, MessageCircle, Mail, Instagram } from 'lucide-react';
import logoImg from '../assets/logoVwhitoutslogen.png';

export const Section = ({ 
  children, 
  className = "", 
  id,
  bg = "white" 
}: { 
  children: ReactNode; 
  className?: string; 
  id?: string;
  bg?: "white" | "light" | "primary" | "dark";
}) => {
  const bgColors = {
    white: "bg-white",
    light: "bg-bg-light",
    primary: "bg-primary text-white",
    dark: "bg-slate-900 text-white"
  };

  return (
    <section id={id} className={`py-16 md:py-24 px-6 ${bgColors[bg]} ${className}`}>
      <div className="max-w-5xl mx-auto">
        {children}
      </div>
    </section>
  );
};

export const Footer = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <footer className="relative pt-16 md:pt-20 pb-6 md:pb-8 px-6 border-t border-slate-100 text-center mt-12 md:mt-16">
        <div className="absolute left-1/2 -translate-x-1/2 -top-12 md:-top-16">
          <Link to="/" className="inline-block hover:opacity-80 transition-opacity">
            <img src={logoImg} alt="מסע" className="h-24 md:h-32 w-auto object-contain mix-blend-multiply bg-transparent outline-none border-none shadow-none" />
          </Link>
        </div>
        <p className="text-slate-400 text-sm mb-6">
          © 2026 עוצמה שקטה מבית מסע · כל הזכויות שמורות
        </p>
        <div className="flex justify-center gap-8 text-sm font-bold text-slate-400">
          <Link to="/terms" className="hover:text-primary transition-colors">תקנון</Link>
          <Link to="/privacy" className="hover:text-primary transition-colors">מדיניות ופרטיות</Link>
          <button 
            onClick={() => setIsContactOpen(true)} 
            className="hover:text-primary transition-colors text-slate-400 font-bold"
          >
            צור קשר
          </button>
        </div>
      </footer>

      <AnimatePresence>
        {isContactOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsContactOpen(false)}
              className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm"
            />
            
            <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-6 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, y: 100, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 100, scale: 0.95 }}
                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                className="w-full md:w-auto md:min-w-[400px] bg-white rounded-t-3xl md:rounded-3xl shadow-2xl pointer-events-auto overflow-hidden flex flex-col"
              >
                <div className="p-6 md:p-8 flex-1">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold tracking-tight text-primary">
                      יש לך שאלה? אנחנו כאן בשבילך
                    </h3>
                    <button 
                      onClick={() => setIsContactOpen(false)}
                      className="w-10 h-10 flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-colors cursor-pointer"
                      aria-label="סגור"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <a 
                      href="https://wa.me/972507873083" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-[#25D366]/10 text-slate-700 hover:text-[#25D366] transition-all group"
                    >
                      <div className="w-12 h-12 bg-white flex items-center justify-center rounded-xl shadow-sm text-slate-400 group-hover:text-[#25D366] transition-colors">
                        <MessageCircle className="w-6 h-6" />
                      </div>
                      <span className="font-bold text-lg">שלח הודעה בוואטסאפ</span>
                    </a>

                    <a 
                      href="mailto:masapnimi7@gmail.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-primary/10 text-slate-700 hover:text-primary transition-all group"
                    >
                      <div className="w-12 h-12 bg-white flex items-center justify-center rounded-xl shadow-sm text-slate-400 group-hover:text-primary transition-colors">
                        <Mail className="w-6 h-6" />
                      </div>
                      <span className="font-bold text-lg">שלח מייל</span>
                    </a>

                    <a 
                      href="https://instagram.com/masa.program" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-[#E1306C]/10 text-slate-700 hover:text-[#E1306C] transition-all group"
                    >
                      <div className="w-12 h-12 bg-white flex items-center justify-center rounded-xl shadow-sm text-slate-400 group-hover:text-[#E1306C] transition-colors">
                        <Instagram className="w-6 h-6" />
                      </div>
                      <span className="font-bold text-lg">מעבר לאינסטגרם</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
