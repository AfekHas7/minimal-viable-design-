import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShieldCheck, Clock, CheckCircle, ArrowLeft, Mail, Lock } from 'lucide-react';
import { Footer } from '../components/SharedLayout';
import logoImg from '../assets/logoVwhitoutslogen.png';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PRODUCT_ID = 'program:self_worth_21d';
const PRICE_NIS = 249;
const PRICE_ORIGINAL_NIS = 1749;

const benefits = [
  'גישה מיידית לכל 21 הימים',
  'תרגולים יומיים קצרים ומדויקים',
  'תמיכה זמינה לאורך כל הדרך',
];

type Status = { type: 'success' | 'error'; text: string } | null;

export default function Checkout() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const email = (searchParams.get('email') || '').trim();
  const emailValid = EMAIL_RE.test(email);

  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<Status>(null);

  const isDone = status?.type === 'success';

  const handlePay = async () => {
    if (!emailValid || isLoading || isDone) return;
    setIsLoading(true);
    setStatus(null);
    try {
      const res = await fetch('/api/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, products: [PRODUCT_ID] }),
      });
      if (!res.ok) throw new Error('purchase_failed');
      navigate(`/success?email=${encodeURIComponent(email)}`, { replace: true });
      return;
    } catch (err) {
      console.error('checkout: purchase error', err);
      setStatus({ type: 'error', text: 'משהו השתבש. אנא נסו שוב בעוד רגע.' });
    } finally {
      setIsLoading(false);
    }
  };

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
          <div className="bg-primary text-white px-6 md:px-10 pt-10 pb-8 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-accent" />
            <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-accent mb-3">
              סיום רכישה
            </p>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">
              תוכנית 21 יום לערך עצמי
            </h1>
            <p className="text-base md:text-xl text-white/80 mt-3 font-light">
              בניית ערך עצמי יציב מבפנים — בקצב שלך
            </p>
          </div>

          <div className="p-6 md:p-10 space-y-7">
            <ul className="space-y-3">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-slate-700">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-base md:text-lg leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>

            <div className="border-t border-b border-slate-100 py-5 flex items-center justify-between gap-6 flex-wrap">
              <div>
                <p className="text-sm font-bold text-slate-700 mb-0.5">לתשלום</p>
                <p className="text-xs text-slate-400">תשלום חד-פעמי · גישה מיידית</p>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-xl text-slate-400 line-through">
                  ₪{PRICE_ORIGINAL_NIS.toLocaleString('he-IL')}
                </span>
                <span className="text-4xl md:text-5xl font-black text-primary">
                  ₪{PRICE_NIS}
                </span>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary flex-shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-500 font-medium mb-0.5">המייל שלך</p>
                {emailValid ? (
                  <p
                    dir="ltr"
                    className="font-bold text-primary truncate text-right"
                    title={email}
                  >
                    {email}
                  </p>
                ) : (
                  <p className="text-sm text-red-500 font-medium leading-relaxed">
                    כתובת מייל חסרה או לא תקינה.{' '}
                    <Link to="/" className="underline font-bold">
                      חזרה לדף הבית
                    </Link>
                  </p>
                )}
              </div>
            </div>

            {status && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-2xl text-center font-medium border ${
                  status.type === 'success'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                    : 'bg-red-50 text-red-600 border-red-100'
                }`}
              >
                {status.text}
              </motion.div>
            )}

            <button
              onClick={handlePay}
              disabled={!emailValid || isLoading || isDone}
              className="w-full py-5 rounded-full font-bold text-xl bg-primary text-white shadow-lg shadow-primary/20 active:scale-[0.98] hover:bg-opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center justify-center gap-3"
            >
              {isLoading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  מעבד...
                </>
              ) : isDone ? (
                <>
                  <CheckCircle className="w-6 h-6" />
                  נשלח
                </>
              ) : (
                'לתשלום'
              )}
            </button>

            <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-500 font-medium pt-1">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>רכישה מאובטחת</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <span>פרטיות מלאה</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>גישה מיידית</span>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
