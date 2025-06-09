import React, { useState, useEffect, useRef } from 'react';
import { Pill, Plus, User, Settings, Bell, Clock, ArrowRight, Sparkles, X, LoaderCircle, RefreshCw, Trash2, AlertTriangle, Save, LogOut, Pencil, Moon, Sun } from 'lucide-react';

// --- 1. INTERNATIONALIZATION (i18n) & TEXTS ---
const T = {
  fa: {
    // General
    appName: 'یادآور دارو', error: 'خطا', success: 'موفقیت', cancel: 'لغو', save: 'ذخیره', delete: 'حذف',
    // Greetings & Dates
    goodMorning: 'صبح بخیر', goodAfternoon: 'ظهر بخیر', goodEvening: 'عصر بخیر',
    morning: 'صبح', afternoon: 'ظهر', evening: 'شب',
    // Modals
    gotIt: 'فهمیدم', askAbout: 'پرسش در مورد', askPlaceholder: 'سوال خود را اینجا بنویسید...', getAiAnswer: '✨ دریافت پاسخ',
    confirmDeleteTitle: 'تایید حذف', confirmDeleteMsg: (name) => `آیا از حذف داروی "${name}" مطمئن هستید؟`,
    logoutTitle: 'خروج از حساب', logoutMsg: 'آیا برای خروج از حساب کاربری خود مطمئن هستید؟', logout: 'خروج',
    drugTime: 'وقت دارو!', drugTimeMsg: 'زمان مصرف داروی زیر فرا رسیده است:', snooze: '۵ دقیقه دیگر', iTookIt: 'مصرف کردم',
    // Registration
    regWelcome: 'به یادآور دارو خوش آمدید', regIntro: 'برای شروع، لطفا اطلاعات خود را وارد کنید.',
    firstName: 'نام', lastName: 'نام خانوادگی', mobile: 'شماره موبایل', license: 'کد لایسنس (اختیاری)',
    rememberMe: 'مرا به خاطر بسپار', registerAndStart: 'ثبت نام و شروع', welcome: 'خوش آمدید!', welcomeMsg: (name) => `ثبت‌نام شما با موفقیت انجام شد، ${name}.`,
    // Profile
    myProfile: 'پروفایل من', profileGreeting: 'سلامتی شما آرزوی ماست', userInfo: 'اطلاعات کاربری', usageReport: 'گزارش مصرف دارو', logoutFromAccount: 'خروج از حساب کاربری',
    // Edit Profile
    editProfileTitle: 'ویرایش اطلاعات کاربری',
    // Settings
    settings: 'تنظیمات', theme: 'پوسته برنامه', light: 'روشن', dark: 'تاریک', language: 'زبان', reminderNotification: 'اعلان یادآوری', reminderDesc: 'با فعال کردن این گزینه، زمان مصرف داروها به شما یادآوری می‌شود.',
    // Home
    healthyTip: 'نکته غذایی', medsOf: 'داروهای نوبت', noMeds: 'هنوز دارویی ثبت نکرده‌اید.', noMedsDesc: 'برای شروع، از دکمه "افزودن" در پایین صفحه استفاده کنید.',
    // Med Card
    taken: 'مصرف شد', pending: 'نشده', every: 'هر', hours: 'ساعت',
    // Drug Form
    addDrugTitle: 'ثبت داروی جدید', editDrugTitle: 'ویرایش دارو', drugName: 'نام دارو', dosage: 'دوز مصرف',
    consumptionTime: 'نوبت مصرف', exactTime: 'ساعت دقیق (مهم)', recurringReminder: 'یادآوری دوره‌ای', howOften: 'هر چند ساعت؟',
    saveDrug: 'ذخیره دارو', saveChanges: 'ذخیره تغییرات',
    // Nav Bar
    meds: 'داروها', add: 'افزودن', profile: 'پروفایل',
  },
  en: {
    // General
    appName: 'Med Reminder', error: 'Error', success: 'Success', cancel: 'Cancel', save: 'Save', delete: 'Delete',
    // Greetings & Dates
    goodMorning: 'Good Morning', goodAfternoon: 'Good Afternoon', goodEvening: 'Good Evening',
    morning: 'Morning', afternoon: 'Afternoon', evening: 'Evening',
    // Modals
    gotIt: 'Got it', askAbout: 'Ask about', askPlaceholder: 'Write your question here...', getAiAnswer: '✨ Get AI Answer',
    confirmDeleteTitle: 'Confirm Deletion', confirmDeleteMsg: (name) => `Are you sure you want to delete "${name}"?`,
    logoutTitle: 'Log Out', logoutMsg: 'Are you sure you want to log out?', logout: 'Log Out',
    drugTime: 'Medication Time!', drugTimeMsg: 'It\'s time to take the following medication:', snooze: 'Snooze (5 min)', iTookIt: 'I Took It',
    // Registration
    regWelcome: 'Welcome to Med Reminder', regIntro: 'To get started, please enter your information.',
    firstName: 'First Name', lastName: 'Last Name', mobile: 'Mobile Number', license: 'License Code (Optional)',
    rememberMe: 'Remember me', registerAndStart: 'Register and Start', welcome: 'Welcome!', welcomeMsg: (name) => `Your registration was successful, ${name}.`,
    // Profile
    myProfile: 'My Profile', profileGreeting: 'We wish you good health', userInfo: 'User Information', usageReport: 'Medication Usage Report', logoutFromAccount: 'Log Out from Account',
    // Edit Profile
    editProfileTitle: 'Edit Profile',
    // Settings
    settings: 'Settings', theme: 'App Theme', light: 'Light', dark: 'Dark', language: 'Language', reminderNotification: 'Reminder Notifications', reminderDesc: 'Enable this to get reminders for your medications.',
    // Home
    healthyTip: 'Healthy Tip', medsOf: 'Medications for', noMeds: 'No medications added yet.', noMedsDesc: 'Use the "Add" button below to get started.',
    // Med Card
    taken: 'Taken', pending: 'Pending', every: 'Every', hours: 'hours',
    // Drug Form
    addDrugTitle: 'Add New Medication', editDrugTitle: 'Edit Medication', drugName: 'Medication Name', dosage: 'Dosage',
    consumptionTime: 'Time of Day', exactTime: 'Exact Time (Important)', recurringReminder: 'Recurring Reminder', howOften: 'How often?',
    saveDrug: 'Save Medication', saveChanges: 'Save Changes',
    // Nav Bar
    meds: 'Meds', add: 'Add', profile: 'Profile',
  }
};

// --- 2. HELPER COMPONENTS & DATA ---

const PillIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/></svg>
);

const initialMedications = (lang) => {
    const t = T[lang];
    return [
      { id: 1, name: 'Vitamin D', dosage: lang === 'fa' ? '1 عدد' : '1 pill', time: t.morning, specificTime: '08:00', isRecurring: false, reminderInterval: null, taken: true },
      { id: 2, name: 'Aspirin', dosage: lang === 'fa' ? 'نصف قرص' : 'Half pill', time: t.morning, specificTime: '08:30', isRecurring: false, reminderInterval: null, taken: false },
      { id: 3, name: 'Antibiotic', dosage: lang === 'fa' ? '1 عدد' : '1 pill', time: t.afternoon, specificTime: '14:00', isRecurring: true, reminderInterval: 8, taken: false },
      { id: 4, name: 'Omega 3', dosage: lang === 'fa' ? '1 عدد' : '1 pill', time: t.evening, specificTime: '21:00', isRecurring: false, reminderInterval: null, taken: false },
    ];
};

const getTimeGreeting = (lang) => {
    const hour = new Date().getHours();
    const t = T[lang];
    if (hour < 12) return t.goodMorning;
    if (hour < 18) return t.goodAfternoon;
    return t.goodEvening;
};

const AlarmSound = {
  audioContext: null,
  oscillator: null,
  gainNode: null,
  isPlaying: false,
  setup() {
    if (typeof window !== 'undefined' && !this.audioContext) {
      try {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      } catch (e) {
        console.error("AudioContext is not supported.", e);
      }
    }
  },
  play() {
    this.setup();
    if (!this.audioContext || this.isPlaying) return;
    this.isPlaying = true;
    this.oscillator = this.audioContext.createOscillator();
    this.gainNode = this.audioContext.createGain();
    this.oscillator.connect(this.gainNode);
    this.gainNode.connect(this.audioContext.destination);
    this.oscillator.type = 'sine';
    this.oscillator.frequency.setValueAtTime(880, this.audioContext.currentTime);
    this.gainNode.gain.setValueAtTime(0.5, this.audioContext.currentTime);
    this.gainNode.gain.exponentialRampToValueAtTime(0.0001, this.audioContext.currentTime + 1.5);
    this.oscillator.start();
    this.oscillator.stop(this.audioContext.currentTime + 1.5);
    this.oscillator.onended = () => { this.isPlaying = false; };
  },
  stop() {
    if (this.oscillator) { this.oscillator.stop(); }
  }
};

// --- 3. MODAL COMPONENTS ---

const InfoModal = ({ title, message, onClose, lang }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" dir={lang === 'fa' ? 'rtl' : 'ltr'}>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 max-w-sm w-full">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">{title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6" style={{ whiteSpace: 'pre-wrap' }}>{message}</p>
            <button onClick={onClose} className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-transform transform active:scale-95">{T[lang].gotIt}</button>
        </div>
    </div>
);

const AskAiModal = ({ medication, onClose, lang }) => {
    const t = T[lang];
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const handleAskGemini = async () => {
        if (!question) { setError('Please enter your question.'); return; }
        setIsLoading(true); setError(''); setAnswer('');
        const prompt = `You are a helpful health assistant for seniors. Answer the following question about the medication "${medication.name}" in simple, clear, and short language (${lang}). Question: "${question}". Important: At the end of your answer, you must include this sentence: "Note: This answer is not a substitute for medical advice. Be sure to consult your doctor or pharmacist."`;
        try {
            const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };
            const apiKey = ""; // Should be handled via a secure backend
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
            const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            if (!response.ok) throw new Error('Error connecting to the AI service.');
            const result = await response.json();
            if (result.candidates && result.candidates[0]?.content?.parts[0]?.text) { setAnswer(result.candidates[0].content.parts[0].text); } else { throw new Error('No response received. Please try again.'); }
        } catch (e) { setError(e.message || 'An unexpected error occurred.'); } finally { setIsLoading(false); }
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4" onClick={onClose} dir={lang === 'fa' ? 'rtl' : 'ltr'}>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-2xl p-6 max-w-lg w-full transform transition-all" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4"><h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center"><Sparkles className="w-6 h-6 text-yellow-500 mx-2" />{t.askAbout} {medication.name}</h3><button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={28} /></button></div>
                <div className="space-y-4"><textarea value={question} onChange={(e) => setQuestion(e.target.value)} className="w-full p-3 text-lg border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-blue-500 focus:border-blue-500" rows="3" placeholder={t.askPlaceholder} /><button onClick={handleAskGemini} disabled={isLoading} className="w-full bg-blue-600 text-white text-lg font-bold py-3 rounded-xl hover:bg-blue-700 flex items-center justify-center disabled:bg-blue-300 transition-transform transform active:scale-95">{isLoading ? <LoaderCircle className="animate-spin w-6 h-6" /> : t.getAiAnswer}</button></div>
                {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
                {answer && <div className="mt-6 p-4 bg-blue-50 dark:bg-gray-700 border-r-4 border-blue-400 rounded-lg"><p className="text-gray-700 dark:text-gray-200 whitespace-pre-wrap">{answer}</p></div>}
            </div>
        </div>
    );
};

const ConfirmationModal = ({ title, message, onConfirm, onCancel, confirmText, lang }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" dir={lang === 'fa' ? 'rtl' : 'ltr'}>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 max-w-sm w-full">
            <div className={`flex items-center mb-4 ${lang === 'fa' ? 'text-right' : 'text-left'}`}><AlertTriangle className="w-8 h-8 text-red-500 shrink-0 mx-3"/><h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">{title}</h3></div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{message}</p>
            <div className={`flex gap-3 justify-end`}>
                <button onClick={onCancel} className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100 font-bold py-2 px-6 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-500 transition-transform transform active:scale-95">{T[lang].cancel}</button>
                <button onClick={onConfirm} className="bg-red-600 text-white font-bold py-2 px-6 rounded-xl hover:bg-red-700 transition-transform transform active:scale-95">{confirmText}</button>
            </div>
        </div>
    </div>
);

const AlarmModal = ({ medication, onSnooze, onTake, onClose, lang }) => {
    const t = T[lang];
    useEffect(() => {
        const interval = setInterval(() => AlarmSound.play(), 2000);
        return () => { clearInterval(interval); AlarmSound.stop(); };
    }, []);
    const handleTake = () => { onTake(medication.id); onClose(); };
    const handleSnooze = () => { onSnooze(medication.id); onClose(); };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-[100] p-4" dir={lang === 'fa' ? 'rtl' : 'ltr'}>
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center border-t-8 border-blue-500">
                <Bell className="w-20 h-20 text-blue-500 mx-auto animate-bounce"/>
                <h3 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100 mt-4 mb-2">{t.drugTime}</h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">{t.drugTimeMsg}</p>
                <div className="bg-blue-50 dark:bg-blue-900/50 p-4 rounded-xl my-6">
                    <p className="text-2xl font-bold text-blue-800 dark:text-blue-300">{medication.name}</p>
                    <p className="text-lg text-blue-600 dark:text-blue-400 mt-1">{medication.dosage}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <button onClick={handleSnooze} className="w-full bg-amber-500 text-white font-bold py-3 rounded-xl hover:bg-amber-600 transition-transform transform active:scale-95">{t.snooze}</button>
                    <button onClick={handleTake} className="w-full bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700 transition-transform transform active:scale-95">{t.iTookIt}</button>
                </div>
            </div>
        </div>
    );
};

// --- 4. FULL PAGE COMPONENTS ---

const RegistrationPage = ({ onRegister, setModalInfo, lang }) => {
    const t = T[lang];
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobile, setMobile] = useState('');
    const [licenseCode, setLicenseCode] = useState('');
    const [rememberMe, setRememberMe] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!firstName || !lastName) {
            setModalInfo({ title: t.error, message: "Please enter first and last name." });
            return;
        }
        onRegister({ firstName, lastName, mobile, licenseCode }, rememberMe);
    };

    return (
        <div className="max-w-md mx-auto p-4 pt-10">
            <div className="text-center mb-8">
                <Pill className="mx-auto text-blue-500 w-16 h-16" />
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mt-4">{t.regWelcome}</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">{t.regIntro}</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
                <div><label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">{t.firstName}</label><input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} className="w-full p-4 text-lg border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-blue-500 focus:border-blue-500" /></div>
                <div><label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">{t.lastName}</label><input type="text" value={lastName} onChange={e => setLastName(e.target.value)} className="w-full p-4 text-lg border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-blue-500 focus:border-blue-500" /></div>
                <div><label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">{t.mobile}</label><input type="tel" value={mobile} onChange={e => setMobile(e.target.value)} className="w-full p-4 text-lg border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-blue-500 focus:border-blue-500" /></div>
                <div><label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">{t.license}</label><input type="text" value={licenseCode} onChange={e => setLicenseCode(e.target.value)} className="w-full p-4 text-lg border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-blue-500 focus:border-blue-500" /></div>
                <div className="flex items-center">
                    <input id="remember-me" type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                    <label htmlFor="remember-me" className="mx-2 block text-md text-gray-700 dark:text-gray-300">{t.rememberMe}</label>
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white text-xl font-bold py-4 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-transform transform active:scale-95">{t.registerAndStart}</button>
            </form>
        </div>
    );
};

const EditProfilePage = ({ userProfile, onSave, onCancel, setModalInfo, lang }) => {
    const t = T[lang];
    const [profile, setProfile] = useState(userProfile);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!profile.firstName || !profile.lastName) {
            setModalInfo({ title: t.error, message: "Please fill all required fields." });
            return;
        }
        onSave(profile);
    };

    return (
        <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">{t.editProfileTitle}</h1>
            <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
                <div><label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">{t.firstName}</label><input type="text" name="firstName" value={profile.firstName} onChange={handleChange} className="w-full p-4 text-lg border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-blue-500 focus:border-blue-500" /></div>
                <div><label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">{t.lastName}</label><input type="text" name="lastName" value={profile.lastName} onChange={handleChange} className="w-full p-4 text-lg border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-blue-500 focus:border-blue-500" /></div>
                <div><label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">{t.mobile}</label><input type="tel" name="mobile" value={profile.mobile} onChange={handleChange} className="w-full p-4 text-lg border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-blue-500 focus:border-blue-500" /></div>
                <div><label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">{t.license}</label><input type="text" name="licenseCode" value={profile.licenseCode} readOnly className="w-full p-4 text-lg border-2 border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-900 rounded-xl" /></div>
                <div className="flex gap-4 pt-2">
                    <button type="button" onClick={onCancel} className="w-full bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100 text-xl font-bold py-4 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-500 transition-transform transform active:scale-95">{t.cancel}</button>
                    <button type="submit" className="w-full bg-green-600 text-white text-xl font-bold py-4 rounded-xl hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition-transform transform active:scale-95 flex items-center justify-center"><Save className="mx-2"/>{t.save}</button>
                </div>
            </form>
        </div>
    );
};

const ProfilePage = ({ userProfile, setCurrentPage, onLogout, lang }) => {
    const t = T[lang];
    return(
    <div className="max-w-md mx-auto text-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">{t.myProfile}</h1>
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md flex flex-col items-center">
            <div className="w-32 h-32 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mb-4"><User className="w-20 h-20 text-blue-500" /></div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">{userProfile.firstName} {userProfile.lastName}</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">{t.profileGreeting}</p>
        </div>
        <div className={`mt-6 space-y-3 ${lang === 'fa' ? 'text-right' : 'text-left'}`}>
            <button onClick={() => setCurrentPage('editProfile')} className="w-full flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"><span className="font-semibold text-gray-700 dark:text-gray-200">{t.userInfo}</span><ArrowRight className="w-5 h-5 text-gray-400 transform data-[dir=rtl]:rotate-180" data-dir={lang === 'fa' ? 'rtl' : 'ltr'}/></button>
            <a href="#" className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"><span className="font-semibold text-gray-700 dark:text-gray-200">{t.usageReport}</span><ArrowRight className="w-5 h-5 text-gray-400 transform data-[dir=rtl]:rotate-180" data-dir={lang === 'fa' ? 'rtl' : 'ltr'}/></a>
            <button onClick={onLogout} className="w-full flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/50 transition-colors"><span className="font-semibold flex items-center"><LogOut className="w-5 h-5 mx-2"/>{t.logoutFromAccount}</span><ArrowRight className="w-5 h-5 text-red-400 transform data-[dir=rtl]:rotate-180" data-dir={lang === 'fa' ? 'rtl' : 'ltr'}/></button>
        </div>
    </div>
)};

const SettingsPage = ({ theme, setTheme, lang, setLang, notificationEnabled, setNotificationEnabled }) => {
    const t = T[lang];
    return (
        <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8">{t.settings}</h1>
            <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-md space-y-6">
                 <div>
                    <label className="text-lg font-semibold text-gray-700 dark:text-gray-300">{t.theme}</label>
                    <div className="mt-2 flex rounded-lg border-2 border-gray-200 dark:border-gray-700 overflow-hidden">
                        <button onClick={() => setTheme('light')} className={`w-full p-3 font-semibold transition-colors flex items-center justify-center gap-2 ${theme === 'light' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}><Sun size={18} />{t.light}</button>
                        <button onClick={() => setTheme('dark')} className={`w-full p-3 font-semibold transition-colors flex items-center justify-center gap-2 ${theme === 'dark' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}><Moon size={18} />{t.dark}</button>
                    </div>
                </div>
                 <div>
                     <label className="text-lg font-semibold text-gray-700 dark:text-gray-300">{t.language}</label>
                     <div className="mt-2 flex rounded-lg border-2 border-gray-200 dark:border-gray-700 overflow-hidden">
                        <button onClick={() => setLang('fa')} className={`w-full p-3 font-semibold transition-colors ${lang === 'fa' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>فارسی</button>
                        <button onClick={() => setLang('en')} className={`w-full p-3 font-semibold transition-colors ${lang === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>English</button>
                    </div>
                </div>
                <div>
                     <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">{t.reminderNotification}</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" checked={notificationEnabled} onChange={() => setNotificationEnabled(p => !p)} className="sr-only peer" />
                            <div className="w-14 h-8 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">{t.reminderDesc}</p>
                </div>
            </div>
        </div>
    );
};

const DrugFormPage = ({ initialData = {}, onSave, onCancel, lang }) => {
    const t = T[lang];
    const [name, setName] = useState(initialData.name || '');
    const [dosage, setDosage] = useState(initialData.dosage || '');
    const [time, setTime] = useState(initialData.time || t.morning);
    const [specificTime, setSpecificTime] = useState(initialData.specificTime || '');
    const [isRecurring, setIsRecurring] = useState(initialData.isRecurring || false);
    const [reminderInterval, setReminderInterval] = useState(initialData.reminderInterval || 8);
    
    const pageTitle = initialData.id ? t.editDrugTitle : t.addDrugTitle;
    const saveButtonText = initialData.id ? t.saveChanges : t.saveDrug;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !dosage || !specificTime) {
            alert("Please fill all required fields."); // Replace with a modal in a real app
            return;
        }
        onSave({ ...initialData, name, dosage, time, specificTime, isRecurring, reminderInterval: isRecurring ? reminderInterval : null });
    };

    return (
        <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">{pageTitle}</h1>
            <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
                <div><label htmlFor="drugName" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">{t.drugName}</label><input type="text" id="drugName" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-4 text-lg border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-blue-500 focus:border-blue-500" /></div>
                <div><label htmlFor="dosage" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">{t.dosage}</label><input type="text" id="dosage" value={dosage} onChange={(e) => setDosage(e.target.value)} className="w-full p-4 text-lg border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-blue-500 focus:border-blue-500" /></div>
                <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">{t.consumptionTime}</label><select value={time} onChange={(e) => setTime(e.target.value)} className="w-full p-4 text-lg border-2 bg-white dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600 rounded-xl focus:ring-blue-500 focus:border-blue-500"><option value={t.morning}>{t.morning}</option><option value={t.afternoon}>{t.afternoon}</option><option value={t.evening}>{t.evening}</option></select></div>
                    <div><label htmlFor="specificTime" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">{t.exactTime}</label><input type="time" id="specificTime" value={specificTime} onChange={(e) => setSpecificTime(e.target.value)} className="w-full p-4 text-lg border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-blue-500 focus:border-blue-500"/></div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-900/50 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between"><label htmlFor="recurring" className="text-lg font-medium text-gray-700 dark:text-gray-300 flex items-center"><RefreshCw className="w-5 h-5 mx-2"/>{t.recurringReminder}</label><label className="relative inline-flex items-center cursor-pointer"><input type="checkbox" id="recurring" checked={isRecurring} onChange={() => setIsRecurring(!isRecurring)} className="sr-only peer" /><div className="w-14 h-8 bg-gray-300 peer-focus:outline-none rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div></label></div>
                    {isRecurring && (<div className="mt-4"><label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">{t.howOften}</label><div className="grid grid-cols-3 gap-3">{[6, 8, 12].map(interval => (<button key={interval} type="button" onClick={() => setReminderInterval(interval)} className={`p-4 text-lg font-semibold rounded-xl border-2 transition-colors ${reminderInterval === interval ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600'}`}>{interval} {t.hours}</button>))}</div></div>)}
                </div>
                <div className="flex gap-4">
                    <button type="button" onClick={onCancel} className="w-full bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100 text-xl font-bold py-4 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-500 transition-transform transform active:scale-95">{t.cancel}</button>
                    <button type="submit" className="w-full bg-blue-600 text-white text-xl font-bold py-4 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-transform transform active:scale-95">{saveButtonText}</button>
                </div>
            </form>
        </div>
    );
};

const BottomNavBar = ({ currentPage, setCurrentPage, lang }) => {
    const t = T[lang];
    const navItems = [ { id: 'home', icon: Pill, label: t.meds }, { id: 'add', icon: Plus, label: t.add }, { id: 'profile', icon: User, label: t.profile }, { id: 'settings', icon: Settings, label: t.settings } ];
    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 shadow-lg">
            <div className="flex justify-around max-w-lg mx-auto">
                {navItems.map(item => (
                    <button key={item.id} onClick={() => setCurrentPage(item.id)} className={`flex flex-col items-center justify-center w-full py-2 text-sm transition-colors duration-200 ${currentPage === item.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400'}`}>
                        <item.icon className="w-6 h-6 mb-1" />
                        <span>{item.label}</span>
                    </button>
                ))}
            </div>
        </nav>
    );
};

// --- 5. MAIN APP COMPONENT ---
export default function App() {
    const [currentPage, setCurrentPage] = useState('home');
    const [medications, setMedications] = useState([]);
    const [userProfile, setUserProfile] = useState(null);
    const [isRegistered, setIsRegistered] = useState(false);
    const [theme, setTheme] = useState('light');
    const [lang, setLang] = useState('fa');
    const [notificationEnabled, setNotificationEnabled] = useState(true);
    const [modalInfo, setModalInfo] = useState(null);
    const [askAiModalMed, setAskAiModalMed] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [editingMedication, setEditingMedication] = useState(null);
    const [alarmModalMed, setAlarmModalMed] = useState(null);
    const [confirmLogout, setConfirmLogout] = useState(false);
    const triggeredAlarms = useRef(new Set());

    // --- Effects for loading and saving data ---
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        const savedLang = localStorage.getItem('lang') || 'fa';
        setTheme(savedTheme);
        setLang(savedLang);

        try {
            const savedMeds = localStorage.getItem('medications');
            setMedications(savedMeds ? JSON.parse(savedMeds) : initialMedications(savedLang));
        
            const savedProfile = localStorage.getItem('userProfile');
            if (savedProfile) {
                setUserProfile(JSON.parse(savedProfile));
                setIsRegistered(true);
            }
        } catch (e) {
            console.error("Failed to load data from storage, resetting.", e);
            setMedications(initialMedications(savedLang));
            localStorage.clear();
        }
    }, []);

    useEffect(() => {
        if (theme === 'dark') document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', theme);
    }, [theme]);
    
    useEffect(() => {
        localStorage.setItem('lang', lang);
        document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
    }, [lang]);

    useEffect(() => {
        try {
            if (medications.length > 0) {
                 localStorage.setItem('medications', JSON.stringify(medications));
            }
        } catch(e) { console.error("Failed to save medications:", e); }
    }, [medications]);
    

    // --- Handlers ---
    const handleToggleTaken = (id) => {
        setMedications(meds => meds.map(med => (med.id === id ? { ...med, taken: !med.taken } : med)));
    };
    
    const handleRegistration = (profileData, rememberMe) => {
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem('userProfile', JSON.stringify(profileData));
        setUserProfile(profileData);
        setIsRegistered(true);
        setModalInfo({ title: T[lang].welcome, message: T[lang].welcomeMsg(profileData.firstName) });
    };

    const handleProfileUpdate = (profileData) => {
        let storageUsed = localStorage.getItem('userProfile') ? localStorage : sessionStorage;
        storageUsed.setItem('userProfile', JSON.stringify(profileData));
        setUserProfile(profileData);
        setCurrentPage('profile');
        setModalInfo({ title: T[lang].success, message: "Profile updated successfully." });
    };

    const handleLogout = () => {
        localStorage.removeItem('userProfile');
        sessionStorage.removeItem('userProfile');
        setUserProfile(null);
        setIsRegistered(false);
        setConfirmLogout(false);
    };

    const addMedication = (med) => {
        const newMed = { ...med, id: Date.now(), taken: false };
        setMedications(prevMeds => [...prevMeds, newMed].sort((a,b) => (a.specificTime || "00:00").localeCompare(b.specificTime || "00:00")));
        setCurrentPage('home');
    };
  
    const updateMedication = (updatedMed) => {
        setMedications(meds => meds.map(med => (med.id === updatedMed.id ? updatedMed : med)).sort((a,b) => (a.specificTime || "00:00").localeCompare(b.specificTime || "00:00")));
        setCurrentPage('home');
        setEditingMedication(null);
    };

    const deleteMedication = (id) => { 
        setMedications(meds => meds.filter(med => med.id !== id)); 
        setConfirmDelete(null);
    };
    
    const snoozeMedication = (id) => {
      triggeredAlarms.current.delete(id);
      setMedications(meds => meds.map(med => {
          if (med.id === id) {
              const now = new Date();
              now.setMinutes(now.getMinutes() + 5);
              const newTime = now.toTimeString().slice(0,5);
              return { ...med, specificTime: newTime };
          }
          return med;
      }));
    };

    // --- Alarm Logic ---
    useEffect(() => {
        if (!notificationEnabled) return;
        const interval = setInterval(() => {
            const now = new Date();
            const currentTime = now.toTimeString().slice(0, 5);
            // Reset daily state at midnight
            if (currentTime === '00:00' && !triggeredAlarms.current.has('midnight_reset')) {
                triggeredAlarms.current.clear();
                setMedications(meds => meds.map(m => ({ ...m, taken: false })));
                triggeredAlarms.current.add('midnight_reset');
            } else if (currentTime !== '00:00') {
                triggeredAlarms.current.delete('midnight_reset');
            }
            // Check for medication alarms
            const upcomingMed = medications.find(med => !med.taken && med.specificTime === currentTime && !triggeredAlarms.current.has(med.id));
            if (upcomingMed) { 
                setAlarmModalMed(upcomingMed); 
                triggeredAlarms.current.add(upcomingMed.id); 
            }
        }, 30000); // Check every 30 seconds
        return () => clearInterval(interval);
    }, [medications, notificationEnabled]);


    // --- Page Rendering Logic ---
    const RenderPage = () => {
        if (!isRegistered) {
            return <RegistrationPage onRegister={handleRegistration} setModalInfo={setModalInfo} lang={lang} />;
        }

        switch (currentPage) {
            case 'add': 
                return <DrugFormPage onSave={addMedication} onCancel={() => setCurrentPage('home')} lang={lang}/>;
            case 'editMedication':
                return <DrugFormPage initialData={editingMedication} onSave={updateMedication} onCancel={() => setCurrentPage('home')} lang={lang}/>;
            case 'profile': 
                return <ProfilePage userProfile={userProfile} setCurrentPage={setCurrentPage} onLogout={() => setConfirmLogout(true)} lang={lang} />;
            case 'editProfile':
                 return <EditProfilePage userProfile={userProfile} onSave={handleProfileUpdate} onCancel={() => setCurrentPage('profile')} setModalInfo={setModalInfo} lang={lang}/>;
            case 'settings':
                return <SettingsPage theme={theme} setTheme={setTheme} lang={lang} setLang={setLang} notificationEnabled={notificationEnabled} setNotificationEnabled={setNotificationEnabled} />;
            default:
                return <HomePage medications={medications} userProfile={userProfile} onToggleTaken={handleToggleTaken} lang={lang} onDeleteRequest={setConfirmDelete} onEditRequest={setEditingMedication} />;
        }
    };

    return (
        <div className="font-sans bg-gray-100 dark:bg-gray-900 min-h-screen flex flex-col">
            {modalInfo && <InfoModal title={modalInfo.title} message={modalInfo.message} onClose={() => setModalInfo(null)} lang={lang} />}
            {askAiModalMed && <AskAiModal medication={askAiModalMed} onClose={() => setAskAiModalMed(null)} lang={lang} />}
            {alarmModalMed && <AlarmModal medication={alarmModalMed} onClose={() => setAlarmModalMed(null)} onTake={handleToggleTaken} onSnooze={snoozeMedication} lang={lang} />}
            {confirmLogout && <ConfirmationModal title={T[lang].logoutTitle} message={T[lang].logoutMsg} onConfirm={handleLogout} onCancel={() => setConfirmLogout(false)} confirmText={T[lang].logout} lang={lang}/>}
            {confirmDelete && <ConfirmationModal title={T[lang].confirmDeleteTitle} message={T[lang].confirmDeleteMsg(confirmDelete.name)} onConfirm={() => deleteMedication(confirmDelete.id)} onCancel={() => setConfirmDelete(null)} confirmText={T[lang].delete} lang={lang}/>}

            <main className="flex-grow p-4 pb-24">
                <RenderPage />
            </main>
            
            <BottomNavBar currentPage={currentPage} setCurrentPage={setCurrentPage} lang={lang} />
        </div>
    );
}
