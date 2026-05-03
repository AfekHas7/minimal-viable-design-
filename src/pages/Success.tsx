import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, MailCheck, Mail } from 'lucide-react';
import { Footer } from '../components/SharedLayout';
import logoImg from '../assets/logoVwhitoutslogen.png';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const GMAIL_INBOX = 'https://mail.google.com/mail/u/0/#inbox';
const EMAIL_SUBJECT = 'הגישה שלך לתוכנית – עוצמה שקטה';

export default function Success() {
  const [searchParams] = useSearchParams();
  const rawEmail = (searchParams.get('email') || '').trim();
  const buyerEmail = EMAIL_RE.test(rawEmail) ? rawEmail : '';

  return (
    <div className="rtl min-h-screen bg-bg-light flex flex-col">
      <header className="px-6 pt-6 pb-4 max-w-5xl mx-auto w-full flex items-center justify-between gap-4">
        <Link
          to="/"
          className="text-sm font-bold text-slate-500 hover:text-primary transition flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4 rotate-180" />
          חזרה
        </Link>
        <Link to="/" className="hover:opacity-80 transition-opacity">
          <img
            src={logoImg}
            alt="עוצמה שקטה"
            className="h-10 md:h-12 w-auto object-contain mix-blend-multiply"
          />
        </Link>
      </header>

      <main className="flex-1 px-4 md:px-6 py-6 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden"
        >
          <div className="px-6 md:px-10 pt-12 pb-8 text-center relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-accent" />

            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.4, ease: 'easeOut' }}
              className="mx-auto w-16 h-16 md:w-20 md:h-20 rounded-full bg-accent/10 text-accent flex items-center justify-center"
            >
              <MailCheck className="w-8 h-8 md:w-10 md:h-10" strokeWidth={2} />
            </motion.div>

            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-primary mt-5">
              התשלום התקבל בהצלחה
            </h1>
            <p className="text-base md:text-lg text-slate-500 mt-3 font-light leading-relaxed">
              שלחנו לך מייל עם גישה לתוכנית.
            </p>
            {buyerEmail && (
              <p className="text-sm text-slate-400 mt-2">
                <span>נשלח לכתובת </span>
                <span dir="ltr" className="font-bold text-primary/80">
                  {buyerEmail}
                </span>
              </p>
            )}
          </div>

          <div className="px-6 md:px-10 pb-10 space-y-6">
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary flex-shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-500 font-medium mb-0.5">
                  הכותרת של המייל
                </p>
                <p className="font-bold text-primary leading-snug">{EMAIL_SUBJECT}</p>
              </div>
            </div>

            <div className="bg-slate-50/70 rounded-2xl p-5 border border-slate-100 space-y-4">
              <div className="text-slate-600 text-sm md:text-base leading-relaxed space-y-2">
                <p className="font-bold text-slate-700">לא קיבלת את המייל?</p>
                <p>
                  לפעמים המייל יכול להגיע ללשונית "קידומי מכירות" או לספאם.
                </p>
                <p>אם לא מצאת אותו תוך דקה–שתיים, כדאי לבדוק גם שם.</p>
              </div>

              <div className="flex items-center justify-center gap-2 flex-wrap pt-1">
                <span className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-[11px] md:text-xs font-medium text-slate-500">
                  תיבה ראשית
                </span>
                <ArrowLeft
                  className="w-4 h-4 text-slate-300 hidden sm:block"
                  aria-hidden="true"
                />
                <span className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-[11px] md:text-xs font-medium text-slate-500">
                  קידומי מכירות
                </span>
                <ArrowLeft
                  className="w-4 h-4 text-slate-300 hidden sm:block"
                  aria-hidden="true"
                />
                <span className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-[11px] md:text-xs font-medium text-slate-500">
                  ספאם
                </span>
              </div>
            </div>

            <a
              href={GMAIL_INBOX}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-5 rounded-full font-bold text-xl bg-primary text-white shadow-lg shadow-primary/20 active:scale-[0.98] hover:bg-opacity-90 transition flex items-center justify-center gap-3"
            >
              פתח את המייל
            </a>

            <p className="text-center text-sm text-slate-500 leading-relaxed">
              משתמש בספק אחר? פתח את תיבת המייל שלך באפליקציה.
            </p>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
