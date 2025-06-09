import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { Pill, Plus, User, Settings, Bell, Clock, ArrowRight, Sparkles, X, LoaderCircle, RefreshCw, Trash2, AlertTriangle, Save, LogOut, Pencil, Languages } from 'lucide-react';

// --- I18N (TRANSLATION) SETUP ---

const translations = {
  en: {
    // General
    appName: "Pill Reminder",
    ok: "OK",
    cancel: "Cancel",
    delete: "Delete",
    save: "Save",
    edit: "Edit",
    add: "Add",
    morning: "Morning",
    afternoon: "Afternoon",
    evening: "Evening",
    // Greetings
    goodMorning: "Good Morning",
    goodAfternoon: "Good Afternoon",
    goodEvening: "Good Evening",
    // Modals
    info: "Info",
    success: "Success",
    error: "Error",
    confirmDeleteTitle: "Confirm Deletion",
    confirmDeleteMessage: "Are you sure you want to delete the medication \"{name}\"?",
    confirmLogoutTitle: "Confirm Logout",
    confirmLogoutMessage: "Are you sure you want to log out?",
    alarmTitle: "Medication Time!",
    alarmMessage: "It's time to take your medication:",
    snooze: "5 more minutes",
    iTookIt: "I took it",
    askAiAbout: "Ask AI about {name}",
    askYourQuestion: "Ask your question here... e.g., What are the side effects?",
    getAiAnswer: "✨ Get AI Answer",
    aiDisclaimer: "Note: This answer is not a substitute for medical advice. Always consult your doctor or pharmacist.",
    // Registration Page
    welcome: "Welcome to Pill Reminder",
    getStarted: "To get started, please enter your information.",
    firstName: "First Name",
    lastName: "Last Name",
    mobileNumber: "Mobile Number",
    licenseCode: "License Code (Optional)",
    rememberMe: "Remember me",
    registerAndStart: "Register & Start",
    fillFieldsError: "Please fill in your first name, last name, and mobile number.",
    welcomeMessage: "Welcome! Your registration was successful, {name}.",
    // Profile & Settings
    myProfile: "My Profile",
    yourHealthIsOurWish: "Your health is our wish",
    userInfo: "User Information",
    medicationReport: "Medication Report",
    logout: "Logout",
    settings: "Settings",
    reminderNotification: "Reminder Notification",
    reminderNotificationDesc: "When enabled, you will be reminded when it's time to take your medication.",
    language: "Language",
    languageDesc: "Choose the display language of the application.",
    // Home Page
    medications: "Medications",
    medsForTime: "Medications for {time}",
    noMedsYet: "You haven't added any medications yet.",
    noMedsYetDesc: "Use the 'Add' button at the bottom to get started.",
    healthyTip: "Health Tip",
    // Medication Card
    dosage: "Dosage",
    taken: "Taken",
    notTaken: "Not Taken",
    everyNHours: "Every {n} hours",
    // Drug Form
    addDrugTitle: "Add New Medication",
    editDrugTitle: "Edit Medication",
    saveChanges: "Save Changes",
    drugName: "Medication Name",
    drugDosage: "Dosage",
    timeOfDay: "Time of Day",
    exactTime: "Exact Time",
    recurringReminder: "Recurring Reminder",
    howManyHours: "Every how many hours?",
    nHours: "{n} hours",
    formError: "Please enter the medication name, dosage, and exact time.",
    medAddedSuccess: "Medication {name} was added successfully.",
    medUpdatedSuccess: "Medication {name} was updated successfully.",
    medDeletedSuccess: "Medication was successfully deleted.",
  },
  fa: {
    // General
    appName: "یادآور دارو",
    ok: "فهمیدم",
    cancel: "لغو",
    delete: "حذف",
    save: "ذخیره",
    edit: "ویرایش",
    add: "افزودن",
    morning: "صبح",
    afternoon: "ظهر",
    evening: "شب",
    // Greetings
    goodMorning: "صبح بخیر",
    goodAfternoon: "ظهر بخیر",
    goodEvening: "عصر بخیر",
    // Modals
    info: "اطلاع",
    success: "موفقیت",
    error: "خطا",
    confirmDeleteTitle: "تایید حذف",
    confirmDeleteMessage: "آیا از حذف داروی «{name}» مطمئن هستید؟",
    confirmLogoutTitle: "خروج از حساب",
    confirmLogoutMessage: "آیا برای خروج از حساب کاربری خود مطمئن هستید؟",
    alarmTitle: "وقت دارو!",
    alarmMessage: "زمان مصرف داروی زیر فرا رسیده است:",
    snooze: "۵ دقیقه دیگر",
    iTookIt: "مصرف کردم",
    askAiAbout: "پرسش در مورد {name}",
    askYourQuestion: "سوال خود را اینجا بنویسید... مثلا: عوارض این دارو چیست؟",
    getAiAnswer: "✨ دریافت پاسخ از هوش مصنوعی",
    aiDisclaimer: "توجه: این پاسخ جایگزین توصیه پزشک نیست. حتما با پزشک یا داروساز خود مشورت کنید.",
    // Registration Page
    welcome: "به یادآور دارو خوش آمدید",
    getStarted: "برای شروع، لطفا اطلاعات خود را وارد کنید.",
    firstName: "نام",
    lastName: "نام خانوادگی",
    mobileNumber: "شماره موبایل",
    licenseCode: "کد لایسنس (اختیاری)",
    rememberMe: "مرا به خاطر بسپار",
    registerAndStart: "ثبت نام و شروع",
    fillFieldsError: "لطفا نام، نام خانوادگی و شماره موبایل را وارد کنید.",
    welcomeMessage: "خوش آمدید! ثبت‌نام شما با موفقیت انجام شد، {name}.",
    // Profile & Settings
    myProfile: "پروفایل من",
    yourHealthIsOurWish: "سلامتی شما آرزوی ماست",
    userInfo: "اطلاعات کاربری",
    medicationReport: "گزارش مصرف دارو",
    logout: "خروج از حساب کاربری",
    settings: "تنظیمات",
    reminderNotification: "اعلان یادآوری",
    reminderNotificationDesc: "با فعال کردن این گزینه، زمان مصرف داروها به شما یادآوری می‌شود.",
    language: "زبان",
    languageDesc: "زبان نمایش اپلیکیشن را انتخاب کنید.",
    // Home Page
    medications: "داروها",
    medsForTime: "داروهای نوبت {time}",
    noMedsYet: "هنوز دارویی ثبت نکرده‌اید.",
    noMedsYetDesc: "برای شروع، از دکمه «افزودن» در پایین صفحه استفاده کنید.",
    healthyTip: "نکته غذایی",
    // Medication Card
    dosage: "دوز مصرف",
    taken: "مصرف شد",
    notTaken: "نشده",
    everyNHours: "هر {n} ساعت",
    // Drug Form
    addDrugTitle: "ثبت داروی جدید",
    editDrugTitle: "ویرایش دارو",
    saveChanges: "ذخیره تغییرات",
    drugName: "نام دارو",
    drugDosage: "دوز مصرف",
    timeOfDay: "نوبت مصرف",
    exactTime: "ساعت دقیق",
    recurringReminder: "یادآوری دوره‌ای",
    howManyHours: "هر چند ساعت؟",
    nHours: "{n} ساعت",
    formError: "لطفاً نام دارو، دوز مصرف و ساعت دقیق را وارد کنید.",
    medAddedSuccess: "داروی {name} با موفقیت اضافه شد.",
    medUpdatedSuccess: "داروی {name} با موفقیت ویرایش شد.",
    medDeletedSuccess: "دارو با موفقیت حذف شد.",
  }
};

const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(localStorage.getItem('language') || 'fa');

    useEffect(() => {
        localStorage.setItem('language', language);
        document.documentElement.dir = language === 'fa' ? 'rtl' : 'ltr';
        document.documentElement.lang = language;
    }, [language]);

    const t = (key, params = {}) => {
        let translation = translations[language][key] || key;
        Object.keys(params).forEach(param => {
            translation = translation.replace(`{${param}}`, params[param]);
        });
        return translation;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useTranslation = () => useContext(LanguageContext);

// --- MOCK DATA & HELPERS ---
const initialMedications = [
  { id: 1, name: 'Vitamin D', dosage: '1 pill', time: 'morning', specificTime: '08:00', isRecurring: false, reminderInterval: null, taken: true },
  { id: 2, name: 'Aspirin', dosage: 'Half pill', time: 'morning', specificTime: '08:30', isRecurring: false, reminderInterval: null, taken: false },
  { id: 3, name: 'Antibiotic', dosage: '1 pill', time: 'afternoon', specificTime: '14:00', isRecurring: true, reminderInterval: 8, taken: false },
  { id: 4, name: 'Omega 3', dosage: '1 pill', time: 'evening', specificTime: '21:00', isRecurring: false, reminderInterval: null, taken: false },
];

const getTimeGreetingKey = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'goodMorning';
    if (hour < 18) return 'goodAfternoon';
    return 'goodEvening';
};

const AlarmSound = {
  audioContext: null,
  oscillator: null,
  gainNode: null,
  isPlaying: false,
  setup() { if (typeof window !== 'undefined' && !this.audioContext) { this.audioContext = new (window.AudioContext || window.webkitAudioContext)(); } },
  play() {
    this.setup();
    if (!this.audioContext || this.isPlaying) return;
    this.isPlaying = true; this.oscillator = this.audioContext.createOscillator(); this.gainNode = this.audioContext.createGain(); this.oscillator.connect(this.gainNode); this.gainNode.connect(this.audioContext.destination); this.oscillator.type = 'sine'; this.oscillator.frequency.setValueAtTime(880, this.audioContext.currentTime); this.gainNode.gain.setValueAtTime(0.5, this.audioContext.currentTime); this.gainNode.gain.exponentialRampToValueAtTime(0.0001, this.audioContext.currentTime + 1); this.oscillator.start(); this.oscillator.onended = () => { this.isPlaying = false; if (this.oscillator) this.oscillator.disconnect(); if (this.gainNode) this.gainNode.disconnect(); }; this.oscillator.stop(this.audioContext.currentTime + 1);
  },
  stop() { if (this.oscillator) { this.oscillator.stop(); } }
};

// --- MODAL COMPONENTS ---
const InfoModal = ({ title, message, onClose }) => {
    const { t } = useTranslation();
    return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 max-w-sm w-full">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">{title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6" style={{ whiteSpace: 'pre-wrap' }}>{message}</p>
            <button onClick={onClose} className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-transform transform active:scale-95">{t('ok')}</button>
        </div>
    </div>
)};

const AskAiModal = ({ medication, onClose }) => {
    const { t, language } = useTranslation();
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const handleAskGemini = async () => {
        if (!question) { setError(t('error')); return; }
        setIsLoading(true); setError(''); setAnswer('');
        const prompt = `You are a helpful health assistant for the elderly. Answer the following question about the medication "${medication.name}" in simple, clear, and concise ${language === 'fa' ? 'Persian' : 'English'}. Question: "${question}". Very important note: At the end of your response, you MUST include this sentence: "${t('aiDisclaimer')}"`;
        try {
            const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };
            const apiKey = "";
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
            const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            if (!response.ok) throw new Error('Error communicating with AI service.');
            const result = await response.json();
            if (result.candidates && result.candidates[0]?.content?.parts[0]?.text) { setAnswer(result.candidates[0].content.parts[0].text); } else { throw new Error('No response received. Please try again.'); }
        } catch (e) { setError(e.message || 'An unexpected error occurred.'); } finally { setIsLoading(false); }
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4" onClick={onClose}>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-2xl p-6 max-w-lg w-full transform transition-all" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4"><h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center"><Sparkles className="w-6 h-6 text-yellow-500 mx-2" />{t('askAiAbout', { name: medication.name })}</h3><button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"><X size={28} /></button></div>
                <div className="space-y-4"><textarea value={question} onChange={(e) => setQuestion(e.target.value)} className="w-full p-3 text-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-blue-500 focus:border-blue-500" rows="3" placeholder={t('askYourQuestion')} /><button onClick={handleAskGemini} disabled={isLoading} className="w-full bg-blue-600 text-white text-lg font-bold py-3 rounded-xl hover:bg-blue-700 flex items-center justify-center disabled:bg-blue-300 transition-transform transform active:scale-95">{isLoading ? <LoaderCircle className="animate-spin w-6 h-6" /> : t('getAiAnswer')}</button></div>
                {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
                {answer && <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/50 border-x-4 border-blue-400 rounded-lg"><p className="text-gray-700 dark:text-gray-200 whitespace-pre-wrap">{answer}</p></div>}
            </div>
        </div>
    );
};

const ConfirmationModal = ({ title, message, onConfirm, onCancel, confirmText }) => {
    const { t } = useTranslation();
    return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 max-w-sm w-full">
            <div className="flex items-center mb-4"><AlertTriangle className="w-8 h-8 text-red-500 mx-3"/><h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">{title}</h3></div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{message}</p>
            <div className="flex justify-end gap-3">
                <button onClick={onCancel} className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100 font-bold py-2 px-6 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-500 transition-transform transform active:scale-95">{t('cancel')}</button>
                <button onClick={onConfirm} className="bg-red-600 text-white font-bold py-2 px-6 rounded-xl hover:bg-red-700 transition-transform transform active:scale-95">{confirmText || t('delete')}</button>
            </div>
        </div>
    </div>
)};

const AlarmModal = ({ medication, onSnooze, onTake, onClose }) => {
    const { t } = useTranslation();
    useEffect(() => { const interval = setInterval(() => AlarmSound.play(), 1200); return () => { clearInterval(interval); AlarmSound.stop(); }; }, []);
    const handleTake = () => { onTake(medication.id); onClose(); };
    const handleSnooze = () => { onSnooze(medication.id); onClose(); };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-[100] p-4">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center border-t-8 border-blue-500">
                <Bell className="w-20 h-20 text-blue-500 mx-auto animate-bounce"/>
                <h3 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100 mt-4 mb-2">{t('alarmTitle')}</h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">{t('alarmMessage')}</p>
                <div className="bg-blue-50 dark:bg-blue-900/50 p-4 rounded-xl my-6">
                    <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">{medication.name}</p>
                    <p className="text-lg text-blue-600 dark:text-blue-300 mt-1">{medication.dosage}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <button onClick={handleSnooze} className="w-full bg-amber-500 text-white font-bold py-3 rounded-xl hover:bg-amber-600 transition-transform transform active:scale-95">{t('snooze')}</button>
                    <button onClick={handleTake} className="w-full bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700 transition-transform transform active:scale-95">{t('iTookIt')}</button>
                </div>
            </div>
        </div>
    );
};

// --- PAGE & UI COMPONENTS ---

const RegistrationPage = ({ onRegister, setModalInfo }) => {
    const { t } = useTranslation();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobile, setMobile] = useState('');
    const [licenseCode, setLicenseCode] = useState('');
    const [rememberMe, setRememberMe] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!firstName || !lastName || !mobile) {
            setModalInfo({ title: t('error'), message: t('fillFieldsError')});
            return;
        }
        onRegister({ firstName, lastName, mobile, licenseCode }, rememberMe);
    };

    return (
        <div className="max-w-md mx-auto p-4 pt-10">
            <div className="text-center mb-8">
                <Pill className="mx-auto text-blue-500 w-16 h-16" />
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mt-4">{t('welcome')}</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">{t('getStarted')}</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
                <div><label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">{t('firstName')}</label><input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} className="w-full p-4 text-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-blue-500 focus:border-blue-500" /></div>
                <div><label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">{t('lastName')}</label><input type="text" value={lastName} onChange={e => setLastName(e.target.value)} className="w-full p-4 text-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-blue-500 focus:border-blue-500" /></div>
                <div><label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">{t('mobileNumber')}</label><input type="tel" value={mobile} onChange={e => setMobile(e.target.value)} className="w-full p-4 text-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-blue-500 focus:border-blue-500" /></div>
                <div><label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">{t('licenseCode')}</label><input type="text" value={licenseCode} onChange={e => setLicenseCode(e.target.value)} className="w-full p-4 text-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-blue-500 focus:border-blue-500" /></div>
                 <div className="flex items-center">
                    <input id="remember-me" type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="h-5 w-5 text-blue-600 border-gray-300 dark:border-gray-500 rounded focus:ring-blue-500 bg-gray-50 dark:bg-gray-700" />
                    <label htmlFor="remember-me" className="mx-2 block text-md text-gray-700 dark:text-gray-300">{t('rememberMe')}</label>
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white text-xl font-bold py-4 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-transform transform active:scale-95">{t('registerAndStart')}</button>
            </form>
        </div>
    );
};

const EditProfilePage = ({ userProfile, onSave, onCancel, setModalInfo }) => {
    const { t } = useTranslation();
    const [profile, setProfile] = useState(userProfile);
    const handleChange = (e) => { const { name, value } = e.target; setProfile(prev => ({ ...prev, [name]: value })); };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!profile.firstName || !profile.lastName || !profile.mobile) {
            setModalInfo({ title: t('error'), message: t('fillFieldsError')});
            return;
        }
        onSave(profile);
    };

    return (
        <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">{t('editDrugTitle')}</h1>
            <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
                <div><label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">{t('firstName')}</label><input type="text" name="firstName" value={profile.firstName} onChange={handleChange} className="w-full p-4 text-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-blue-500 focus:border-blue-500" /></div>
                <div><label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">{t('lastName')}</label><input type="text" name="lastName" value={profile.lastName} onChange={handleChange} className="w-full p-4 text-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-blue-500 focus:border-blue-500" /></div>
                <div><label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">{t('mobileNumber')}</label><input type="tel" name="mobile" value={profile.mobile} onChange={handleChange} className="w-full p-4 text-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-blue-500 focus:border-blue-500" /></div>
                <div><label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">{t('licenseCode')}</label><input type="text" name="licenseCode" value={profile.licenseCode} readOnly className="w-full p-4 text-lg border-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400 rounded-xl" /></div>
                <div className="flex gap-4 pt-2">
                    <button type="button" onClick={onCancel} className="w-full bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100 text-xl font-bold py-4 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-500 transition-transform transform active:scale-95">{t('cancel')}</button>
                    <button type="submit" className="w-full bg-green-600 text-white text-xl font-bold py-4 rounded-xl hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition-transform transform active:scale-95 flex items-center justify-center"><Save className="mx-2"/>{t('save')}</button>
                </div>
            </form>
        </div>
    );
};

const ProfilePage = ({ userProfile, setCurrentPage, onLogout }) => {
    const { t, language } = useTranslation();
    const arrowClass = language === 'fa' ? 'transform rotate-180' : '';
    return (
    <div className="max-w-md mx-auto text-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">{t('myProfile')}</h1>
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md flex flex-col items-center">
            <div className="w-32 h-32 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mb-4"><User className="w-20 h-20 text-blue-500 dark:text-blue-400" /></div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">{userProfile.firstName} {userProfile.lastName}</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">{t('yourHealthIsOurWish')}</p>
        </div>
        <div className="mt-6 space-y-3">
            <button onClick={() => setCurrentPage('editProfile')} className="w-full flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"><span className="font-semibold text-gray-800 dark:text-gray-200">{t('userInfo')}</span><ArrowRight className={`w-5 h-5 text-gray-400 ${arrowClass}`}/></button>
            <a href="#" className="w-full flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"><span className="font-semibold text-gray-800 dark:text-gray-200">{t('medicationReport')}</span><ArrowRight className={`w-5 h-5 text-gray-400 ${arrowClass}`}/></a>
            <button onClick={onLogout} className="w-full flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"><span className="font-semibold flex items-center"><LogOut className="w-5 h-5 mx-2"/>{t('logout')}</span><ArrowRight className={`w-5 h-5 text-red-400 ${arrowClass}`}/></button>
        </div>
    </div>
)};

const SettingsPage = ({ notificationEnabled, setNotificationEnabled }) => {
    const { t, language, setLanguage } = useTranslation();
    return (
    <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8">{t('settings')}</h1>
        <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-md">
                <div className="flex items-center justify-between">
                    <div className="flex items-center"><Bell className="w-7 h-7 text-blue-500 dark:text-blue-400 mx-3"/><span className="text-lg font-semibold text-gray-700 dark:text-gray-200">{t('reminderNotification')}</span></div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={notificationEnabled} onChange={() => setNotificationEnabled(!notificationEnabled)} className="sr-only peer" />
                        <div className="w-14 h-8 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                </div>
                <p className="text-gray-500 dark:text-gray-400 mt-2 px-10 text-sm">{t('reminderNotificationDesc')}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-md">
                <div className="flex items-center justify-between">
                    <div className="flex items-center"><Languages className="w-7 h-7 text-green-500 dark:text-green-400 mx-3"/><span className="text-lg font-semibold text-gray-700 dark:text-gray-200">{t('language')}</span></div>
                    <select value={language} onChange={(e) => setLanguage(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option value="fa">فارسی</option>
                      <option value="en">English</option>
                    </select>
                </div>
                <p className="text-gray-500 dark:text-gray-400 mt-2 px-10 text-sm">{t('languageDesc')}</p>
            </div>
        </div>
    </div>
)};

const HomePage = ({ medications, userProfile, onToggleTaken, onAskAi, setModalInfo, onDeleteRequest, onEditRequest }) => {
  const { t, language } = useTranslation();
  const today = new Date().toLocaleDateString(language === 'fa' ? 'fa-IR' : 'en-US', { weekday: 'long', day: 'numeric', month: 'long' });
  const greetingKey = getTimeGreetingKey();
  const [isLoadingTip, setIsLoadingTip] = useState(false);
  const timeKeys = ['morning', 'afternoon', 'evening'];
  const medsByTime = {
      morning: medications.filter(m => m.time === 'morning'),
      afternoon: medications.filter(m => m.time === 'afternoon'),
      evening: medications.filter(m => m.time === 'evening'),
  };

  const getHealthyTip = async () => {
    setIsLoadingTip(true);
    const prompt = `You are a friendly nutrition expert for the elderly. Write a very simple, healthy, and practical food tip for an elderly person in ${language === 'fa' ? 'Persian' : 'English'}. The tip should be short, one or two sentences.`;
    try {
        const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };
        const apiKey = "";
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
        const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        if (!response.ok) throw new Error('Error fetching tip.');
        const result = await response.json();
        const tip = result.candidates[0]?.content?.parts[0]?.text;
        if (tip) setModalInfo({ title: `✨ ${t('healthyTip')}`, message: tip });
        else throw new Error('No response received.');
    } catch (e) {
        setModalInfo({ title: t('error'), message: e.message });
    } finally {
        setIsLoadingTip(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div><h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">{t(greetingKey)}، {userProfile.firstName}</h1><p className="text-lg text-gray-500 dark:text-gray-400 mt-1">{today}</p></div>
        <button onClick={getHealthyTip} disabled={isLoadingTip} className="bg-amber-400 text-white font-semibold py-2 px-3 rounded-xl shadow hover:bg-amber-500 flex items-center disabled:bg-amber-200 transition-transform transform active:scale-95">{isLoadingTip ? <LoaderCircle className="animate-spin w-5 h-5"/> : <Sparkles className="w-5 h-5"/>}<span className="mx-2 text-sm">{t('healthyTip')}</span></button>
      </div>
      {timeKeys.map(timeKey => (medsByTime[timeKey].length > 0 && (<div key={timeKey}><h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 border-b-2 border-blue-200 dark:border-blue-800 pb-2 mb-4 flex items-center"><Clock className="w-6 h-6 mx-2 text-blue-500 dark:text-blue-400" />{t('medsForTime', {time: t(timeKey)})}</h2><div className="space-y-3">{medsByTime[timeKey].map(med => (<MedicationCard key={med.id} med={med} onToggleTaken={onToggleTaken} onAskAi={onAskAi} onDeleteRequest={onDeleteRequest} onEditRequest={onEditRequest} />))}</div></div>)))}
      {medications.length === 0 && (<div className="text-center py-10 px-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm"><Pill className="mx-auto text-gray-400 w-16 h-16" /><p className="mt-4 text-lg text-gray-600 dark:text-gray-300">{t('noMedsYet')}</p><p className="text-sm text-gray-500 dark:text-gray-400">{t('noMedsYetDesc')}</p></div>)}
    </div>
  );
};

const MedicationCard = ({ med, onToggleTaken, onAskAi, onDeleteRequest, onEditRequest }) => {
    const { t } = useTranslation();
    return(
  <div className={`p-3 rounded-xl shadow-md flex items-start sm:items-center gap-3 transition-all duration-300 group ${med.taken ? 'bg-green-50 dark:bg-green-900/40 border-x-4 border-green-500' : 'bg-white dark:bg-gray-800 border-x-4 border-red-500'}`}>
    <div className="flex-grow flex items-center gap-3" onClick={() => onToggleTaken(med.id)} style={{cursor: 'pointer'}}>
      <div className={`w-9 h-9 flex items-center justify-center rounded-full shrink-0 ${med.taken ? 'bg-green-500' : 'bg-red-500 dark:bg-red-600'}`}>
        <Pill size={20} className="text-white" />
      </div>
      <div className="flex-grow">
        <p className="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center">{med.name}
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mx-2">({med.specificTime})</span>
        </p>
        <div className="flex items-center mt-1 gap-x-3">
          <p className="text-gray-600 dark:text-gray-300">{med.dosage}</p>
          {med.isRecurring && (
            <div className="flex items-center text-xs bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-200 px-2 py-0.5 rounded-full">
              <RefreshCw className="w-3 h-3 mx-1"/>{t('everyNHours', {n: med.reminderInterval})}
            </div>
          )}
        </div>
      </div>
    </div>
    <div className="flex flex-col sm:flex-row items-center shrink-0 -mt-1 sm:mt-0">
      <div className="flex items-center">
         <button onClick={(e) => { e.stopPropagation(); onAskAi(med); }} className="p-2 text-blue-600 dark:text-blue-400 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors" aria-label={t('askAiAbout', {name: med.name})}><Sparkles size={20} /></button>
         <button onClick={(e) => { e.stopPropagation(); onEditRequest(med); }} className="p-2 text-gray-600 dark:text-gray-400 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity" aria-label={`${t('edit')} ${med.name}`}><Pencil size={20} /></button>
         <button onClick={(e) => { e.stopPropagation(); onDeleteRequest(med); }} className="p-2 text-red-500 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 opacity-0 group-hover:opacity-100 transition-opacity" aria-label={`${t('delete')} ${med.name}`}><Trash2 size={20} /></button>
      </div>
      <div className="flex flex-col items-center cursor-pointer w-12 mt-2 sm:mt-0" onClick={() => onToggleTaken(med.id)}>
        <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${med.taken ? 'border-green-600 bg-green-500' : 'border-gray-400 dark:border-gray-500'}`}>
          {med.taken && <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
        </div>
        <span className={`mt-1 text-xs font-semibold ${med.taken ? 'text-green-700 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>{med.taken ? t('taken') : t('notTaken')}</span>
      </div>
    </div>
  </div>
)};

const DrugFormPage = ({ initialData = {}, onSave, onCancel, pageTitle, saveButtonText }) => {
  const { t } = useTranslation();
  const [name, setName] = useState(initialData.name || '');
  const [dosage, setDosage] = useState(initialData.dosage || '');
  const [time, setTime] = useState(initialData.time || 'morning');
  const [specificTime, setSpecificTime] = useState(initialData.specificTime || '');
  const [isRecurring, setIsRecurring] = useState(initialData.isRecurring || false);
  const [reminderInterval, setReminderInterval] = useState(initialData.reminderInterval || 8);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !dosage || !specificTime) { alert(t('formError')); return; }
    onSave({ ...initialData, name, dosage, time, specificTime, isRecurring, reminderInterval: isRecurring ? reminderInterval : null });
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">{pageTitle}</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
        <div><label htmlFor="drugName" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">{t('drugName')}</label><input type="text" id="drugName" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-4 text-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., Aspirin"/></div>
        <div><label htmlFor="dosage" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">{t('drugDosage')}</label><input type="text" id="dosage" value={dosage} onChange={(e) => setDosage(e.target.value)} className="w-full p-4 text-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., 1 pill"/></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">{t('timeOfDay')}</label><select value={time} onChange={(e) => setTime(e.target.value)} className="w-full p-4 text-lg border-2 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-blue-500 focus:border-blue-500"><option value="morning">{t('morning')}</option><option value="afternoon">{t('afternoon')}</option><option value="evening">{t('evening')}</option></select></div>
          <div><label htmlFor="specificTime" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">{t('exactTime')}</label><input type="time" id="specificTime" value={specificTime} onChange={(e) => setSpecificTime(e.target.value)} className="w-full p-4 text-lg border-2 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-blue-500 focus:border-blue-500"/></div>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between"><label htmlFor="recurring" className="text-lg font-medium text-gray-700 dark:text-gray-300 flex items-center"><RefreshCw className="w-5 h-5 mx-2"/>{t('recurringReminder')}</label><label className="relative inline-flex items-center cursor-pointer"><input type="checkbox" id="recurring" checked={isRecurring} onChange={() => setIsRecurring(!isRecurring)} className="sr-only peer" /><div className="w-14 h-8 bg-gray-300 dark:bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div></label></div>
          {isRecurring && (<div className="mt-4"><label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">{t('howManyHours')}</label><div className="grid grid-cols-3 gap-3">{[6, 8, 12].map(interval => (<button key={interval} type="button" onClick={() => setReminderInterval(interval)} className={`p-4 text-lg font-semibold rounded-xl border-2 transition-colors ${reminderInterval === interval ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600'}`}>{t('nHours', {n: interval})}</button>))}</div></div>)}
        </div>
        <div className="flex gap-4 pt-2">
            <button type="button" onClick={onCancel} className="w-full bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100 text-xl font-bold py-4 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-500 transition-transform transform active:scale-95">{t('cancel')}</button>
            <button type="submit" className="w-full bg-blue-600 text-white text-xl font-bold py-4 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-transform transform active:scale-95">{saveButtonText}</button>
        </div>
      </form>
    </div>
  );
};

const BottomNavBar = ({ currentPage, setCurrentPage }) => {
  const { t } = useTranslation();
  const navItems = [{ id: 'home', icon: Pill, label: t('medications') }, { id: 'add', icon: Plus, label: t('add') }, { id: 'profile', icon: User, label: t('myProfile') }, { id: 'settings', icon: Settings, label: t('settings') }];
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 shadow-lg"><div className="flex justify-around max-w-lg mx-auto">{navItems.map(item => (<button key={item.id} onClick={() => setCurrentPage(item.id)} className={`flex flex-col items-center justify-center w-full py-3 text-sm transition-colors duration-200 ${currentPage === item.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400'}`}><item.icon className="w-7 h-7 mb-1" /><span>{item.label}</span></button>))}</div></nav>
  );
};

// --- Main App Logic ---

function App() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState('home');
  const [medications, setMedications] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [modalInfo, setModalInfo] = useState(null);
  const [askAiModalMed, setAskAiModalMed] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [editingMedication, setEditingMedication] = useState(null);
  const [alarmModalMed, setAlarmModalMed] = useState(null);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const triggeredAlarms = useRef(new Set());

  // --- THEME & INITIAL LOAD ---
  useEffect(() => {
    // Theme setup based on OS
    const applyTheme = () => {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }
    applyTheme();
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', applyTheme);

    // Initial data load
    try {
      const savedMeds = localStorage.getItem('medications');
      setMedications(savedMeds ? JSON.parse(savedMeds) : initialMedications);

      const savedProfileJSON = localStorage.getItem('userProfile') || sessionStorage.getItem('userProfile');
      if (savedProfileJSON) {
        const profile = JSON.parse(savedProfileJSON);
        if (profile && typeof profile === 'object') {
          setUserProfile(profile);
          setIsRegistered(true);
        }
      }
    } catch (error) {
      console.error("Could not initialize from storage", error);
      localStorage.clear(); // Clear potentially corrupted storage
      sessionStorage.clear();
    } finally {
      setIsLoading(false); // Finished loading
    }
    
    return () => mediaQuery.removeEventListener('change', applyTheme);
  }, []);

  // --- PERSIST MEDICATIONS ---
  useEffect(() => {
    // Avoid saving initial mock data on first load
    if (!isLoading) {
        try {
            localStorage.setItem('medications', JSON.stringify(medications));
        } catch (error) {
            console.error("Could not save medications to storage", error);
        }
    }
  }, [medications, isLoading]);

  // --- HANDLERS ---
  const handleRegistration = (profileData, rememberMe) => {
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem('userProfile', JSON.stringify(profileData));
    setUserProfile(profileData);
    setIsRegistered(true);
    setModalInfo({ title: t('success'), message: t('welcomeMessage', {name: profileData.firstName}) });
  };
  
  const handleProfileUpdate = (profileData) => {
    let storageUsed = localStorage.getItem('userProfile') ? localStorage : sessionStorage;
    storageUsed.setItem('userProfile', JSON.stringify(profileData));
    setUserProfile(profileData);
    setCurrentPage('profile');
    setModalInfo({ title: t('success'), message: t('medUpdatedSuccess', {name: ''}) });
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
    setModalInfo({ title: t('success'), message: t('medAddedSuccess', {name: med.name})});
  };
  
  const updateMedication = (updatedMed) => {
    setMedications(meds => meds.map(med => (med.id === updatedMed.id ? updatedMed : med)).sort((a,b) => (a.specificTime || "00:00").localeCompare(b.specificTime || "00:00")));
    setEditingMedication(null);
    setCurrentPage('home');
    setModalInfo({ title: t('success'), message: t('medUpdatedSuccess', {name: updatedMed.name}) });
  };

  const handleEditRequest = (med) => { setEditingMedication(med); setCurrentPage('editMedication'); };
  const deleteMedication = (id) => { 
      setMedications(meds => meds.filter(med => med.id !== id)); 
      setConfirmDelete(null); 
      setModalInfo({ title: t('success'), message: t('medDeletedSuccess')}); 
  };
  const toggleMedicationTaken = (id) => { setMedications(meds => meds.map(med => (med.id === id ? { ...med, taken: !med.taken } : med))); };
  const snoozeMedication = (id) => {
      triggeredAlarms.current.delete(id);
      setMedications(meds => meds.map(med => {
          if (med.id === id) {
              const now = new Date(); now.setMinutes(now.getMinutes() + 5);
              return { ...med, specificTime: now.toTimeString().slice(0,5) };
          }
          return med;
      }));
  };

  // --- ALARM LOGIC ---
  useEffect(() => {
    if (!notificationEnabled || isLoading) return;
    const checkTime = () => {
      const now = new Date(); const currentTime = now.toTimeString().slice(0, 5);
      const upcomingMed = medications.find(med => !med.taken && med.specificTime === currentTime && !triggeredAlarms.current.has(med.id));
      if (upcomingMed) { setAlarmModalMed(upcomingMed); triggeredAlarms.current.add(upcomingMed.id); }
      if (now.getHours() === 0 && now.getMinutes() === 0) {
        triggeredAlarms.current.clear();
        setMedications(meds => meds.map(m => ({...m, taken: false})));
      }
    };
    const interval = setInterval(checkTime, 30000);
    return () => clearInterval(interval);
  }, [medications, notificationEnabled, isLoading]);

  const mainAppClasses = "font-sans bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-300";

  // --- RENDER LOGIC ---
  if (isLoading) {
    return (
        <div className={`${mainAppClasses} flex items-center justify-center`}>
            <LoaderCircle className="w-12 h-12 animate-spin text-blue-500" />
        </div>
    );
  }

  const RenderPage = () => {
    if (!isRegistered) {
        return <RegistrationPage onRegister={handleRegistration} setModalInfo={setModalInfo} />;
    }
    switch (currentPage) {
      case 'add': return <DrugFormPage onSave={addMedication} onCancel={() => setCurrentPage('home')} pageTitle={t('addDrugTitle')} saveButtonText={t('save')} />;
      case 'editMedication': return <DrugFormPage initialData={editingMedication} onSave={updateMedication} onCancel={() => setCurrentPage('home')} pageTitle={t('editDrugTitle')} saveButtonText={t('saveChanges')} />;
      case 'profile': return <ProfilePage userProfile={userProfile} setCurrentPage={setCurrentPage} onLogout={() => setConfirmLogout(true)} />;
      case 'editProfile': return <EditProfilePage userProfile={userProfile} onSave={handleProfileUpdate} onCancel={() => setCurrentPage('profile')} setModalInfo={setModalInfo} />;
      case 'settings': return <SettingsPage notificationEnabled={notificationEnabled} setNotificationEnabled={setNotificationEnabled} />;
      default: return <HomePage medications={medications} userProfile={userProfile} onToggleTaken={toggleMedicationTaken} onAskAi={setAskAiModalMed} setModalInfo={setModalInfo} onDeleteRequest={setConfirmDelete} onEditRequest={handleEditRequest} />;
    }
  };

  return (
    <div className={`${mainAppClasses} flex flex-col`}>
      {modalInfo && <InfoModal title={modalInfo.title} message={modalInfo.message} onClose={() => setModalInfo(null)} />}
      {askAiModalMed && <AskAiModal medication={askAiModalMed} onClose={() => setAskAiModalMed(null)} />}
      {confirmDelete && <ConfirmationModal title={t('confirmDeleteTitle')} message={t('confirmDeleteMessage', {name: confirmDelete.name})} onConfirm={() => deleteMedication(confirmDelete.id)} onCancel={() => setConfirmDelete(null)} />}
      {confirmLogout && <ConfirmationModal title={t('confirmLogoutTitle')} message={t('confirmLogoutMessage')} onConfirm={handleLogout} onCancel={() => setConfirmLogout(false)} confirmText={t('logout')}/>}
      {alarmModalMed && <AlarmModal medication={alarmModalMed} onClose={() => setAlarmModalMed(null)} onTake={toggleMedicationTaken} onSnooze={snoozeMedication} />}
      <main className="flex-grow p-4 pb-24"><RenderPage /></main>
      {isRegistered && <BottomNavBar currentPage={currentPage} setCurrentPage={setCurrentPage} />}
    </div>
  );
}

// The final export wraps the App in the LanguageProvider
export default function AppWrapper() {
    return (
        <LanguageProvider>
            <App />
        </LanguageProvider>
    );
}
