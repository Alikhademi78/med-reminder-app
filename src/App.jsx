<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ecut Case - معرفی نسل جدید هارد کیس</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;700;900&display=swap" rel="stylesheet">
    <style>
        :root {
            --color-bg: #0A192F; /* Navy Blue */
            --color-text: #ccd6f6;
            --color-text-secondary: #8892b0;
            --color-accent: #FF5722; /* Deep Orange */
            --color-card-bg: #112240;
        }

        html {
            scroll-behavior: smooth;
        }

        body {
            font-family: 'Vazirmatn', sans-serif;
            background-color: var(--color-bg);
            color: var(--color-text);
            overflow-x: hidden;
        }
        
        #animated-bg {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
        }

        .section {
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            padding: 8rem 2rem;
            overflow: hidden;
        }
        
        /* Definitive fade effect using ::before and ::after */
        .section::before, .section::after {
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            z-index: 2;
            pointer-events: none;
            height: 350px; /* Increased height for a softer blend */
        }
        
        .section::before {
            top: 0;
            background: linear-gradient(to bottom, var(--color-bg) 20%, transparent 100%);
        }

        .section::after {
            bottom: 0;
            background: linear-gradient(to top, var(--color-bg) 20%, transparent 100%);
        }
        
        /* Remove fades where not needed */
        #hero-section::before,
        #purchase::after {
            display: none;
        }

        .section-content {
            max-width: 980px;
            margin: 0 auto;
            text-align: center;
            position: relative;
            z-index: 3;
        }

        .headline {
            font-size: clamp(2.5rem, 5vw, 4.5rem);
            font-weight: 900;
            line-height: 1.1;
            letter-spacing: -0.015em;
            color: var(--color-text);
        }

        .sub-headline {
            font-size: clamp(1.25rem, 2.5vw, 2rem);
            font-weight: 700;
            color: var(--color-text-secondary);
        }
        
        .body-text {
            font-size: clamp(1rem, 1.8vw, 1.3rem);
            line-height: 1.6;
            color: var(--color-text-secondary);
            max-width: 600px;
            margin: 1rem auto 0;
        }

        .cta-button {
            background-color: var(--color-accent);
            color: white;
            padding: 1rem 2rem;
            border-radius: 9999px;
            font-weight: 700;
            font-size: 1.1rem;
            display: inline-block;
            margin-top: 2rem;
            transition: transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;
            box-shadow: 0 0 20px rgba(255, 87, 34, 0.4);
        }
        .cta-button:hover {
            background-color: #f4511e;
            transform: scale(1.05) translateY(-2px);
            box-shadow: 0 0 30px rgba(255, 87, 34, 0.6);
        }
        
        .bg-image {
            position: absolute;
            inset: 0;
            z-index: 1;
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 1.2s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        
        /* Scroll-triggered animations */
        .reveal {
            opacity: 0;
            transform: translateY(50px);
            transition: opacity 1.2s cubic-bezier(0.165, 0.84, 0.44, 1), transform 1.2s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        
        .reveal-fast {
             transition-delay: 0.2s;
        }
        .reveal-slow {
             transition-delay: 0.4s;
        }

        .reveal.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .glowing-image {
             transition: box-shadow 0.5s ease, transform 0.3s ease;
             -webkit-filter: drop-shadow(0 0 35px rgba(255, 87, 34, 0.3));
             filter: drop-shadow(0 0 35px rgba(255, 87, 34, 0.3));
        }
        .glowing-image:hover {
             transform: scale(1.03);
            -webkit-filter: drop-shadow(0 0 45px rgba(255, 87, 34, 0.5));
             filter: drop-shadow(0 0 45px rgba(255, 87, 34, 0.5));
        }

    </style>
</head>
<body>
    <canvas id="animated-bg"></canvas>

    <!-- Section 1: Hero -->
    <section class="section" id="hero-section">
        <div class="bg-image" id="hero-bg-image">
             <img src="https://uploadkon.ir/uploads/e0d810_25Gemini-Generated-Image-wk5n9awk5n9awk5n.jpg" alt="[کیس گیتار در یک محیط سینمایی و تاریک]" class="bg-image opacity-50">
        </div>
        <div class="section-content relative z-10 reveal">
            <h1 class="headline">Ecut Case</h1>
            <h2 class="sub-headline mt-4">همراهی مطمئن در مسیر هنر.</h2>
            <a href="#purchase" class="cta-button">سفارش دهید</a>
        </div>
    </section>
    
    <!-- Section 2: Intro Text -->
    <section class="section" id="intro-section">
        <div class="bg-image opacity-20" id="intro-bg-image">
             <img src="https://uploadkon.ir/uploads/686a10_25شاسی-های-تمام-چوب.jpg" alt="[تصویری از چوب خام و ابزار کار]" class="bg-image">
        </div>
        <div class="section-content reveal">
            <p class="headline" style="font-size: clamp(1.5rem, 3vw, 2.5rem); color: var(--color-text-secondary);">
                ما باور نداشتیم یک کیس بتواند همزمان <span class="text-white">فوق امن</span>، <span class="text-white">بسیار سبک</span> و <span class="text-white">بی‌نهایت زیبا</span> باشد.
                <br>
                پس خودمان آن را ساختیم.
            </p>
        </div>
    </section>
    
    <!-- Section 3: Feature - Material -->
    <section class="section" id="feature-section-1">
        <div class="bg-image opacity-20" id="feature-bg-1">
             <img src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=1974&auto=format&fit=crop" alt="[تصویر نزدیک از بافت انتزاعی و لوکس]" class="bg-image">
        </div>
        <div class="section-content relative z-10 grid md:grid-cols-2 items-center gap-12">
            <div class="text-center md:text-right reveal reveal-fast">
                 <h2 class="headline">طرح جذاب پوست ماری.</h2>
                 <p class="body-text text-white">
                    بدنه‌ی Ecut Case از کامپوزیت پلیمری تقویت‌شده با طرح پوست مار ساخته شده. این ساختار نه تنها ظاهری خیره‌کننده دارد، بلکه ضربه‌ها را جذب کرده و از ساز شما در برابر سخت‌ترین شرایط محافظت می‌کند.
                </p>
            </div>
            <div class="reveal reveal-slow">
                 <img src="https://uploadkon.ir/uploads/f2f510_25photo-2025-06-02-12-08-48.jpg" alt="[کیس گیتار Ecut روی شن‌های ساحل در غروب]" class="rounded-3xl glowing-image">
            </div>
        </div>
    </section>
    
    <!-- Section 4: Feature - Security -->
    <section class="section" id="security-section">
        <div class="bg-image opacity-25" id="security-bg-image">
             <img src="https://uploadkon.ir/uploads/d83510_25Gemini-Generated-Image-voyn4vvoyn4vvoyn.jpg" alt="[نمای نزدیک و هنری از قفل‌های کیس Ecut]" class="bg-image">
        </div>
        <div class="section-content reveal">
            <h2 class="headline">قفل‌هایی که به آن‌ها اعتماد دارید.</h2>
            <p class="body-text mt-4">
                شش قفل فولادی با روکش کروم، بدنه‌ی کیس را به صورت یکپارچه در کنار هم نگه می‌دارند. باز و بسته شدن نرم، قفل شدن محکم. امنیت، بدون هیچ‌گونه مصالحه‌ای.
            </p>
        </div>
    </section>

    <!-- Section 5: Feature - Interior -->
    <section class="section" id="feature-section-2">
        <div class="bg-image opacity-25" id="feature-bg-2">
             <img src="https://uploadkon.ir/uploads/fa2e10_25Gemini-Generated-Image-qkmjt2qkmjt2qkmj.jpg" alt="[نمای داخلی مخملی و لوکس کیس گیتار با نورپردازی نارنجی]" class="bg-image">
        </div>
        <div class="section-content reveal">
            <h2 class="headline">آغوشی امن برای ساز شما.</h2>
            <p class="body-text mt-4">
               فضای داخلی با مخمل بسیار نرم و بالشتک‌های فرم‌گرفته، گیتار شما را کاملاً در بر می‌گیرد و از هرگونه لرزش و خط و خش در حین جابجایی جلوگیری می‌کند.
            </p>
        </div>
    </section>

    <!-- Section 6: Specs -->
    <section class="section" id="specs">
         <div class="bg-image opacity-20" id="specs-bg-image">
             <img src="https://uploadkon.ir/uploads/fdc810_25Gemini-Generated-Image-9dwcmd9dwcmd9dwc.jpg" alt="[نمای شماتیک و فنی از ساختار کیس گیتار]" class="bg-image">
        </div>
        <div class="section-content reveal">
            <h2 class="headline">مشخصات فنی Ecut Case.</h2>
            <div class="mt-12 grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
                <div class="bg-[var(--color-card-bg)] bg-opacity-50 backdrop-blur-sm border border-orange-500/20 p-6 rounded-2xl">
                    <h3 class="text-xl md:text-2xl font-bold">جنس بدنه</h3>
                    <p class="text-gray-400 mt-2">کامپوزیت پلیمری</p>
                </div>
                <div class="bg-[var(--color-card-bg)] bg-opacity-50 backdrop-blur-sm border border-orange-500/20 p-6 rounded-2xl">
                    <h3 class="text-xl md:text-2xl font-bold">پوشش داخلی</h3>
                    <p class="text-gray-400 mt-2">مخمل ضدخش</p>
                </div>
                <div class="bg-[var(--color-card-bg)] bg-opacity-50 backdrop-blur-sm border border-orange-500/20 p-6 rounded-2xl">
                    <h3 class="text-xl md:text-2xl font-bold">تعداد قفل</h3>
                    <p class="text-gray-400 mt-2">۶ عدد فولادی</p>
                </div>
                 <div class="bg-[var(--color-card-bg)] bg-opacity-50 backdrop-blur-sm border border-orange-500/20 p-6 rounded-2xl">
                    <h3 class="text-xl md:text-2xl font-bold">وزن</h3>
                    <p class="text-gray-400 mt-2">۴.۲ کیلوگرم</p>
                </div>
                 <div class="bg-[var(--color-card-bg)] bg-opacity-50 backdrop-blur-sm border border-orange-500/20 p-6 rounded-2xl">
                    <h3 class="text-xl md:text-2xl font-bold">ابعاد خارجی</h3>
                    <p class="text-gray-400 mt-2">۱۰۵x۴۰x۱۵ سانتی‌متر</p>
                </div>
                 <div class="bg-[var(--color-card-bg)] bg-opacity-50 backdrop-blur-sm border border-orange-500/20 p-6 rounded-2xl">
                    <h3 class="text-xl md:text-2xl font-bold">رنگ‌بندی</h3>
                    <p class="text-gray-400 mt-2">آبی اقیانوسی</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Section 7: Purchase -->
    <section class="section" id="purchase">
        <div class="section-content reveal">
            <h2 class="headline">زمان ارتقاست.</h2>
            <p class="sub-headline mt-4">Ecut Case را همین امروز سفارش دهید.</p>
            <p class="text-5xl font-bold my-8" style="color: var(--color-accent);">۱۱,۵۰۰,۰۰۰ تومان</p>
            <a href="#" class="cta-button">افزودن به سبد خرید</a>
        </div>
    </section>


    <script>
        // --- Animated Background ---
        const canvas = document.getElementById('animated-bg');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particles = [];
        const particleCount = 50;

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedX = Math.random() * 1 - 0.5;
                this.speedY = Math.random() * 1 - 0.5;
                this.color = `rgba(255, 87, 34, ${Math.random() * 0.5})`;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.size > 0.2) this.size -= 0.01;
                if (this.size <= 0.2) {
                    this.x = Math.random() * canvas.width;
                    this.y = Math.random() * canvas.height;
                    this.size = Math.random() * 2 + 1;
                    this.speedX = Math.random() * 1 - 0.5;
                    this.speedY = Math.random() * 1 - 0.5;
                }
            }
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initParticles() {
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }
            requestAnimationFrame(animateParticles);
        }

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            particles = [];
            initParticles();
        });
        
        initParticles();
        animateParticles();

        // --- Intersection Observer for animations ---
        document.addEventListener('DOMContentLoaded', () => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, {
                threshold: 0.2
            });

            const revealElements = document.querySelectorAll('.reveal');
            revealElements.forEach(el => observer.observe(el));
            
            // --- Parallax & Scroll Effects ---
            const heroBg = document.getElementById('hero-bg-image');
            const introBg = document.getElementById('intro-bg-image');
            const featureBg1 = document.getElementById('feature-bg-1');
            const securityBg = document.getElementById('security-bg-image');
            const featureBg2 = document.getElementById('feature-bg-2');
            const specsBg = document.getElementById('specs-bg-image');
            
            window.addEventListener('scroll', () => {
                const scrollY = window.scrollY;
                // General Parallax
                if(heroBg) heroBg.style.transform = `translateY(${scrollY * 0.3}px) scale(1.1)`;
                if(introBg) introBg.style.transform = `translateY(${ (scrollY - introBg.parentElement.offsetTop) * 0.2}px) scale(1.1)`;
                if(featureBg1) featureBg1.style.transform = `translateY(${ (scrollY - featureBg1.parentElement.offsetTop) * 0.2}px) scale(1.1)`;
                if(securityBg) securityBg.style.transform = `translateY(${ (scrollY - securityBg.parentElement.offsetTop) * 0.2}px) scale(1.1)`;
                if(featureBg2) featureBg2.style.transform = `translateY(${ (scrollY - featureBg2.parentElement.offsetTop) * 0.2}px) scale(1.1)`;
                if(specsBg) specsBg.style.transform = `translateY(${ (scrollY - specsBg.parentElement.offsetTop) * 0.2}px) scale(1.1)`;
            });
        });
    </script>
</body>
</html>
