import React, { useState, useEffect, useRef } from 'react';
import { Pill, Plus, User, Settings, Bell, Clock, ArrowRight, Sparkles, X, LoaderCircle, RefreshCw, Trash2, AlertTriangle, Save, LogOut, Pencil, Moon, Sun } from 'lucide-react';

// --- INTERNATIONALIZATION & TEXTS ---
const T = {
  fa: {
    appName: 'یادآور دارو',
    morning: 'صبح',
    afternoon: 'ظهر',
    evening: 'شب',
    // Greetings
    goodMorning: 'صبح بخیر',
    goodAfternoon: 'ظهر بخیر',
    goodEvening: 'عصر بخیر',
    // Modals
    gotIt: 'فهمیدم',
    askAbout: 'پرسش در مورد',
    askPlaceholder: 'سوال خود را اینجا بنویسید... مثلا: عوارض این دارو چیست؟',
    getAiAnswer: '✨ دریافت پاسخ از هوش مصنوعی',
    confirmDeleteTitle: 'تایید حذف',
    confirmDeleteMsg: (name) => `آیا از حذف داروی "${name}" مطمئن هستید؟`,
    delete: 'حذف',
    cancel: 'لغو',
    logoutTitle: 'خروج از حساب',
    logoutMsg: 'آیا برای خروج از حساب کاربری خود مطمئن هستید؟',
    logout: 'خروج',
    drugTime: 'وقت دارو!',
    drugTimeMsg: 'زمان مصرف داروی زیر فرا رسیده است:',
    snooze: '۵ دقیقه دیگر',
    iTookIt: 'مصرف کردم',
    error: 'خطا',
    success: 'موفقیت',
    welcome: 'خوش آمدید!',
    welcomeMsg: (name) => `ثبت‌نام شما با موفقیت انجام شد، ${name}.`,
    // Registration
    regWelcome: 'به یادآور دارو خوش آمدید',
    regIntro: 'برای شروع، لطفا اطلاعات خود را وارد کنید.',
    firstName: 'نام',
    lastName: 'نام خانوادگی',
    mobile: 'شماره موبایل',
    license: 'کد لایسنس (اختیاری)',
    rememberMe: 'مرا به خاطر بسپار',
    registerAndStart: 'ثبت نام و شروع',
    // Profile
    myProfile: 'پروفایل من',
    profileGreeting: 'سلامتی شما آرزوی ماست',
    userInfo: 'اطلاعات کاربری',
    usageReport: 'گزارش مصرف دارو',
    logoutFromAccount: 'خروج از حساب کاربری',
    // Edit Profile
    editProfileTitle: 'ویرایش اطلاعات کاربری',
    save: 'ذخیره',
    // Settings
    settings: 'تنظیمات',
    theme: 'پوسته برنامه',
    light: 'روشن',
    dark: 'تاریک',
    language: 'زبان',
    // Home
    healthyTip: 'نکته غذایی',
    medsOf: 'داروهای نوبت',
    noMeds: 'هنوز دارویی ثبت نکرده‌اید.',
    noMedsDesc: 'برای شروع، از دکمه "افزودن" در پایین صفحه استفاده کنید.',
    // Med Card
    taken: 'مصرف شد',
    pending: 'نشده',
    every: 'هر',
    hours: 'ساعت',
    // Drug Form
    addDrugTitle: 'ثبت داروی جدید',
    editDrugTitle: 'ویرایش دارو',
    drugName: 'نام دارو',
    dosage: 'دوز مصرف',
    consumptionTime: 'نوبت مصرف',
    exactTime: 'ساعت دقیق (مهم)',
    recurringReminder: 'یادآوری دوره‌ای',
    howOften: 'هر چند ساعت؟',
    saveDrug: 'ذخیره دارو',
    saveChanges: 'ذخیره تغییرات',
    // Nav Bar
    meds: 'داروها',
    add: 'افزودن',
    profile: 'پروفایل',
  },
  en: {
    appName: 'Med Reminder',
    morning: 'Morning',
    afternoon: 'Afternoon',
    evening: 'Evening',
    // Greetings
    goodMorning: 'Good Morning',
    goodAfternoon: 'Good Afternoon',
    goodEvening: 'Good Evening',
    // Modals
    gotIt: 'Got it',
    askAbout: 'Ask about',
    askPlaceholder: 'Write your question here... e.g., What are the side effects?',
    getAiAnswer: '✨ Get AI Answer',
    confirmDeleteTitle: 'Confirm Deletion',
    confirmDeleteMsg: (name) => `Are you sure you want to delete "${name}"?`,
    delete: 'Delete',
    cancel: 'Cancel',
    logoutTitle: 'Log Out',
    logoutMsg: 'Are you sure you want to log out?',
    logout: 'Log Out',
    drugTime: 'Medication Time!',
    drugTimeMsg: 'It\'s time to take the following medication:',
    snooze: 'Snooze (5 min)',
    iTookIt: 'I Took It',
    error: 'Error',
    success: 'Success',
    welcome: 'Welcome!',
    welcomeMsg: (name) => `Your registration was successful, ${name}.`,
    // Registration
    regWelcome: 'Welcome to Med Reminder',
    regIntro: 'To get started, please enter your information.',
    firstName: 'First Name',
    lastName: 'Last Name',
    mobile: 'Mobile Number',
    license: 'License Code (Optional)',
    rememberMe: 'Remember me',
    registerAndStart: 'Register and Start',
    // Profile
    myProfile: 'My Profile',
    profileGreeting: 'We wish you good health',
    userInfo: 'User Information',
    usageReport: 'Medication Usage Report',
    logoutFromAccount: 'Log Out from Account',
    // Edit Profile
    editProfileTitle: 'Edit Profile',
    save: 'Save',
    // Settings
    settings: 'Settings',
    theme: 'App Theme',
    light: 'Light',
    dark: 'Dark',
    language: 'Language',
    // Home
    healthyTip: 'Healthy Tip',
    medsOf: 'Medications for',
    noMeds: 'No medications added yet.',
    noMedsDesc: 'Use the "Add" button below to get started.',
    // Med Card
    taken: 'Taken',
    pending: 'Pending',
    every: 'Every',
    hours: 'hours',
    // Drug Form
    addDrugTitle: 'Add New Medication',
    editDrugTitle: 'Edit Medication',
    drugName: 'Medication Name',
    dosage: 'Dosage',
    consumptionTime: 'Time of Day',
    exactTime: 'Exact Time (Important)',
    recurringReminder: 'Recurring Reminder',
    howOften: 'How often?',
    saveDrug: 'Save Medication',
    saveChanges: 'Save Changes',
    // Nav Bar
    meds: 'Meds',
    add: 'Add',
    profile: 'Profile',
  }
};

// --- HELPER COMPONENTS ---

const PillIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
        <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/>
        <path d="m8.5 8.5 7 7"/>
    </svg>
);

const initialMedications = (lang) => [
  { id: 1, name: 'Vitamin D', dosage: lang === 'fa' ? '1 عدد' : '1 pill', time: lang === 'fa' ? 'صبح' : 'Morning', specificTime: '08:00', isRecurring: false, reminderInterval: null, taken: true },
  { id: 2, name: 'Aspirin', dosage: lang === 'fa' ? 'نصف قرص' : 'Half pill', time: lang === 'fa' ? 'صبح' : 'Morning', specificTime: '08:30', isRecurring: false, reminderInterval: null, taken: false },
  { id: 3, name: 'Antibiotic', dosage: lang === 'fa' ? '1 عدد' : '1 pill', time: lang === 'fa' ? 'ظهر' : 'Afternoon', specificTime: '14:00', isRecurring: true, reminderInterval: 8, taken: false },
  { id: 4, name: 'Omega 3', dosage: lang === 'fa' ? '1 عدد' : '1 pill', time: lang === 'fa' ? 'شب' : 'Evening', specificTime: '21:00', isRecurring: false, reminderInterval: null, taken: false },
];

const getTimeGreeting = (lang) => {
    const hour = new Date().getHours();
    const t = T[lang];
    if (hour < 12) return t.goodMorning;
    if (hour < 18) return t.goodAfternoon;
    return t.goodEvening;
};

// --- MODAL COMPONENTS ---

const InfoModal = ({ title, message, onClose, lang }) => {
    const t = T[lang];
    return(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" dir={lang === 'fa' ? 'rtl' : 'ltr'}>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 max-w-sm w-full">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">{title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6" style={{ whiteSpace: 'pre-wrap' }}>{message}</p>
            <button onClick={onClose} className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-transform transform active:scale-95">
                {t.gotIt}
            </button>
        </div>
    </div>
)};

const ConfirmationModal = ({ title, message, onConfirm, onCancel, confirmText, lang }) => {
    const t = T[lang];
    return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" dir={lang === 'fa' ? 'rtl' : 'ltr'}>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 max-w-sm w-full">
            <div className="flex items-center mb-4"><AlertTriangle className="w-8 h-8 text-red-500 mx-3"/><h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">{title}</h3></div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{message}</p>
            <div className={`flex gap-3 ${lang === 'fa' ? 'justify-end' : 'justify-end'}`}>
                <button onClick={onCancel} className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100 font-bold py-2 px-6 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-500 transition-transform transform active:scale-95">{t.cancel}</button>
                <button onClick={onConfirm} className="bg-red-600 text-white font-bold py-2 px-6 rounded-xl hover:bg-red-700 transition-transform transform active:scale-95">{confirmText}</button>
            </div>
        </div>
    </div>
)};

// --- PAGE COMPONENTS ---

const HomePage = ({ medications, userProfile, onToggleTaken, lang }) => {
    const t = T[lang];
    const today = new Date().toLocaleDateString(lang === 'fa' ? 'fa-IR' : 'en-US', { weekday: 'long', day: 'numeric', month: 'long' });
    const greeting = getTimeGreeting(lang);
    const medsByTime = { 
        [t.morning]: medications.filter(m => m.time === t.morning), 
        [t.afternoon]: medications.filter(m => m.time === t.afternoon), 
        [t.evening]: medications.filter(m => m.time === t.evening), 
    };

    const timeSlots = [
        { key: t.morning, label: `${t.medsOf} ${t.morning}` },
        { key: t.afternoon, label: `${t.medsOf} ${t.afternoon}` },
        { key: t.evening, label: `${t.medsOf} ${t.evening}` },
    ];
  
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">{greeting}, {userProfile?.firstName || ''}</h1>
                <p className="text-lg text-gray-500 dark:text-gray-400 mt-1">{today}</p>
            </div>

            {timeSlots.map(slot => (
                medsByTime[slot.key] && medsByTime[slot.key].length > 0 && (
                    <div key={slot.key}>
                        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 border-b-2 border-blue-200 dark:border-blue-800 pb-2 mb-4 flex items-center">
                            <Clock className="w-6 h-6 mx-2 text-blue-500" />
                            {slot.label}
                        </h2>
                        <div className="space-y-3">
                            {medsByTime[slot.key].map(med => (
                                <MedicationCard key={med.id} med={med} onToggleTaken={onToggleTaken} lang={lang} />
                            ))}
                        </div>
                    </div>
                )
            ))}

            {medications.length === 0 && (
                <div className="text-center py-10 px-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
                    <Pill className="mx-auto text-gray-400 w-16 h-16" />
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">{t.noMeds}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t.noMedsDesc}</p>
                </div>
            )}
        </div>
    );
};

const MedicationCard = ({ med, onToggleTaken, lang }) => {
    const t = T[lang];
    return(
    <div className={`p-3 rounded-xl shadow-md flex items-center justify-between gap-2 group transition-colors duration-300 ${med.taken ? 'bg-green-50 dark:bg-green-900/50 border-r-4 border-green-500' : 'bg-white dark:bg-gray-800 border-r-4 border-red-500'}`}>
        <div className="flex-grow flex items-center gap-3 cursor-pointer" onClick={() => onToggleTaken(med.id)}>
            <div className={`w-10 h-10 flex items-center justify-center rounded-full shrink-0 ${med.taken ? 'bg-green-500' : 'bg-red-400'}`}>
                <PillIcon />
            </div>
            <div className="flex-grow">
                <p className="text-lg font-bold text-gray-800 dark:text-gray-100">{med.name}</p>
                <div className="flex items-center flex-wrap gap-x-3 gap-y-1 mt-1 text-gray-600 dark:text-gray-400 text-sm">
                    <span>{med.dosage}</span>
                    <span>({med.specificTime})</span>
                    {med.isRecurring && (
                        <span className="flex items-center text-xs bg-blue-100 dark:bg-blue-900/70 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full">
                            <RefreshCw className="w-3 h-3 ml-1"/>{t.every} {med.reminderInterval} {t.hours}
                        </span>
                    )}
                </div>
            </div>
        </div>
        <div className="flex flex-col items-center cursor-pointer w-16 text-center shrink-0" onClick={() => onToggleTaken(med.id)}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all ${med.taken ? 'border-green-600 bg-green-500' : 'border-gray-400 dark:border-gray-500'}`}>
                {med.taken && <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
            </div>
            <span className={`mt-1 text-xs font-semibold ${med.taken ? 'text-green-700 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
                {med.taken ? t.taken : t.pending}
            </span>
        </div>
    </div>
)};

const SettingsPage = ({ theme, setTheme, lang, setLang }) => {
    const t = T[lang];
    return (
        <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8">{t.settings}</h1>
            <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-md space-y-6">
                <div>
                    <label className="text-lg font-semibold text-gray-700 dark:text-gray-300">{t.theme}</label>
                    <div className="mt-2 flex rounded-lg border-2 border-gray-200 dark:border-gray-700 overflow-hidden">
                        <button onClick={() => setTheme('light')} className={`w-full p-3 font-semibold transition-colors ${theme === 'light' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>
                            <Sun className="inline-block mx-2" />{t.light}
                        </button>
                        <button onClick={() => setTheme('dark')} className={`w-full p-3 font-semibold transition-colors ${theme === 'dark' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>
                            <Moon className="inline-block mx-2" />{t.dark}
                        </button>
                    </div>
                </div>
                <div>
                     <label className="text-lg font-semibold text-gray-700 dark:text-gray-300">{t.language}</label>
                     <div className="mt-2 flex rounded-lg border-2 border-gray-200 dark:border-gray-700 overflow-hidden">
                        <button onClick={() => setLang('fa')} className={`w-full p-3 font-semibold transition-colors ${lang === 'fa' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>
                            فارسی
                        </button>
                        <button onClick={() => setLang('en')} className={`w-full p-3 font-semibold transition-colors ${lang === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>
                            English
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const BottomNavBar = ({ currentPage, setCurrentPage, lang }) => {
    const t = T[lang];
    const navItems = [
        { id: 'home', icon: Pill, label: t.meds }, 
        { id: 'add', icon: Plus, label: t.add }, 
        { id: 'profile', icon: User, label: t.profile }, 
        { id: 'settings', icon: Settings, label: t.settings }
    ];

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


// --- MAIN APP COMPONENT ---
export default function App() {
    const [currentPage, setCurrentPage] = useState('home');
    const [medications, setMedications] = useState([]);
    const [userProfile, setUserProfile] = useState(null);
    const [isRegistered, setIsRegistered] = useState(false);
    const [theme, setTheme] = useState('light');
    const [lang, setLang] = useState('fa');
    const [modalInfo, setModalInfo] = useState(null);
    const [confirmLogout, setConfirmLogout] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [editingMedication, setEditingMedication] = useState(null);


    // --- Effects for loading and saving data ---
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        const savedLang = localStorage.getItem('lang') || 'fa';
        setTheme(savedTheme);
        setLang(savedLang);

        const savedMeds = localStorage.getItem('medications');
        setMedications(savedMeds ? JSON.parse(savedMeds) : initialMedications(savedLang));

        const savedProfile = localStorage.getItem('userProfile');
        if (savedProfile) {
            setUserProfile(JSON.parse(savedProfile));
            setIsRegistered(true);
        }
    }, []);

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);
    
     useEffect(() => {
        localStorage.setItem('lang', lang);
        document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
    }, [lang]);

    useEffect(() => {
        localStorage.setItem('medications', JSON.stringify(medications));
    }, [medications]);
    

    // --- Handlers ---
    const handleToggleTaken = (id) => {
        setMedications(meds =>
            meds.map(med => (med.id === id ? { ...med, taken: !med.taken } : med))
        );
    };

    const handleLogout = () => {
        localStorage.removeItem('userProfile');
        setUserProfile(null);
        setIsRegistered(false);
        setConfirmLogout(false);
    };

    // --- Page Rendering Logic ---
    const RenderPage = () => {
        // For simplicity, we are not showing the registration page in this version.
        // We assume the user is registered.
        if (!isRegistered) {
            // In a real app, you would show the RegistrationPage component here
            // For now, we'll just show the home page with a default profile
            if (!userProfile) setUserProfile({ firstName: lang === 'fa' ? 'کاربر' : 'User' });
        }


        switch (currentPage) {
            case 'settings':
                return <SettingsPage theme={theme} setTheme={setTheme} lang={lang} setLang={setLang} />;
            case 'profile':
                // Placeholder for ProfilePage
                return <div className="text-center text-gray-800 dark:text-gray-100">Profile Page Coming Soon</div>;
            case 'add':
                 // Placeholder for DrugFormPage
                return <div className="text-center text-gray-800 dark:text-gray-100">Add Medication Page Coming Soon</div>;
            default:
                return <HomePage medications={medications} userProfile={userProfile || {firstName: ''}} onToggleTaken={handleToggleTaken} lang={lang} />;
        }
    };

    return (
        <div className="font-sans bg-gray-100 dark:bg-gray-900 min-h-screen flex flex-col">
            {modalInfo && <InfoModal title={modalInfo.title} message={modalInfo.message} onClose={() => setModalInfo(null)} lang={lang} />}
            {confirmLogout && <ConfirmationModal title={T[lang].logoutTitle} message={T[lang].logoutMsg} onConfirm={handleLogout} onCancel={() => setConfirmLogout(false)} confirmText={T[lang].logout} lang={lang}/>}
            {confirmDelete && <ConfirmationModal title={T[lang].confirmDeleteTitle} message={T[lang].confirmDeleteMsg(confirmDelete.name)} onConfirm={() => {}} onCancel={() => setConfirmDelete(null)} confirmText={T[lang].delete} lang={lang}/>}

            <main className="flex-grow p-4 pb-24">
                <RenderPage />
            </main>
            
            <BottomNavBar currentPage={currentPage} setCurrentPage={setCurrentPage} lang={lang} />
        </div>
    );
}
