import { Section, Footer } from '../components/SharedLayout';
import { Link } from 'react-router-dom';

export default function Privacy() {
  return (
    <div className="rtl min-h-screen selection:bg-accent/20 selection:text-primary bg-white">
      <Section className="min-h-[70vh]">
        <div className="max-w-3xl mx-auto py-8">
          <Link to="/" className="inline-block text-slate-500 hover:text-primary transition-colors font-medium text-sm mb-6">
            &larr; חזרה לדף הראשי
          </Link>
          <h1 className="text-4xl md:text-5xl font-black text-primary mb-3 tracking-tight">מדיניות פרטיות</h1>
          <p className="text-xl text-slate-500 mb-8 font-medium">עוצמה שקטה מבית מסע</p>
          
          <div className="space-y-8 text-lg text-slate-600 leading-relaxed font-light">

            <div className="text-base text-slate-400 mb-8 p-4 bg-slate-50 rounded-xl">
              <p>עודכן לאחרונה: 22/05/2026</p>
              <p>המפעיל: מסע (מותג)</p>
              <p>מופעל ע״י ישות עסקית רשומה בישראל</p>
              <p>דוא״ל לפניות: masapnimi7@gmail.com</p>
            </div>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">1. מבוא</h2>
              <div className="space-y-4">
                <p>הפרטיות שלך חשובה לנו. מדיניות פרטיות זו מסבירה כיצד אנו אוספים ומשתמשים במידע אישי בעת השימוש שלך באתר, במערכת הגישה ובתכנים הנלווים, מתוך כוונה לאסוף ולשמור רק את המידע הדרוש והמינימלי לתפעולו התקין של השירות, לאבטחה ולשיפורו.</p>
                <p>השימוש בשירותים כפוף גם לתקנון ותנאי השימוש.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">2. איזה מידע אנו עשויים לאסוף</h2>
              <div className="space-y-6">
                <p>בהתאם לאופן השימוש שלך בשירותים, אנו עשויים לאסוף את סוגי המידע הבאים:</p>
                
                <div>
                  <h3 className="text-xl font-bold text-primary/90 mb-2">א. פרטי זיהוי ויצירת קשר</h3>
                  <p>שם מלא, כתובת דוא״ל, מספר טלפון, ופרטים דומים שתמסור לנו.</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-primary/90 mb-2">ב. פרטי חשבון וגישה</h3>
                  <p>פרטי הרשמה, מזהי משתמש, נתוני התחברות, ואמצעי אימות.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-primary/90 mb-2">ג. פרטי רכישה ועסקה</h3>
                  <p>מידע על רכישות, הזמנות, תשלומים, חשבוניות, סטטוס עסקה, וסוג המוצר שנרכש. פרטי תשלום מלאים עשויים להיאסף ולעבור עיבוד אצל ספקי הסליקה החיצוניים שלנו.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-primary/90 mb-2">ד. נתוני שימוש וטכניים</h3>
                  <p>כתובת IP, סוג מכשיר, דפדפן, מערכת הפעלה, זמני שימוש, עמודים שנצפו, אינטראקציות במערכת, מקור הגעה, נתוני Cookies, ונתוני אנליטיקה.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-primary/90 mb-2">ה. תוכן שאתה מזין למערכת</h3>
                  <p>תשובות, תרגולים, תובנות וטקסטים שאתה מזין במסגרת התוכנית הם תוכן רגיש במיוחד, ואנו מתייחסים אליו ככזה. להלן עקרונות הטיפול שלנו בתוכן זה:</p>
                  <div className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <p className="font-bold text-primary">הצפנה</p>
                      <p>כל תוכן שאתה מזין מוצפן במנוחה (encryption at rest) בשרתי האחסון שלנו (Supabase).</p>
                    </div>
                    <div className="space-y-2">
                      <p className="font-bold text-primary">גישה</p>
                      <p>למפעיל אין גישה לקריאת התכנים האישיים שאתה מזין. המערכת בנויה כך שהתוכן שלך הוא פרטי, ואין אדם מטעם המפעיל הצופה בתשובות, בתובנות או בכל תוכן אישי אחר שתזין במהלך התוכנית.</p>
                    </div>
                    <div className="space-y-2">
                      <p className="font-bold text-primary">עיבוד אוטומטי בלבד</p>
                      <p>התוכן שאתה מזין מעובד באופן אוטומטי על ידי המערכת אך ורק לצורך תפעול התוכנית - הצגת התקדמותך, שמירת רצף ביצוע, ואימות עמידה בתנאי הערבות בעת בקשת החזר (כמפורט בתקנון).</p>
                    </div>
                    <div className="space-y-2">
                      <p className="font-bold text-primary">אי-שיתוף עם צדדים שלישיים</p>
                      <p>התוכן האישי שאתה מזין אינו מועבר, נמכר, נחשף או משותף עם כל צד שלישי, למעט ספק האחסון (Supabase) המאחסן את המידע במוצפן בלבד.</p>
                    </div>
                    <div className="space-y-2">
                      <p className="font-bold text-primary">אי-שימוש ב-AI חיצוני</p>
                      <p>התכנים שאתה מזין אינם נשלחים לעיבוד על ידי מערכות בינה מלאכותית חיצוניות (כגון OpenAI, Anthropic או כל ספק AI אחר). העיבוד מתבצע אך ורק במערכת הפנימית שלנו.</p>
                    </div>
                    <div className="space-y-2">
                      <p className="font-bold text-primary">תקופת שמירה</p>
                      <p>התכנים שאתה מזין נשמרים במערכת למשך תקופת הגישה לתוכנית (עד חודשיים ממועד הרכישה). 90 ימים לאחר סיום תקופת הגישה, התכנים האישיים יימחקו באופן אוטומטי מהמערכת, אלא אם המשתמש ביקש מפורשות לשמרם לצורך גישה עתידית או שהתבקשה מחיקה מוקדמת יותר.</p>
                    </div>
                    <div className="space-y-2">
                      <p className="font-bold text-primary">זכות מחיקה ביוזמת המשתמש</p>
                      <p>אתה רשאי בכל עת לפנות אלינו בבקשה למחיקת כלל התכנים האישיים שהזנת למערכת, ואנו נטפל בבקשתך בתוך 14 ימי עסקים.</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-primary/90 mb-2">ו. תקשורת איתנו</h3>
                  <p>פניות שירות, הודעות, מיילים, ותקשורת אחרת מולנו.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-primary/90 mb-2">ז. מידע שיווקי</h3>
                  <p>העדפות דיוור, פתיחת מיילים, הקלקות, וטפסי הרשמה לקמפיינים, ככל שקיימים.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">3. מאילו מקורות אנו אוספים מידע</h2>
              <div className="space-y-4">
                <p>אנו אוספים מידע:</p>
                <ul className="list-disc list-inside space-y-2 pr-4 text-slate-600">
                  <li>ישירות ממך, כאשר אתה מזין פרטים, רוכש, יוצר קשר או משתמש בשירותים;</li>
                  <li>אוטומטית, באמצעות Cookies, כלים אנליטיים וטכנולוגיות דומות;</li>
                  <li>מצדדים שלישיים הפועלים עבורנו, כגון ספקי סליקה, דיוור, אחסון, אנליטיקה, פרסום, אימות או תמיכה.</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">4. לאילו מטרות אנו משתמשים במידע</h2>
              <div className="space-y-4">
                <p>אנו עשויים להשתמש במידע לצרכים הבאים:</p>
                <ul className="list-disc list-inside space-y-2 pr-4 text-slate-600">
                  <li>לספק לך גישה לתוכנית ולתכנים;</li>
                  <li>להפעיל, לנהל, לאבטח ולתחזק את השירותים;</li>
                  <li>לאמת זהות, לנהל חשבונות משתמש, ולמנוע שימוש לא מורשה;</li>
                  <li>לעבד רכישות ותשלומים;</li>
                  <li>לשלוח קישורי כניסה, הודעות מערכת, אישורי רכישה, תזכורות, ועדכונים תפעוליים;</li>
                  <li>לספק תמיכה ושירות לקוחות;</li>
                  <li>לשפר את חוויית המשתמש, למדוד ביצועים, להבין שימוש, ולבצע אנליטיקה;</li>
                  <li>להתאים תוכן, מסרים, והצעות לפי דפוסי שימוש;</li>
                  <li>לעמוד בחובות חוקיות, חשבונאיות, מסחריות ואבטחת מידע;</li>
                  <li>לשלוח תוכן שיווקי, בכפוף לדין ולהעדפותיך.</li>
                </ul>
                <p>ככל שהדבר רלוונטי לפי הדין החל, עיבוד המידע עשוי להתבסס על אחד או יותר מהבסיסים הבאים: ביצוע חוזה, אינטרס לגיטימי, הסכמה, או חובה חוקית.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">5. עם מי אנו עשויים לשתף מידע</h2>
              <div className="space-y-4">
                <p>אנו עובדים עם מספר מצומצם של ספקי שירות חיוניים לתפעול המוצר. כל ספק שאיתו אנו עובדים נבחר בקפידה ומחויב להסכמי עיבוד מידע (Data Processing Agreement) המגנים על פרטיותך.</p>
                <p>הספקים העיקריים עמם אנו עובדים:</p>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="font-bold text-primary">Supabase</p>
                    <p>ספק תשתית האחסון והבסיס נתונים שלנו. המידע מאוחסן במוצפן בשרתים באיחוד האירופי. מדיניות הפרטיות של Supabase זמינה באתרם.</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-bold text-primary">Grow</p>
                    <p>ספק סליקת התשלומים שלנו. פרטי תשלום מוזנים ומעובדים ישירות במערכת Grow ואינם נשמרים אצלנו. מדיניות הפרטיות של Grow זמינה באתרם.</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-bold text-primary">Resend</p>
                    <p>שירות לשליחת הודעות דוא"ל תפעוליות (אישורי רכישה, קישורי גישה, תזכורות). מדיניות הפרטיות של Resend זמינה באתרם.</p>
                  </div>
                </div>
                <p>מעבר לספקים אלה, אנו עשויים לשתף מידע גם עם:</p>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="font-bold text-primary">יועצים מקצועיים</p>
                    <p>רואי חשבון ויועצים משפטיים, לפי הצורך ובמסגרת חובות מקצועיות וחיסיון.</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-bold text-primary">רשויות מוסמכות</p>
                    <p>אם נהיה מחויבים לכך לפי דין, צו, הליך משפטי, או לצורך הגנה על זכויותינו או על שלום הציבור.</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-bold text-primary">צד שלישי במסגרת שינוי מבנה עסקי</p>
                    <p>מיזוג, רכישת פעילות, או העברת נכסים, בכפוף להוראות הדין ולמתן הודעה למשתמש.</p>
                  </div>
                </div>
                <p>חשוב לציין: איננו מוכרים מידע אישי שלך לצדדים שלישיים תמורת תמורה כספית, ואיננו משתפים את המידע שלך עם מפרסמים או רשתות פרסום.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">6. Cookies, אנליטיקה וכלי פרסום</h2>
              <div className="space-y-4">
                <p>האתר והשירותים עשויים להשתמש בכלי ניטור כגון Cookies או פיקסלים לצורך המדידה של ביצועי האתר, אבטחה, מדידת תנועה והתנהגות כללית. מערכות אלו עשויות לכלול ספקי צד שלישי (דוגמת כלי אנליטיקה כמו גוגל ואמצעי פרסום) ולשדר אליהם נתוני פעולה אנונימיים בהתאם למדיניותם שלהם.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">7. שמירת מידע ומינימיזציה</h2>
              <div className="space-y-4">
                <p>אנו פועלים למזער ככל הניתן את משך הזמן שבו מידע אישי נשמר אצלנו. עם זאת, נתונים אישיים ישמרו במערכות ככל שהם נחוצים באופן סביר למטרות תפעול השירות שנרכש, השלמת התקשורת הניהולית, הבטחת פעילות תקינה ומאובטחת, אימות פעילות לבקשות החזר וקיום דרישות חוקיות או חשבונאיות. על אף מאמצי המינימיזציה, אין המדיניות מתחייבת לכך שלא נשמר כל נתון על פעילותך, אלא שהמידע מנוהל בצורה מינימלית ומדויקת.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">8. אבטחת מידע</h2>
              <div className="space-y-4">
                <p>אנו נוקטים אמצעים טכניים, ארגוניים ומסחריים סבירים לשמירה על המידע האישי, לצמצום סיכוני גישה בלתי מורשית, אובדן, שימוש לרעה, שינוי או חשיפה.</p>
                <p>עם זאת, אין מערכת אבטחה שהיא חסינה לחלוטין, ולכן איננו יכולים להבטיח אבטחה מוחלטת.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">9. העברת מידע מחוץ לישראל</h2>
              <div className="space-y-4">
                <p>חלק מספקי השירות שלנו פועלים מחוץ לישראל, ובהתאם לכך חלק מהמידע שלך עשוי להיות מאוחסן ולעבור עיבוד מחוץ לישראל:</p>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="font-bold text-primary">Supabase</p>
                    <p>שרתי האחסון הראשיים שלנו ממוקמים באיחוד האירופי, באזור הכפוף לתקנות הגנת המידע האירופיות (GDPR) המקנות רמת הגנה גבוהה למידע אישי.</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-bold text-primary">Resend ו-Grow</p>
                    <p>ספקים אלה עשויים לעבד מידע בשרתים במדינות שונות בארה"ב או באירופה, בכפוף למדיניות הפרטיות וההסכמים החוזיים שלנו עמם.</p>
                  </div>
                </div>
                <p>העברות מידע מחוץ לישראל מבוצעות בהתאם לדין החל ובכפוף להסדרים המתאימים מבחינה משפטית ועסקית, לרבות סעיפי הגנה חוזיים סטנדרטיים (Standard Contractual Clauses) כאשר רלוונטי.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">10. זכויותיך</h2>
              <div className="space-y-4">
                <p>בכפוף לדין החל, לרבות חוק הגנת הפרטיות הישראלי ותקנות הגנת המידע האירופיות (GDPR) למשתמשים תושבי האיחוד האירופי, עומדות לך הזכויות הבאות:</p>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="font-bold text-primary">זכות עיון</p>
                    <p>לבקש מידע על הנתונים האישיים שיש לנו עליך.</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-bold text-primary">זכות תיקון</p>
                    <p>לתקן מידע לא מדויק או חסר.</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-bold text-primary">זכות מחיקה</p>
                    <p>לבקש מחיקת מידע אישי שלך, כאשר הדבר אפשרי ואינו סותר חובה חוקית או אינטרס לגיטימי מהותי.</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-bold text-primary">זכות לניידות נתונים</p>
                    <p>לקבל את המידע האישי שלך בפורמט מובנה וניתן להעברה (רלוונטי בעיקר למשתמשים תושבי האיחוד האירופי).</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-bold text-primary">זכות התנגדות</p>
                    <p>להתנגד לעיבוד מסוים של המידע שלך.</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-bold text-primary">זכות לבטל הסכמה</p>
                    <p>כאשר העיבוד מבוסס על הסכמה.</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-bold text-primary">זכות להפסקת דיוור שיווקי</p>
                    <p>בכל עת ובלחיצה אחת.</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-bold text-primary">זכות להגיש תלונה</p>
                    <p>
                      אם אתה סבור שהפרנו את זכויותיך לפרטיות, אתה רשאי להגיש תלונה ל
                      <a
                        href="https://www.gov.il/he/departments/the_privacy_protection_authority"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline font-medium hover:opacity-80 transition-opacity"
                      >
                        רשות הגנת הפרטיות בישראל
                      </a>
                      , או למשתמשים תושבי האיחוד האירופי - לרשות הגנת המידע במדינתך.
                    </p>
                  </div>
                </div>
                <p>לבקשות בנושא פרטיות ניתן לפנות אלינו בכתובת: privacy@otzmashketa.com</p>
                <p>לצורך הגנה על פרטיותך, אנו עשויים לבקש פרטים לצורך אימות זהות לפני טיפול בבקשה. אנו נשתדל להגיב לכל בקשה בתוך 30 ימים.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">11. תקשורת מערכת ודיוור שיווקי</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="font-bold text-primary">הודעות תפעוליות (Transactional)</p>
                  <p>כמשתמש רשום בתוכנית, תקבל מאיתנו הודעות תפעוליות חיוניות הקשורות ישירות לתוכנית שרכשת: אישורי רכישה, קישורי כניסה, תזכורות יומיות במהלך 21 ימי התוכנית, התראות מערכת, ועדכונים תפעוליים. הודעות אלה אינן מהוות "דבר פרסומת" כהגדרתו בחוק התקשורת (בזק ושידורים), התשמ"ב-1982, והן חלק בלתי נפרד מהשירות שרכשת.</p>
                </div>
                <div className="space-y-2">
                  <p className="font-bold text-primary">דיוור שיווקי</p>
                  <p>שליחת תוכן פרסומי או שיווקי (תכנים נוספים, מבצעים, מוצרים עתידיים) תיעשה אך ורק לאחר קבלת הסכמה מפורשת ונפרדת מהמשתמש מראש (Opt-In), בהתאם להוראות תיקון 40 לחוק התקשורת. הסכמה זו תינתן באמצעות סימון נפרד במעמד הרכישה או באמצעות הרשמה נפרדת לרשימת התפוצה.</p>
                </div>
                <div className="space-y-2">
                  <p className="font-bold text-primary">ביטול הסכמה</p>
                  <p>המשתמש רשאי בכל עת לבטל את הסכמתו לקבלת תוכן פרסומי, באמצעות לחיצה על קישור ההסרה הקבוע בתחתית כל הודעה פרסומית, או באמצעות פנייה ישירה אלינו בדוא"ל. ביטול ההסכמה יטופל בתוך 3 ימי עסקים.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">12. קטינים</h2>
              <div className="space-y-4">
                <p>השירותים מיועדים אך ורק לבני 18 ומעלה. אנו אינטנציונליים בכך שאיננו אוספים ביודעין מידע אישי מקטינים מתחת לגיל 18.</p>
                <p>רכישת התוכנית מהווה הצהרה של המשתמש כי הוא בן 18 לפחות. אם הגיע לידיעתנו שנאסף מידע אישי מקטין, נפעל למחיקתו ללא דיחוי. הורה או אפוטרופוס המאמין שילדו הקטין מסר מידע אישי לשירות, מוזמן לפנות אלינו בכתובת privacy@otzmashketa.com ואנו נטפל בבקשה בהקדם.</p>
                <p>תוכן התוכנית ועיצובה לא נועדו לקטינים, ואיננו מבצעים פעולות שיווק או פרסום המכוונות אליהם.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">13. קישורים ושירותי צד שלישי</h2>
              <div className="space-y-4">
                <p>השירותים עשויים לכלול קישורים, הטמעות או חיבורים לשירותי צד שלישי. איננו אחראים למדיניות הפרטיות או לפרקטיקות של אותם גורמים, ואנו ממליצים לעיין בתנאי השימוש ובמדיניות הפרטיות שלהם.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">14. שינויים במדיניות</h2>
              <div className="space-y-4">
                <p>אנו רשאים לעדכן מדיניות זו מעת לעת. במקרה כזה נפרסם גרסה מעודכנת בציון תאריך העדכון. במקרה של שינוי מהותי, ייתכן שנמסור הודעה נוספת לפי שיקול דעתנו ובהתאם לדין החל.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">15. יצירת קשר</h2>
              <div className="space-y-4">
                <p>לכל שאלה, בקשה או פנייה בנושא פרטיות, ניתן ליצור קשר באמצעות הדוא"ל המוקדש לנושאי פרטיות:</p>
                <p>privacy@otzmashketa.com</p>
                <p>לפניות כלליות בנוגע למוצר ולשירות: support@otzmashketa.com</p>
              </div>
            </section>

          </div>
        </div>
      </Section>
      <Footer />
    </div>
  );
}
