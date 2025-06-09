import React, { useState, useEffect, useRef } from 'react';
import { Pill, Plus, User, Settings, Bell, Clock, ArrowRight, Sparkles, X, LoaderCircle, RefreshCw, Trash2, AlertTriangle, Save, LogOut, Pencil } from 'lucide-react';

// Mock data for initial medications
const initialMedications = [
  { id: 1, name: 'ویتامین D', dosage: '1 عدد', time: 'صبح', specificTime: '08:00', isRecurring: false, reminderInterval: null, taken: true },
  { id: 2, name: 'آسپرین', dosage: 'نصف قرص', time: 'صبح', specificTime: '08:30', isRecurring: false, reminderInterval: null, taken: false },
  { id: 3, name: 'آنتی‌بیوتیک', dosage: '1 عدد', time: 'ظهر', specificTime: '14:00', isRecurring: true, reminderInterval: 8, taken: false },
  { id: 4, name: 'امگا 3', dosage: '1 عدد', time: 'شب', specificTime: '21:00', isRecurring: false, reminderInterval: null, taken: false },
];

// --- HELPER FUNCTIONS ---
const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'صبح بخیر';
    if (hour < 18) return 'ظهر بخیر';
    return 'عصر بخیر';
};

// --- AUDIO COMPONENT FOR ALARM ---
const AlarmSound = {
  audioContext: null,
  oscillator: null,
  gainNode: null,
  isPlaying: false,
  setup() {
    if (typeof window !== 'undefined' && !this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
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
    this.gainNode.gain.exponentialRampToValueAtTime(0.0001, this.audioContext.currentTime + 1);
    this.oscillator.start();
    this.oscillator.onended = () => {
      this.isPlaying = false;
      if (this.oscillator) this.oscillator.disconnect();
      if (this.gainNode) this.gainNode.disconnect();
    };
    this.oscillator.stop(this.audioContext.currentTime + 1);
  },
  stop() {
    if (this.oscillator) {
      this.oscillator.stop();
    }
  }
};


// --- MODAL COMPONENTS ---

const InfoModal = ({ title, message, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" dir="rtl">
        <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full">
            <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
            <p className="text-gray-600 mb-6" style={{ whiteSpace: 'pre-wrap' }}>{message}</p>
            <button onClick={onClose} className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-transform transform active:scale-95">فهمیدم</button>
        </div>
    </div>
);

const AskAiModal = ({ medication, onClose }) => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const handleAskGemini = async () => {
        if (!question) { setError('لطفاً سوال خود را وارد کنید.'); return; }
        setIsLoading(true); setError(''); setAnswer('');
        const prompt = `شما یک دستیار سلامتی مهربان برای سالمندان هستید. به سوال زیر در مورد داروی "${medication.name}" به زبان فارسی ساده، واضح و کوتاه پاسخ دهید. سوال: "${question}". نکته بسیار مهم: در انتهای پاسخ خود، این جمله را حتما ذکر کنید: "توجه: این پاسخ جایگزین توصیه پزشک نیست. حتما با پزشک یا داروساز خود مشورت کنید."`;
        try {
            const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };
            const apiKey = ""; // API key should be handled securely on a backend
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
            const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            if (!response.ok) throw new Error('خطا در برقراری ارتباط با سرویس هوش مصنوعی.');
            const result = await response.json();
            if (result.candidates && result.candidates[0]?.content?.parts[0]?.text) { setAnswer(result.candidates[0].content.parts[0].text); } else { throw new Error('پاسخی دریافت نشد. لطفا دوباره تلاش کنید.'); }
        } catch (e) { setError(e.message || 'یک خطای پیش‌بینی نشده رخ داد.'); } finally { setIsLoading(false); }
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4" onClick={onClose}>
            <div className="bg-gray-50 rounded-2xl shadow-2xl p-6 max-w-lg w-full transform transition-all" onClick={e => e.stopPropagation()} dir="rtl">
                <div className="flex justify-between items-center mb-4"><h3 className="text-xl font-bold text-gray-800 flex items-center"><Sparkles className="w-6 h-6 text-yellow-500 ml-2" />پرسش در مورد {medication.name}</h3><button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={28} /></button></div>
                <div className="space-y-4"><textarea value={question} onChange={(e) => setQuestion(e.target.value)} className="w-full p-3 text-lg border-2 border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500" rows="3" placeholder="سوال خود را اینجا بنویسید... مثلا: عوارض این دارو چیست؟" /><button onClick={handleAskGemini} disabled={isLoading} className="w-full bg-blue-600 text-white text-lg font-bold py-3 rounded-xl hover:bg-blue-700 flex items-center justify-center disabled:bg-blue-300 transition-transform transform active:scale-95">{isLoading ? <LoaderCircle className="animate-spin w-6 h-6" /> : '✨ دریافت پاسخ از هوش مصنوعی'}</button></div>
                {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
                {answer && <div className="mt-6 p-4 bg-blue-50 border-r-4 border-blue-400 rounded-lg"><p className="text-gray-700 whitespace-pre-wrap">{answer}</p></div>}
            </div>
        </div>
    );
};

const ConfirmationModal = ({ title, message, onConfirm, onCancel, confirmText = "حذف" }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" dir="rtl">
        <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full">
            <div className="flex items-center mb-4"><AlertTriangle className="w-8 h-8 text-red-500 ml-3"/><h3 className="text-xl font-bold text-gray-800">{title}</h3></div>
            <p className="text-gray-600 mb-6">{message}</p>
            <div className="flex justify-end gap-3">
                <button onClick={onCancel} className="bg-gray-200 text-gray-800 font-bold py-2 px-6 rounded-xl hover:bg-gray-300 transition-transform transform active:scale-95">لغو</button>
                <button onClick={onConfirm} className="bg-red-600 text-white font-bold py-2 px-6 rounded-xl hover:bg-red-700 transition-transform transform active:scale-95">{confirmText}</button>
            </div>
        </div>
    </div>
);


const AlarmModal = ({ medication, onSnooze, onTake, onClose }) => {
    useEffect(() => {
        const interval = setInterval(() => AlarmSound.play(), 1200);
        return () => {
            clearInterval(interval);
            AlarmSound.stop();
        };
    }, []);
    const handleTake = () => { onTake(medication.id); onClose(); };
    const handleSnooze = () => { onSnooze(medication.id); onClose(); };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-[100] p-4" dir="rtl">
            <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center border-t-8 border-blue-500">
                <Bell className="w-20 h-20 text-blue-500 mx-auto animate-bounce"/>
                <h3 className="text-3xl font-extrabold text-gray-800 mt-4 mb-2">وقت دارو!</h3>
                <p className="text-lg text-gray-600 mb-2">زمان مصرف داروی زیر فرا رسیده است:</p>
                <div className="bg-blue-50 p-4 rounded-xl my-6">
                    <p className="text-2xl font-bold text-blue-800">{medication.name}</p>
                    <p className="text-lg text-blue-600 mt-1">{medication.dosage}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <button onClick={handleSnooze} className="w-full bg-amber-500 text-white font-bold py-3 rounded-xl hover:bg-amber-600 transition-transform transform active:scale-95">۵ دقیقه دیگر</button>
                    <button onClick={handleTake} className="w-full bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700 transition-transform transform active:scale-95">مصرف کردم</button>
                </div>
            </div>
        </div>
    );
};

// --- USER & PAGE COMPONENTS ---

const RegistrationPage = ({ onRegister, setModalInfo }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobile, setMobile] = useState('');
    const [licenseCode, setLicenseCode] = useState('');
    const [rememberMe, setRememberMe] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!firstName || !lastName || !mobile) {
            setModalInfo({ title: "خطا", message: "لطفا نام، نام خانوادگی و شماره موبایل را وارد کنید."});
            return;
        }
        onRegister({ firstName, lastName, mobile, licenseCode }, rememberMe);
    };

    return (
        <div className="max-w-md mx-auto p-4 pt-10">
            <div className="text-center mb-8">
                <Pill className="mx-auto text-blue-500 w-16 h-16" />
                <h1 className="text-3xl font-bold text-gray-800 mt-4">به یادآور دارو خوش آمدید</h1>
                <p className="text-gray-600 mt-2">برای شروع، لطفا اطلاعات خود را وارد کنید.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded-2xl shadow-md">
                <div><label className="block text-lg font-medium text-gray-700 mb-2">نام</label><input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} className="w-full p-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500" /></div>
                <div><label className="block text-lg font-medium text-gray-700 mb-2">نام خانوادگی</label><input type="text" value={lastName} onChange={e => setLastName(e.target.value)} className="w-full p-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500" /></div>
                <div><label className="block text-lg font-medium text-gray-700 mb-2">شماره موبایل</label><input type="tel" value={mobile} onChange={e => setMobile(e.target.value)} className="w-full p-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500" /></div>
                <div><label className="block text-lg font-medium text-gray-700 mb-2">کد لایسنس (اختیاری)</label><input type="text" value={licenseCode} onChange={e => setLicenseCode(e.target.value)} className="w-full p-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500" /></div>
                 <div className="flex items-center">
                    <input id="remember-me" type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                    <label htmlFor="remember-me" className="mr-2 block text-md text-gray-700">مرا به خاطر بسپار</label>
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white text-xl font-bold py-4 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-transform transform active:scale-95">ثبت نام و شروع</button>
            </form>
        </div>
    );
};

const EditProfilePage = ({ userProfile, onSave, onCancel, setModalInfo }) => {
    const [profile, setProfile] = useState(userProfile);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!profile.firstName || !profile.lastName || !profile.mobile) {
            setModalInfo({ title: "خطا", message: "لطفا تمام فیلدهای اجباری را پر کنید."});
            return;
        }
        onSave(profile);
    };

    return (
        <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">ویرایش اطلاعات کاربری</h1>
            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-2xl shadow-md">
                <div><label className="block text-lg font-medium text-gray-700 mb-2">نام</label><input type="text" name="firstName" value={profile.firstName} onChange={handleChange} className="w-full p-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500" /></div>
                <div><label className="block text-lg font-medium text-gray-700 mb-2">نام خانوادگی</label><input type="text" name="lastName" value={profile.lastName} onChange={handleChange} className="w-full p-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500" /></div>
                <div><label className="block text-lg font-medium text-gray-700 mb-2">شماره موبایل</label><input type="tel" name="mobile" value={profile.mobile} onChange={handleChange} className="w-full p-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500" /></div>
                <div><label className="block text-lg font-medium text-gray-700 mb-2">کد لایسنس</label><input type="text" name="licenseCode" value={profile.licenseCode} readOnly className="w-full p-4 text-lg border-2 border-gray-200 bg-gray-100 rounded-xl" /></div>
                <div className="flex gap-4 pt-2">
                    <button type="button" onClick={onCancel} className="w-full bg-gray-200 text-gray-800 text-xl font-bold py-4 rounded-xl hover:bg-gray-300 transition-transform transform active:scale-95">لغو</button>
                    <button type="submit" className="w-full bg-green-600 text-white text-xl font-bold py-4 rounded-xl hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition-transform transform active:scale-95 flex items-center justify-center"><Save className="ml-2"/>ذخیره</button>
                </div>
            </form>
        </div>
    );
};

const ProfilePage = ({ userProfile, setCurrentPage, onLogout }) => (
    <div className="max-w-md mx-auto text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">پروفایل من</h1>
        <div className="bg-white p-8 rounded-2xl shadow-md flex flex-col items-center">
            <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center mb-4"><User className="w-20 h-20 text-blue-500" /></div>
            <h2 className="text-2xl font-semibold text-gray-800">{userProfile.firstName} {userProfile.lastName}</h2>
            <p className="text-gray-500 mt-2">سلامتی شما آرزوی ماست</p>
        </div>
        <div className="mt-6 space-y-3 text-right">
            <button onClick={() => setCurrentPage('editProfile')} className="w-full flex items-center justify-between bg-white p-4 rounded-xl shadow-sm hover:bg-gray-50 transition-colors text-right"><span className="font-semibold">اطلاعات کاربری</span><ArrowRight className="w-5 h-5 text-gray-400 transform rotate-180"/></button>
            <a href="#" className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm hover:bg-gray-50 transition-colors"><span className="font-semibold">گزارش مصرف دارو</span><ArrowRight className="w-5 h-5 text-gray-400 transform rotate-180"/></a>
            <button onClick={onLogout} className="w-full flex items-center justify-between bg-white p-4 rounded-xl shadow-sm text-red-600 hover:bg-red-50 transition-colors"><span className="font-semibold flex items-center"><LogOut className="w-5 h-5 ml-2"/>خروج از حساب کاربری</span><ArrowRight className="w-5 h-5 text-red-400 transform rotate-180"/></button>
        </div>
    </div>
);

const SettingsPage = ({ notificationEnabled, setNotificationEnabled }) => (
    <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">تنظیمات</h1>
        <div className="bg-white p-5 rounded-2xl shadow-md">
            <div className="flex items-center justify-between">
                <div className="flex items-center"><Bell className="w-7 h-7 text-blue-500 ml-3"/><span className="text-lg font-semibold text-gray-700">اعلان یادآوری</span></div>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={notificationEnabled} onChange={() => setNotificationEnabled(!notificationEnabled)} className="sr-only peer" />
                    <div className="w-14 h-8 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
            </div>
            <p className="text-gray-500 mt-2 pr-10 text-sm">با فعال کردن این گزینه، زمان مصرف داروها به شما یادآوری می‌شود.</p>
        </div>
    </div>
);

const HomePage = ({ medications, userProfile, onToggleTaken, onAskAi, setModalInfo, onDeleteRequest, onEditRequest }) => {
  const today = new Date().toLocaleDateString('fa-IR', { weekday: 'long', day: 'numeric', month: 'long' });
  const greeting = getTimeGreeting();
  const [isLoadingTip, setIsLoadingTip] = useState(false);
  const medsByTime = { صبح: medications.filter(m => m.time === 'صبح'), ظهر: medications.filter(m => m.time === 'ظهر'), شب: medications.filter(m => m.time === 'شب'), };

  const getHealthyTip = async () => {
    setIsLoadingTip(true);
    const prompt = `شما یک متخصص تغذیه مهربان برای سالمندان هستید. یک نکته غذایی بسیار ساده، سالم و کاربردی برای یک فرد سالمند به زبان فارسی بنویسید. نکته باید کوتاه و در حد یک یا دو جمله باشد.`;
    try {
        const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };
        const apiKey = ""; // API key should be handled securely on a backend
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
        const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        if (!response.ok) throw new Error('خطا در دریافت نکته.');
        const result = await response.json();
        const tip = result.candidates[0]?.content?.parts[0]?.text;
        if (tip) setModalInfo({ title: "✨ نکته سلامتی امروز", message: tip });
        else throw new Error('پاسخی دریافت نشد.');
    } catch (e) {
        setModalInfo({ title: "خطا", message: e.message });
    } finally {
        setIsLoadingTip(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div><h1 className="text-3xl font-bold text-gray-800">{greeting}، {userProfile.firstName}</h1><p className="text-lg text-gray-500 mt-1">{today}</p></div>
        <button onClick={getHealthyTip} disabled={isLoadingTip} className="bg-amber-400 text-white font-semibold py-2 px-3 rounded-xl shadow hover:bg-amber-500 flex items-center disabled:bg-amber-200 transition-transform transform active:scale-95">{isLoadingTip ? <LoaderCircle className="animate-spin w-5 h-5"/> : <Sparkles className="w-5 h-5"/>}<span className="mr-2 text-sm">نکته غذایی</span></button>
      </div>
      {Object.keys(medsByTime).map(time => (medsByTime[time].length > 0 && (<div key={time}><h2 className="text-xl font-semibold text-gray-700 border-b-2 border-blue-200 pb-2 mb-4 flex items-center"><Clock className="w-6 h-6 ml-2 text-blue-500" />داروهای نوبت {time}</h2><div className="space-y-3">{medsByTime[time].map(med => (<MedicationCard key={med.id} med={med} onToggleTaken={onToggleTaken} onAskAi={onAskAi} onDeleteRequest={onDeleteRequest} onEditRequest={onEditRequest} />))}</div></div>)))}
      {medications.length === 0 && (<div className="text-center py-10 px-4 bg-white rounded-2xl shadow-sm"><Pill className="mx-auto text-gray-400 w-16 h-16" /><p className="mt-4 text-lg text-gray-600">هنوز دارویی ثبت نکرده‌اید.</p><p className="text-sm text-gray-500">برای شروع، از دکمه "افزودن" در پایین صفحه استفاده کنید.</p></div>)}
    </div>
  );
};

// --- THIS IS THE CORRECTED COMPONENT ---
const MedicationCard = ({ med, onToggleTaken, onAskAi, onDeleteRequest, onEditRequest }) => (
  <div className={`p-3 rounded-xl shadow-md flex items-center gap-3 transition-all duration-300 group ${med.taken ? 'bg-green-50 border-r-4 border-green-500' : 'bg-white border-r-4 border-red-500'}`}>
    
    {/* Main clickable area */}
    <div className="flex-grow flex items-center gap-3" onClick={() => onToggleTaken(med.id)} style={{cursor: 'pointer'}}>
      <div className={`w-9 h-9 flex items-center justify-center rounded-full shrink-0 ${med.taken ? 'bg-green-500' : 'bg-red-400'}`}>
        <Pill size={20} className="text-white" />
      </div>
      <div className="flex-grow">
        <p className="text-lg font-bold text-gray-800 flex items-center">{med.name}
          <span className="text-sm font-normal text-gray-500 mr-2">({med.specificTime})</span>
        </p>
        <div className="flex items-center mt-1 gap-x-3">
          <p className="text-gray-600">{med.dosage}</p>
          {med.isRecurring && (
            <div className="flex items-center text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
              <RefreshCw className="w-3 h-3 ml-1"/>هر {med.reminderInterval} ساعت
            </div>
          )}
        </div>
      </div>
    </div>

    {/* Buttons and status on the left */}
    <div className="flex items-center shrink-0">
      <button onClick={(e) => { e.stopPropagation(); onAskAi(med); }} className="p-2 text-blue-600 rounded-full hover:bg-blue-100 transition-colors" aria-label={`پرسش درباره ${med.name}`}><Sparkles size={20} /></button>
      <button onClick={(e) => { e.stopPropagation(); onEditRequest(med); }} className="p-2 text-gray-600 rounded-full hover:bg-gray-200 opacity-0 group-hover:opacity-100 transition-opacity" aria-label={`ویرایش ${med.name}`}><Pencil size={20} /></button>
      <button onClick={(e) => { e.stopPropagation(); onDeleteRequest(med); }} className="p-2 text-red-500 rounded-full hover:bg-red-100 opacity-0 group-hover:opacity-100 transition-opacity" aria-label={`حذف ${med.name}`}><Trash2 size={20} /></button>
      <div className="flex flex-col items-center cursor-pointer w-12" onClick={() => onToggleTaken(med.id)}>
        <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${med.taken ? 'border-green-600 bg-green-500' : 'border-gray-400'}`}>
          {med.taken && <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
        </div>
        <span className={`mt-1 text-xs font-semibold ${med.taken ? 'text-green-700' : 'text-gray-500'}`}>{med.taken ? 'مصرف شد' : 'نشده'}</span>
      </div>
    </div>
  </div>
);


const DrugFormPage = ({ initialData = {}, onSave, onCancel, pageTitle, saveButtonText }) => {
  const [name, setName] = useState(initialData.name || '');
  const [dosage, setDosage] = useState(initialData.dosage || '');
  const [time, setTime] = useState(initialData.time || 'صبح');
  const [specificTime, setSpecificTime] = useState(initialData.specificTime || '');
  const [isRecurring, setIsRecurring] = useState(initialData.isRecurring || false);
  const [reminderInterval, setReminderInterval] = useState(initialData.reminderInterval || 8);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !dosage || !specificTime) {
      // Using a custom modal for errors would be better than alert()
      alert("لطفاً نام دارو، دوز مصرف و ساعت دقیق را وارد کنید.");
      return;
    }
    onSave({ ...initialData, name, dosage, time, specificTime, isRecurring, reminderInterval: isRecurring ? reminderInterval : null });
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">{pageTitle}</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div><label htmlFor="drugName" className="block text-lg font-medium text-gray-700 mb-2">نام دارو</label><input type="text" id="drugName" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500" placeholder="مثال: آسپرین"/></div>
        <div><label htmlFor="dosage" className="block text-lg font-medium text-gray-700 mb-2">دوز مصرف</label><input type="text" id="dosage" value={dosage} onChange={(e) => setDosage(e.target.value)} className="w-full p-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500" placeholder="مثال: ۱ عدد"/></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-lg font-medium text-gray-700 mb-2">نوبت مصرف</label><select value={time} onChange={(e) => setTime(e.target.value)} className="w-full p-4 text-lg border-2 bg-white border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500"><option value="صبح">صبح</option><option value="ظهر">ظهر</option><option value="شب">شب</option></select></div>
          <div><label htmlFor="specificTime" className="block text-lg font-medium text-gray-700 mb-2">ساعت دقیق (مهم)</label><input type="time" id="specificTime" value={specificTime} onChange={(e) => setSpecificTime(e.target.value)} className="w-full p-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500"/></div>
        </div>
        <div className="bg-gray-100 p-4 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between"><label htmlFor="recurring" className="text-lg font-medium text-gray-700 flex items-center"><RefreshCw className="w-5 h-5 ml-2"/>یادآوری دوره‌ای</label><label className="relative inline-flex items-center cursor-pointer"><input type="checkbox" id="recurring" checked={isRecurring} onChange={() => setIsRecurring(!isRecurring)} className="sr-only peer" /><div className="w-14 h-8 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div></label></div>
          {isRecurring && (<div className="mt-4"><label className="block text-lg font-medium text-gray-700 mb-2">هر چند ساعت؟</label><div className="grid grid-cols-3 gap-3">{[6, 8, 12].map(interval => (<button key={interval} type="button" onClick={() => setReminderInterval(interval)} className={`p-4 text-lg font-semibold rounded-xl border-2 transition-colors ${reminderInterval === interval ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300'}`}>{interval} ساعت</button>))}</div></div>)}
        </div>
        <div className="flex gap-4">
            <button type="button" onClick={onCancel} className="w-full bg-gray-200 text-gray-800 text-xl font-bold py-4 rounded-xl hover:bg-gray-300 transition-transform transform active:scale-95">لغو</button>
            <button type="submit" className="w-full bg-blue-600 text-white text-xl font-bold py-4 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-transform transform active:scale-95">{saveButtonText}</button>
        </div>
      </form>
    </div>
  );
};


const BottomNavBar = ({ currentPage, setCurrentPage }) => {
  const navItems = [{ id: 'home', icon: Pill, label: 'داروها' }, { id: 'add', icon: Plus, label: 'افزودن' }, { id: 'profile', icon: User, label: 'پروفایل' }, { id: 'settings', icon: Settings, label: 'تنظیمات' }];
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-gray-200 shadow-lg"><div className="flex justify-around max-w-lg mx-auto">{navItems.map(item => (<button key={item.id} onClick={() => setCurrentPage(item.id)} className={`flex flex-col items-center justify-center w-full py-3 text-sm transition-colors duration-200 ${currentPage === item.id ? 'text-blue-600' : 'text-gray-500 hover:text-blue-500'}`}><item.icon className="w-7 h-7 mb-1" /><span>{item.label}</span></button>))}</div></nav>
  );
};

// --- MAIN APP COMPONENT ---
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [medications, setMedications] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [modalInfo, setModalInfo] = useState(null);
  const [askAiModalMed, setAskAiModalMed] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [editingMedication, setEditingMedication] = useState(null);
  const [alarmModalMed, setAlarmModalMed] = useState(null);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const triggeredAlarms = useRef(new Set());

  // Load data from localStorage on initial render
  useEffect(() => {
    try {
      const savedMeds = localStorage.getItem('medications');
      if (savedMeds) {
        setMedications(JSON.parse(savedMeds));
      } else {
        setMedications(initialMedications); // Load mock data if nothing is saved
      }

      let savedProfile = localStorage.getItem('userProfile');
      if (!savedProfile) {
        savedProfile = sessionStorage.getItem('userProfile');
      }
      if (savedProfile) {
        setUserProfile(JSON.parse(savedProfile));
        setIsRegistered(true);
      }
    } catch (error) {
      console.error("Could not read from storage", error);
      setIsRegistered(false);
      setMedications(initialMedications);
    }
  }, []);

  // Save medications to localStorage whenever they change
  useEffect(() => {
    try {
        // We only save if the medications array isn't the initial mock data,
        // to avoid overwriting user's empty list on first load.
        if(medications.length > 0) {
            localStorage.setItem('medications', JSON.stringify(medications));
        }
    } catch (error) {
        console.error("Could not save medications to storage", error);
    }
  }, [medications]);


  const handleRegistration = (profileData, rememberMe) => {
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem('userProfile', JSON.stringify(profileData));
    setUserProfile(profileData);
    setIsRegistered(true);
    setModalInfo({ title: "خوش آمدید!", message: `ثبت‌نام شما با موفقیت انجام شد، ${profileData.firstName}.` });
  };
  
  const handleProfileUpdate = (profileData) => {
    let storageUsed = localStorage.getItem('userProfile') ? localStorage : sessionStorage;
    storageUsed.setItem('userProfile', JSON.stringify(profileData));
    setUserProfile(profileData);
    setCurrentPage('profile');
    setModalInfo({ title: "موفقیت", message: "اطلاعات شما با موفقیت به‌روزرسانی شد." });
  };

  const handleLogout = () => {
    localStorage.removeItem('userProfile');
    sessionStorage.removeItem('userProfile');
    setUserProfile(null);
    setIsRegistered(false);
    setConfirmLogout(false);
  };

  // --- MEDICATION CRUD ---
  const addMedication = (med) => {
    const newMed = { ...med, id: Date.now(), taken: false };
    setMedications(prevMeds => [...prevMeds, newMed].sort((a,b) => (a.specificTime || "00:00").localeCompare(b.specificTime || "00:00")));
    setCurrentPage('home');
  };
  
  const updateMedication = (updatedMed) => {
    setMedications(meds => meds.map(med => (med.id === updatedMed.id ? updatedMed : med)).sort((a,b) => (a.specificTime || "00:00").localeCompare(b.specificTime || "00:00")));
    setCurrentPage('home');
    setModalInfo({ title: "موفقیت", message: `داروی ${updatedMed.name} با موفقیت ویرایش شد.` });
  };

  const handleEditRequest = (med) => {
    setEditingMedication(med);
    setCurrentPage('editMedication');
  };

  const deleteMedication = (id) => { 
      setMedications(meds => {
          const newMeds = meds.filter(med => med.id !== id);
          if (newMeds.length === 0) {
              localStorage.removeItem('medications');
          }
          return newMeds;
      }); 
      setConfirmDelete(null); 
      setModalInfo({ title: "انجام شد", message: "دارو با موفقیت حذف شد."}); 
  };
  
  const toggleMedicationTaken = (id) => { setMedications(meds => meds.map(med => (med.id === id ? { ...med, taken: !med.taken } : med))); };
  
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

  // --- ALARM LOGIC ---
  useEffect(() => {
    if (!notificationEnabled) return;
    const checkTime = () => {
      const now = new Date(); const currentTime = now.toTimeString().slice(0, 5);
      const upcomingMed = medications.find(med => !med.taken && med.specificTime === currentTime && !triggeredAlarms.current.has(med.id));
      if (upcomingMed) { setAlarmModalMed(upcomingMed); triggeredAlarms.current.add(upcomingMed.id); }
    };
    const day = new Date().getDate();
    // Reset alarms at midnight
    if (new Date().getHours() === 0 && new Date().getMinutes() === 0) {
        triggeredAlarms.current.clear();
        // Untake all medications for the new day
        setMedications(meds => meds.map(m => ({...m, taken: false})));
    }
    const interval = setInterval(checkTime, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, [medications, notificationEnabled]);

  if (!isRegistered) {
      return (
        <div dir="rtl" className="font-sans bg-gray-100 min-h-screen">
            {modalInfo && <InfoModal title={modalInfo.title} message={modalInfo.message} onClose={() => setModalInfo(null)} />}
            <RegistrationPage onRegister={handleRegistration} setModalInfo={setModalInfo} />
        </div>
      )
  }

  const RenderPage = () => {
    switch (currentPage) {
      case 'add': 
        return <DrugFormPage 
            onSave={(med) => { addMedication(med); setModalInfo({ title: "موفقیت", message: `داروی ${med.name} با موفقیت اضافه شد.` }); }}
            onCancel={() => setCurrentPage('home')}
            pageTitle="ثبت داروی جدید"
            saveButtonText="ذخیره دارو"
        />;
      case 'editMedication':
        return <DrugFormPage 
            initialData={editingMedication}
            onSave={updateMedication}
            onCancel={() => setCurrentPage('home')}
            pageTitle="ویرایش دارو"
            saveButtonText="ذخیره تغییرات"
        />;
      case 'profile': return <ProfilePage userProfile={userProfile} setCurrentPage={setCurrentPage} onLogout={() => setConfirmLogout(true)} />;
      case 'editProfile': return <EditProfilePage userProfile={userProfile} onSave={handleProfileUpdate} onCancel={() => setCurrentPage('profile')} setModalInfo={setModalInfo} />;
      case 'settings': return <SettingsPage notificationEnabled={notificationEnabled} setNotificationEnabled={setNotificationEnabled} />;
      default: return <HomePage medications={medications} userProfile={userProfile} onToggleTaken={toggleMedicationTaken} onAskAi={setAskAiModalMed} setModalInfo={setModalInfo} onDeleteRequest={setConfirmDelete} onEditRequest={handleEditRequest} />;
    }
  };

  return (
    <div dir="rtl" className="font-sans bg-gray-100 min-h-screen flex flex-col">
      {modalInfo && <InfoModal title={modalInfo.title} message={modalInfo.message} onClose={() => setModalInfo(null)} />}
      {askAiModalMed && <AskAiModal medication={askAiModalMed} onClose={() => setAskAiModalMed(null)} />}
      {confirmDelete && <ConfirmationModal title="تایید حذف" message={`آیا از حذف داروی "${confirmDelete.name}" مطمئن هستید؟`} onConfirm={() => deleteMedication(confirmDelete.id)} onCancel={() => setConfirmDelete(null)} />}
      {confirmLogout && <ConfirmationModal title="خروج از حساب" message="آیا برای خروج از حساب کاربری خود مطمئن هستید؟" onConfirm={handleLogout} onCancel={() => setConfirmLogout(false)} confirmText="خروج"/>}
      {alarmModalMed && <AlarmModal medication={alarmModalMed} onClose={() => setAlarmModalMed(null)} onTake={toggleMedicationTaken} onSnooze={snoozeMedication} />}
      <div className="flex-grow p-4 pb-24"><RenderPage /></div>
      <BottomNavBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
}
