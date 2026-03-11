/**
 * ANAKEMAK - Main JavaScript
 * Modern Minecraft Store & Promotion Website
 * Updated Version
 */

// ============================================
// DOM Elements
// ============================================
const loadingScreen = document.getElementById('loading-screen');
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const particlesContainer = document.getElementById('particles');
const popupContainer = document.getElementById('popup-container');
const scheduleFilled = document.getElementById('schedule-filled');
const scheduleEmpty = document.getElementById('schedule-empty');
const currentDateEl = document.getElementById('current-date');
const currentTimeEl = document.getElementById('current-time');

// ============================================
// Loading Screen
// ============================================
function initLoadingScreen() {
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 1800);
}

// ============================================
// Navbar Scroll Effect
// ============================================
function initNavbar() {
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ============================================
// Smooth Scroll for Anchor Links
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// Particle Animation
// ============================================
function initParticles() {
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// ============================================
// Scroll Reveal Animation
// ============================================
function initScrollReveal() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
}

// ============================================
// Counter Animation
// ============================================
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

// ============================================
// Popup Notifications
// ============================================
const popupData = [
    { name: 'Calmionix', action: 'membeli Minecraft Skin Custom' },
    { name: 'Nadya', action: 'membeli Minecraft Java Account' },
    { name: 'Qeela', action: 'membeli Minecraft Dungeons' },
    { name: 'Raisa', action: 'membeli Minecraft Bedrock Windows' },
    { name: 'Dika', action: 'membeli Minecraft Legends' },
    { name: 'Bima', action: 'membeli Minecraft Java & Bedrock Code' },
    { name: 'Aldi', action: 'memesan jasa promosi TikTok' },
    { name: 'Rian', action: 'memesan jasa promosi YouTube' },
    { name: 'Nanda', action: 'memesan slot endorse' },
    { name: 'Eka', action: 'membeli Minecraft Custom Skin' }
];

function showPopup() {
    const randomData = popupData[Math.floor(Math.random() * popupData.length)];
    const initials = randomData.name.substring(0, 2).toUpperCase();
    const time = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    
    const popup = document.createElement('div');
    popup.className = 'popup-notification';
    popup.innerHTML = `
        <div class="popup-avatar">${initials}</div>
        <div class="popup-content">
            <div class="popup-name">${randomData.name}</div>
            <div class="popup-action">${randomData.action}</div>
            <div class="popup-time">${time}</div>
        </div>
    `;
    
    popupContainer.appendChild(popup);
    
    setTimeout(() => {
        popup.classList.add('hide');
        setTimeout(() => {
            popup.remove();
        }, 400);
    }, 4000);
}

function initPopupNotifications() {
    setTimeout(() => {
        showPopup();
        
        const scheduleNextPopup = () => {
            const delay = Math.random() * 10000 + 10000;
            setTimeout(() => {
                showPopup();
                scheduleNextPopup();
            }, delay);
        };
        
        scheduleNextPopup();
    }, 5000);
}

// ============================================
// Real-time Clock with Seconds
// ============================================
function updateClock() {
    const now = new Date();
    
    // Format date in Indonesian
    const dateOptions = { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
    };
    const dateStr = now.toLocaleDateString('id-ID', dateOptions);
    
    // Format time with seconds
    const timeOptions = { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Asia/Jakarta'
    };
    const timeStr = now.toLocaleTimeString('id-ID', timeOptions) + ' WIB';
    
    if (currentDateEl) currentDateEl.textContent = dateStr;
    if (currentTimeEl) currentTimeEl.textContent = timeStr;
}

function initClock() {
    updateClock();
    setInterval(updateClock, 1000);
}

// ============================================
// Schedule System - Separated Filled & Empty
// ============================================
const scheduleData = [
    { date: '2026-03-12', name: 'Stecu SMP', status: 'filled' },
    { date: '2026-03-13', name: 'Natural SMP', status: 'filled' },
    { date: '2026-03-14', name: 'Potato SMP', status: 'filled' },
    { date: '2026-03-15', name: 'Hypix', status: 'filled' },
    { date: '2026-03-16', name: 'Trinity Indonesia', status: 'filled' },
    { date: '2026-03-17', name: 'Nexoverse', status: 'filled' },
    { date: '2026-03-18', name: 'Nexoverse', status: 'filled' },
    { date: '2026-03-19', name: 'Slot Tersedia', status: 'empty' },
    { date: '2026-03-20', name: 'Slot Tersedia', status: 'empty' },
    { date: '2026-03-21', name: 'Slot Tersedia', status: 'empty' },
    { date: '2026-03-22', name: 'Slot Tersedia', status: 'empty' },
    { date: '2026-03-23', name: 'Slot Tersedia', status: 'empty' }
];

function formatDate(dateStr) {
    const date = new Date(dateStr);
    const options = { day: 'numeric', month: 'long' };
    return date.toLocaleDateString('id-ID', options);
}

function isToday(dateStr) {
    const today = new Date();
    const date = new Date(dateStr);
    return today.toDateString() === date.toDateString();
}

function isPast(dateStr) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const date = new Date(dateStr);
    return date < today;
}

function createScheduleCard(item) {
    const isTodayDate = isToday(item.date);
    const todayBadge = isTodayDate ? '<div class="today-badge">🔥 Upload Hari Ini</div>' : '';
    
    return `
        <div class="schedule-card ${item.status} ${isTodayDate ? 'today' : ''}">
            ${todayBadge}
            <div class="schedule-date">${formatDate(item.date)}</div>
            <div class="schedule-name">${item.name}</div>
        </div>
    `;
}

function initSchedule() {
    if (!scheduleFilled || !scheduleEmpty) return;
    
    // Filter out past dates
    const visibleSchedule = scheduleData.filter(item => !isPast(item.date));
    
    // Separate filled and empty schedules
    const filledSchedules = visibleSchedule.filter(item => item.status === 'filled');
    const emptySchedules = visibleSchedule.filter(item => item.status === 'empty');
    
    // Render filled schedules
    if (filledSchedules.length > 0) {
        scheduleFilled.innerHTML = filledSchedules.map(createScheduleCard).join('');
    } else {
        scheduleFilled.innerHTML = `
            <div class="schedule-card filled" style="grid-column: 1 / -1;">
                <div class="schedule-name">Belum ada jadwal terisi</div>
            </div>
        `;
    }
    
    // Render empty schedules
    if (emptySchedules.length > 0) {
        scheduleEmpty.innerHTML = emptySchedules.map(createScheduleCard).join('');
    } else {
        scheduleEmpty.innerHTML = `
            <div class="schedule-card empty" style="grid-column: 1 / -1;">
                <div class="schedule-name">Slot penuh</div>
            </div>
        `;
    }
}

// ============================================
// Parallax Effect for Hero
// ============================================
function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        
        if (scrolled < window.innerHeight) {
            hero.style.backgroundPositionY = rate + 'px';
        }
    });
}

// ============================================
// Button Ripple Effect
// ============================================
function initRippleEffect() {
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
                left: ${x}px;
                top: ${y}px;
                width: 100px;
                height: 100px;
                margin-left: -50px;
                margin-top: -50px;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Add ripple animation to CSS dynamically
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ============================================
// Initialize Everything
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.overflow = 'hidden';
    
    initLoadingScreen();
    initNavbar();
    initSmoothScroll();
    initParticles();
    initScrollReveal();
    initCounterAnimation();
    initPopupNotifications();
    initClock();
    initSchedule();
    initParallax();
    initRippleEffect();
});

// ============================================
// Performance: Debounce scroll events
// ============================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

window.addEventListener('scroll', debounce(() => {
    // Additional scroll-based animations
}, 16));

// ============================================
// Preload Images
// ============================================
function preloadImages() {
    const images = [
        'assets/logo.gif',
        'assets/logo.png',
        'assets/products/minecraft-java-bedrock.jpg',
        'assets/products/mc-java-bedrock-code.jpg',
        'assets/products/mc-bedrock-windows.jpg',
        'assets/products/mc-legends.jpg',
        'assets/products/mc-dungeons.jpg',
        'assets/products/mc-skin.jpg',
        'assets/social/tiktok.png',
        'assets/social/youtube.png',
        'assets/social/whatsapp.png'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

document.addEventListener('DOMContentLoaded', preloadImages);
