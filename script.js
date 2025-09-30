// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    easing: 'ease-out-cubic',
    once: true,
    offset: 100,
    delay: 100
});

// Enhanced functionality
document.addEventListener('DOMContentLoaded', function() {
    // Refresh AOS on window resize
    window.addEventListener('resize', function() {
        AOS.refresh();
    });
    
    // FAQ Toggle functionality with enhanced animations
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach((item, index) => {
        const question = item.querySelector('.faq-question');
        const toggle = item.querySelector('.faq-toggle');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items with animation
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherToggle = otherItem.querySelector('.faq-toggle');
                    otherToggle.textContent = '+';
                    otherToggle.style.transform = 'rotate(0deg)';
                }
            });
            
            // Toggle current item with enhanced animation
            if (!isActive) {
                item.classList.add('active');
                toggle.textContent = '−';
                toggle.style.transform = 'rotate(180deg)';
            } else {
                item.classList.remove('active');
                toggle.textContent = '+';
                toggle.style.transform = 'rotate(0deg)';
            }
        });
    });
    
    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Parallax effect for hero background
    const heroBackground = document.querySelector('.hero-bg-image');
    if (heroBackground) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroBackground.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // Enhanced card hover effects
    const cards = document.querySelectorAll('.benefit-card, .role-card, .team-member, .step');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Floating icons animation
    const floatingIcons = document.querySelectorAll('.floating-icon');
    floatingIcons.forEach((icon, index) => {
        const delay = index * 2000;
        setInterval(() => {
            icon.style.animation = 'none';
            setTimeout(() => {
                icon.style.animation = `floatRandom 6s ease-in-out infinite`;
            }, 10);
        }, 6000 + delay);
    });
    
    // Remove typing effect as it interferes with HTML tags
    // Title will show normally with AOS animation
    
    // Add counter animation for salary amounts
    const salaryAmounts = document.querySelectorAll('.amount');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const salaryObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                animateNumber(entry.target);
            }
        });
    }, observerOptions);
    
    salaryAmounts.forEach(amount => {
        salaryObserver.observe(amount);
    });
    
    function animateNumber(element) {
        const text = element.textContent;
        const match = text.match(/(\d+\.?\d*)/);
        if (match) {
            const number = parseFloat(match[1]);
            const prefix = text.substring(0, match.index);
            const suffix = text.substring(match.index + match[0].length);
            
            let current = 0;
            const increment = number / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= number) {
                    current = number;
                    clearInterval(timer);
                }
                element.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
            }, 30);
        }
    }
    
    // Add particles effect
    createParticles();
    
    function createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            overflow: hidden;
        `;
        document.body.appendChild(particlesContainer);
        
        for (let i = 0; i < 20; i++) {
            createParticle(particlesContainer);
        }
    }
    
    function createParticle(container) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: #7c3aed;
            border-radius: 50%;
            opacity: 0.3;
            animation: float 10s linear infinite;
        `;
        
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = '100%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        
        container.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
                createParticle(container); // Create new particle
            }
        }, 10000);
    }
    
    // Add custom cursor effect
    const cursor = document.createElement('div');
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: rgba(124, 58, 237, 0.3);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        mix-blend-mode: difference;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    // Scale cursor on hover over interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .faq-question');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
});
