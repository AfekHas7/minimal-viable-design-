/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, 
  ChevronDown, 
  ArrowLeft, 
  ShieldCheck, 
  Clock, 
  Zap, 
  Target, 
  Users, 
  MessageCircle, 
  Lock, 
  Star,
  Info,
  HelpCircle,
  X,
  Brain,
  Heart,
  RefreshCw,
  CheckCircle
} from 'lucide-react';

const PsychologicalLoop = () => {
  const steps = [
    { label: "מחשבה", icon: Brain, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "פרשנות", icon: Zap, color: "text-amber-500", bg: "bg-amber-50" },
    { label: "רגש", icon: Heart, color: "text-rose-500", bg: "bg-rose-50" },
    { label: "תגובה", icon: RefreshCw, color: "text-indigo-500", bg: "bg-indigo-50" },
    { label: "הוכחה", icon: CheckCircle, color: "text-emerald-500", bg: "bg-emerald-50" },
  ];

  return (
    <div className="relative w-full aspect-square max-w-[420px] mx-auto p-8">
      {/* Background Orbits */}
      <div className="absolute inset-0 border border-slate-100 rounded-full" />
      <div className="absolute inset-[10%] border border-slate-50 rounded-full opacity-50" />
      
      {/* Central Core */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="relative z-10 text-center">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">המעגל</div>
          <div className="text-primary font-black text-2xl tracking-tight">האוטומטי</div>
        </div>
      </div>

      {/* Animated Flow Line */}
      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
        <motion.circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke="url(#loopGradient)"
          strokeWidth="1.5"
          strokeDasharray="20 240"
          strokeLinecap="round"
          animate={{ strokeDashoffset: [0, -264] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <defs>
          <linearGradient id="loopGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#17b7ae" stopOpacity="0" />
            <stop offset="50%" stopColor="#17b7ae" stopOpacity="1" />
            <stop offset="100%" stopColor="#17b7ae" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Nodes */}
      {steps.map((step, i) => {
        const angle = (i / steps.length) * 2 * Math.PI - Math.PI / 2;
        const x = 50 + 42 * Math.cos(angle);
        const y = 50 + 42 * Math.sin(angle);
        
        return (
          <motion.div
            key={i}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20"
            style={{ left: `${x}%`, top: `${y}%` }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
          >
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl ${step.bg} shadow-sm border border-white flex items-center justify-center mb-2 transition-all duration-300`}
            >
              <step.icon className={`w-6 h-6 md:w-7 md:h-7 ${step.color}`} />
            </motion.div>
            <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-100 shadow-sm">
              <span className="text-[10px] md:text-xs font-bold text-slate-700 whitespace-nowrap">{step.label}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

// --- Components ---

const Button = ({ 
  children, 
  className = "", 
  variant = "primary", 
  onClick 
}: { 
  children: ReactNode; 
  className?: string; 
  variant?: "primary" | "secondary" | "outline";
  onClick?: () => void;
}) => {
  const baseStyles = "relative overflow-hidden px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 shadow-lg";
  const variants = {
    primary: "bg-primary text-white hover:bg-opacity-90 shadow-primary/20",
    secondary: "bg-accent text-white hover:bg-opacity-90 shadow-accent/20",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white"
  };

  return (
    <button 
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

const Section = ({ 
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

const Card = ({ children, className = "" }: { children: ReactNode; className?: string; key?: any }) => (
  <div className={`bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300 ${className}`}>
    {children}
  </div>
);

const FAQItem = ({ question, answer }: { question: string; answer: string; key?: any }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-right gap-4"
      >
        <span className="font-bold text-lg text-primary">{question}</span>
        <ChevronDown className={`w-5 h-5 text-accent transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-slate-600 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main Application ---

export default function App() {
  const scrollToCTA = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="rtl min-h-screen selection:bg-accent/20 selection:text-primary">
      {/* Redesigned Premium Split Hero Section */}
      <section className="relative pt-6 pb-6 md:pt-10 md:pb-12 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Centered Premium Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-8 md:mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold text-primary tracking-tight mb-3">
              עוצמה שקטה
            </h1>
            <p className="text-lg md:text-2xl font-light text-slate-500 tracking-wide">
              בניית ערך עצמי יציב מבפנים
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
            {/* Text Content */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="flex flex-col order-1"
            >
              <p className="text-sm md:text-base text-slate-600 mb-4 leading-relaxed max-w-xl font-medium">
                תהליך של 21 יום המבוסס על מחקרים בפסיכולוגיה<br className="hidden md:block" />
                {" "}שנועד לפרק את התחושה שאתה "לא מספיק"<br className="hidden md:block" />
                {" "}ולבנות ערך עצמי יציב מבפנים.<br className="hidden md:block" />
                <br className="hidden md:block" />
                רק שיטה פרקטית שעובדת.<br className="hidden md:block" />
                <br className="hidden md:block" />
                <span className="block md:inline font-bold text-primary/90 md:font-medium md:text-slate-600">מבוסס מחקר. ממוקד תוצאה.</span>
              </p>

              {/* Image for Mobile - Optimized for visibility and aspect ratio */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:hidden mb-4"
              >
                <motion.div 
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="relative"
                >
                  <div className="aspect-[3/2] rounded-2xl overflow-hidden shadow-xl border border-slate-100 relative z-10">
                    <img 
                      src="https://picsum.photos/seed/confident-cafe-man/800/1000" 
                      alt="ביטחון עצמי וערך פנימי" 
                      className="w-full h-full object-cover object-[center_20%]"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  
                  {/* Social Proof for Mobile */}
                  <Card className="absolute -bottom-4 -left-2 z-20 py-2 px-4 shadow-xl border-none bg-white/90 backdrop-blur-sm scale-90 origin-bottom-left">
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-2 rtl:space-x-reverse">
                        {[
                          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
                          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
                          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
                          "https://i.pravatar.cc/150?u=23"
                        ].map((src, i) => (
                          <div key={i} className="w-7 h-7 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
                            <img src={src} alt="user" referrerPolicy="no-referrer" />
                          </div>
                        ))}
                      </div>
                      <div className="text-[10px] font-bold text-primary leading-tight">
                        <span className="block text-accent text-[9px] mb-0.5">הצטרפו לקהילה</span>
                        עשרות כבר מרגישים שינוי
                      </div>
                    </div>
                  </Card>

                  {/* Decorative Elements for Mobile */}
                  <div className="absolute -top-4 -left-4 w-24 h-24 bg-accent/5 rounded-full blur-2xl -z-10" />
                  <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/5 rounded-full blur-2xl -z-10" />
                </motion.div>
              </motion.div>
              
              <div className="space-y-3 mb-6">
                {[
                  { bold: "5 דקות", rest: " ביום בלבד" },
                  { bold: "זיהוי מדויק", rest: " של מה שמוריד אותך" },
                  { bold: "שינוי בזמן אמת", rest: " של התגובה שלך" },
                  { bold: "ערך עצמי יציב", rest: " שלא תלוי באחרים" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                      <Check className="w-3.5 h-3.5 stroke-[3px]" />
                    </div>
                    <span className="text-slate-700 text-sm md:text-base">
                      <span className="font-bold">{item.bold}</span>
                      {item.rest}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 border-t border-slate-100 pt-4">
                <div className="text-center sm:text-right">
                  <div className="flex items-center justify-center sm:justify-end gap-3 mb-1">
                    <span className="text-2xl md:text-3xl font-black text-primary">₪249</span>
                    <span className="text-base text-slate-300 line-through">₪1,749</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold tracking-wide">
                    גישה מיידית | תשלום מאובטח
                  </p>
                </div>

                <Button 
                  onClick={scrollToCTA} 
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/10 py-3 px-6 text-base"
                >
                  להתחיל את 21 הימים
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>

            {/* Image Content for Desktop */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block order-2"
            >
              <motion.div 
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <div className="aspect-square rounded-[2rem] overflow-hidden shadow-[0_24px_48px_-12px_rgba(11,60,93,0.15)] border-4 border-white relative z-10">
                  <img 
                    src="https://picsum.photos/seed/confident-cafe-man/1000/1250" 
                    alt="ביטחון עצמי וערך פנימי" 
                    className="w-full h-full object-cover object-[center_20%]"
                    referrerPolicy="no-referrer"
                  />
                </div>
                {/* Decorative Elements */}
                <div className="absolute -top-12 -left-12 w-48 h-48 bg-accent/10 rounded-full blur-3xl -z-10" />
                <div className="absolute -bottom-12 -right-12 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-10" />
                
                <Card className="absolute -bottom-10 -left-10 z-20 py-5 px-8 shadow-2xl border-none bg-white/90 backdrop-blur-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-3 rtl:space-x-reverse">
                      {[
                        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
                        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
                        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
                        "https://i.pravatar.cc/150?u=24"
                      ].map((src, i) => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
                          <img src={src} alt="user" referrerPolicy="no-referrer" />
                        </div>
                      ))}
                    </div>
                    <div className="text-sm font-bold text-primary">
                      <span className="block text-accent text-xs mb-0.5">הצטרפו לקהילה</span>
                      עשרות כבר מרגישים שינוי
                    </div>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <Section bg="light">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-primary mb-6">
            אם זה מוכר לך, כנראה שהבעיה היא לא חוסר ביטחון רגעי
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            ערך עצמי נמוך הוא לא גזירת גורל, הוא תוצאה של דפוסים שנבנו לאורך שנים.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            "אתה תלוי יותר מדי באיך אנשים מגיבים אליך",
            "ביקורת קטנה נשארת איתך שעות ואפילו ימים",
            "אתה משווה את עצמך לאחרים בלי סוף, בחיים וברשתות החברתיות",
            "מבחוץ אתה נראה בסדר גמור, אבל מבפנים אתה מרגיש פחות",
            "אתה יודע מה אתה אמור לחשוב, אבל לא באמת מאמין בזה",
            "הצלחות מרגישות לך כמו מזל, אבל כשלונות מרגישים כמו הוכחה"
          ].map((point, i) => (
            <motion.div 
              key={i}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="flex items-start gap-4 border-r-4 border-r-accent">
                <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center text-accent flex-shrink-0 mt-1">
                  <Info className="w-4 h-4" />
                </div>
                <p className="font-bold text-lg text-primary">{point}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Mechanism Section */}
      <Section>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <PsychologicalLoop />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-black text-primary mb-8">
              למה מוטיבציה לבד אף פעם לא מספיקה?
            </h2>
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <p>
                ערך עצמי נמוך הוא לא מקרי. הוא נבנה מתבניות, פרשנויות, השוואות והרגלי חשיבה חוזרים ונשנים.
              </p>
              <p>
                זו הסיבה שזה לא נפתר על ידי מוטיבציה רגעית או משפטים של "תאהב את עצמך". זה דורש תהליך מובנה שמשנה את הזיהוי, התגובה והפרשנות שלך בזמן אמת.
              </p>
              <p className="font-bold text-primary">
                התוכנית שלנו מבוססת על עקרונות פסיכולוגיים מוכחים שנועדו ליצור שינוי נוירולוגי והתנהגותי עמוק.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Program Framework */}
      <Section bg="primary" className="text-center">
        <h2 className="text-3xl md:text-4xl font-black mb-12">המסגרת: 21 יום של שינוי</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Clock, title: "5 דקות ביום", desc: "תרגול קצר וממוקד שמתאים ללו\"ז שלך" },
            { icon: Target, title: "משימה יומית", desc: "פעולה אחת קטנה שיוצרת שינוי גדול" },
            { icon: ShieldCheck, title: "מבוסס מחקר", desc: "כלים מעולם ה-CBT והפסיכולוגיה החיובית" },
            { icon: Lock, title: "גישה לכל החיים", desc: "תכנים שילוו אותך גם אחרי סיום התוכנית" }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                <item.icon className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-white/70">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* How it works */}
      <Section bg="light">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-primary mb-6">איך זה עובד? ב-3 שלבים פשוטים</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-12 relative">
          <div className="hidden md:block absolute top-1/4 left-0 right-0 h-0.5 bg-accent/20 -z-10" />
          {[
            { step: "01", title: "מזהים", desc: "מבינים מה בדיוק פוגע בערך העצמי שלך ביומיום" },
            { step: "02", title: "מתרגלים", desc: "מבצעים תרגול קצר שמשנה תגובה והרגל חשיבתי" },
            { step: "03", title: "מייצבים", desc: "בונים שינוי שמתחיל להרגיש טבעי ויציב בחיים האמיתיים" }
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center mx-auto mb-8 border-4 border-accent">
                <span className="font-black text-xl text-primary">{item.step}</span>
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* What you get */}
      <Section>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-primary mb-6">מה מקבלים בתוכנית?</h2>
          <p className="text-lg text-slate-600">חבילה שלמה ומדויקת לבניית הערך העצמי שלך</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            {[
              { text: "תהליך דיגיטלי מובנה ל־21 יום" },
              { text: "תרגולים קצרים ליישום יומי" },
              { text: "זיהוי דפוסים אישיים שמורידים אותך" },
              { text: "כלים להתמודדות עם ביקורת עצמית" },
              { text: "מעקב התקדמות אישי לאורך התהליך" },
              { text: "כלים להטמעה ושמירה על ערך עצמי יציב" },
              { 
                text: "בונוס: מדריך להפסיק להשוות את עצמך לאחרים",
                subtext: "מדריך מדויק שיעזור לך להבין למה ההשוואה מנהלת אותך, ואיך להתחיל להשתחרר ממנה."
              }
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-bg-light border border-slate-100">
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white flex-shrink-0">
                  <Check className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-primary">{item.text}</span>
                  {item.subtext && (
                    <span className="text-sm text-slate-500 mt-1 leading-relaxed">{item.subtext}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <Zap className="w-32 h-32" />
            </div>
            <h3 className="text-2xl font-bold mb-6">חוויה דיגיטלית פרימיום</h3>
            <p className="text-slate-400 mb-8 leading-relaxed">
              התוכנית מעוצבת למובייל ומאפשרת לך לצרוך את התוכן מכל מקום, בכל זמן. הממשק נקי, מזמין ונועד לעזור לך להתמיד.
            </p>
            <div className="aspect-video rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <span className="text-white/30 font-medium italic">תצוגת ממשק התוכנית</span>
            </div>
          </div>
        </div>
      </Section>

      {/* Social Proof Placeholder */}
      <Section bg="light" id="testimonials">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-primary mb-6">מה אומרים המשתתפים שלנו?</h2>
          <p className="text-lg text-slate-600">שינויים אמיתיים שקרו בחיים האמיתיים</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map(i => (
            <Card key={i} className="flex flex-col justify-between">
              <div className="mb-6">
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-premium text-premium" />)}
                </div>
                <div className="aspect-[4/3] bg-slate-100 rounded-xl mb-4 flex items-center justify-center text-slate-400 italic text-sm p-4 text-center">
                  [כאן יופיע צילום מסך של וואטסאפ או עדות כתובה]
                </div>
                <p className="text-slate-600 italic">
                  "התוכנית הזו שינתה לי את הדרך שבה אני מסתכל על עצמי בבוקר. פתאום הקול הביקורתי נחלש."
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200" />
                <div>
                  <p className="font-bold text-primary text-sm">משתתף בתוכנית</p>
                  <p className="text-xs text-slate-400">לפני חודשיים</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Trust Section */}
      <Section>
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <ShieldCheck className="w-10 h-10 text-accent" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-primary mb-8">למה זה עובד?</h2>
          <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
            <p>
              המוצר הזה נבנה על בסיס מחקרים עדכניים ועקרונות פסיכולוגיים עם תוצאות מוכחות. אנחנו לא מאמינים בקיצורי דרך או ב"קסמים".
            </p>
            <p>
              אנחנו מאמינים בתהליך מובנה, עקבי ומבוסס ראיות. כל משימה ותוכן בתוכנית נבחרו בקפידה כדי להבטיח שהם לא רק מעוררי השראה, אלא באמת יוצרים שינוי התנהגותי.
            </p>
            <p className="font-bold text-primary">
              זה לא עוד קורס מוטיבציה. זו מערכת לשינוי פנימי.
            </p>
          </div>
        </div>
      </Section>

      {/* Risk Reduction */}
      <Section bg="primary" className="text-center rounded-t-[50px] md:rounded-t-[100px]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black mb-8">הביטחון שלך הוא בראש סדר העדיפויות שלנו</h2>
          <p className="text-xl mb-10 text-white/80">
            אם תעבור/י את התהליך ולא תראה/י תוצאה אמיתית, יש החזר כספי מלא. אנחנו כל כך מאמינים בשיטה שלנו שאנחנו לוקחים את כל הסיכון עלינו.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-accent" />
              <span className="font-bold">100% אחריות לתוצאות</span>
            </div>
            <div className="flex items-center gap-3">
              <Lock className="w-8 h-8 text-accent" />
              <span className="font-bold">תשלום מאובטח ומוצפן</span>
            </div>
          </div>
        </div>
      </Section>

      {/* Who it is for */}
      <Section bg="light">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="text-2xl font-black text-primary mb-8 flex items-center gap-3">
              <Check className="text-accent w-8 h-8" />
              זה בשבילך אם...
            </h3>
            <ul className="space-y-4">
              {[
                "הערך העצמי שלך תלוי יותר מדי בתגובות של אחרים",
                "חיפשת תהליך מובנה ופרקטי ולא רק השראה",
                "נמאס לך להרגיש 'פחות' למרות שהכל נראה בסדר בחוץ",
                "יש לך 5 דקות ביום להשקיע בעצמך באמת",
                "אתה רוצה לבנות חוסן פנימי אמיתי"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-700">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white/50 p-10 rounded-3xl border border-dashed border-slate-300">
            <h3 className="text-2xl font-black text-slate-400 mb-8 flex items-center gap-3">
              <X className="w-8 h-8" />
              זה לא בשבילך אם...
            </h3>
            <ul className="space-y-4">
              {[
                "חיפשת פתרון קסם שמשנה את החיים ביומיים",
                "אין לך כוונה לבצע פעולות קטנות ביומיום",
                "חיפשת רק תוכן פסיבי לצפייה בלי תרגול",
                "אתה לא מוכן באמת לעבוד על עצמך"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-500">
                  <div className="w-2 h-2 rounded-full bg-slate-300 mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* FAQ Section */}
      <Section id="faq">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-primary mb-6">שאלות נפוצות</h2>
        </div>
        <div className="max-w-3xl mx-auto">
          {[
            { 
              q: "איך זה בעצם עובד?", 
              a: "התוכנית בנויה כפעולות קצרות ופשוטות שמשתלבות ביום שלך — לא משהו כבד או דורש זמן. מדי פעם תתבקש לעצור, להבין איך אתה חושב ומגיב, ולבצע שינוי קטן בפועל. עם הזמן, דרך הפעולות וההבנה הזאת, אתה מתחיל לייצר חוויות חדשות והוכחות — וזה מה שבונה ערך עצמי אמיתי, בלי להרגיש שאתה “עובד על זה”." 
            },
            { 
              q: "האם זה מתאים גם אם הערך העצמי שלי לא 'נמוך מאוד'?", 
              a: "בהחלט. התוכנית נועדה לחזק ולייצב את הערך העצמי. גם אנשים שמרגישים בטוחים בעצמם בדרך כלל מוצאים בתוכנית כלים לשיפור החוסן הפנימי ברגעי משבר או מול אתגרים חדשים." 
            },
            { 
              q: "כמה זמן זה באמת לוקח ביום?", 
              a: "המשימות תוכננו לקחת כ-5 דקות ביום. חלקן הן משימות חשיבתיות וחלקן פעולות קטנות. המטרה היא שזה ישתלב בחיים שלך, לא שיעצור אותם." 
            },
            { 
              q: "מה אם אני מתקשה להתמיד?", 
              a: "התוכנית לא מבוססת על משמעת קשה, אלא על הבנה. כשאתה מבין למה אתה חושב ומתנהג בצורה מסוימת — הפעולות נהיות טבעיות יותר. בנוסף, כל יום בנוי להיות קצר ומדויק, כדי שתוכל לשלב אותו בקלות בשגרה שלך." 
            },
            { 
              q: "מה אם זה לא עובד לי?", 
              a: "אם תעבור את התהליך ולא תראה שינוי — תקבל החזר כספי בהתאם לתנאים. אין כאן סיכון אמיתי, אתה רק צריך לבצע את התהליך כמו שהוא." 
            },
            { 
              q: "האם זה טיפול פסיכולוגי?", 
              a: "לא. זו תוכנית ליווי דיגיטלית לשיפור עצמי. היא מבוססת על עקרונות פסיכולוגיים, אך היא אינה מהווה תחליף לטיפול נפשי מקצועי במידת הצורך." 
            },
            { 
              q: "מתי מקבלים גישה?", 
              a: "מיד לאחר התשלום. יישלח אליך מייל עם לינק אישי, שם משתמש וסיסמה למערכת הלמידה שלנו." 
            }
          ].map((item, i) => (
            <FAQItem key={i} question={item.q} answer={item.a} />
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <Section bg="light" className="text-center" id="pricing">
        <div className="max-w-3xl mx-auto bg-white p-12 md:p-20 rounded-[40px] shadow-2xl border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-accent" />
          <h2 className="text-3xl md:text-5xl font-black text-primary mb-6">מוכנים להתחיל את המסע?</h2>
          <p className="text-xl text-slate-600 mb-10">
            הצטרפו לעשרות אנשים שכבר התחילו שינוי אמיתי מבפנים
          </p>
          
          <div className="mb-10">
            <div className="flex items-center justify-center gap-4 mb-2">
              <span className="text-5xl font-black text-primary">₪249</span>
              <span className="text-2xl text-slate-400 line-through">₪1,749</span>
            </div>
            <p className="text-accent font-bold">הצעה מוגבלת לזמן הקרוב</p>
          </div>

          <Button className="w-full py-6 text-xl mb-6" onClick={() => alert('מעבר לדף תשלום מאובטח...')}>
            לקבלת גישה מיידית לתוכנית
            <ArrowLeft className="w-6 h-6" />
          </Button>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500 font-medium">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>רכישה מאובטחת</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>גישה מיידית</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              <span>תמיכה זמינה</span>
            </div>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-100 text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-black text-lg">מ</div>
          <span className="font-bold text-xl tracking-tight text-primary">מסע</span>
        </div>
        <p className="text-slate-400 text-sm mb-6">
          © 2026 עוצמה שקטה מבית מסע · כל הזכויות שמורות
        </p>
        <div className="flex justify-center gap-8 text-sm font-bold text-slate-400">
          <a href="#" className="hover:text-primary transition-colors">תקנון</a>
          <a href="#" className="hover:text-primary transition-colors">מדיניות פרטיות</a>
          <a href="#" className="hover:text-primary transition-colors">צור קשר</a>
        </div>
      </footer>
    </div>
  );
}
