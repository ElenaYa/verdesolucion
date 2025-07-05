// Mobile menu toggle
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu-organic');
    const burgerMenu = document.querySelector('.burger-menu-organic');
    
    navMenu.classList.toggle('mobile-active');
    burgerMenu.classList.toggle('active');
}

// Enhanced mobile navigation
function setupMobileNav() {
    const nav = document.querySelector('.navbar-organic');
    const navMenu = document.querySelector('.nav-menu-organic');
    const burgerMenu = document.querySelector('.burger-menu-organic');
    
    if (!navMenu || !burgerMenu) return;
    
    // Show/hide burger menu based on screen size
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            burgerMenu.style.display = 'flex';
            navMenu.classList.add('mobile-nav');
        } else {
            burgerMenu.style.display = 'none';
            navMenu.classList.remove('mobile-nav', 'mobile-active');
            burgerMenu.classList.remove('active');
        }
    }
    
    // Close mobile menu when clicking on a link
    navMenu.addEventListener('click', (e) => {
        if (e.target.classList.contains('nav-link-organic')) {
            navMenu.classList.remove('mobile-active');
            burgerMenu.classList.remove('active');
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && navMenu.classList.contains('mobile-active')) {
            navMenu.classList.remove('mobile-active');
            burgerMenu.classList.remove('active');
        }
    });
    
    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();
}

// Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const firstName = formData.get('firstName');
            const lastName = formData.get('lastName');
            const email = formData.get('email');
            const phone = formData.get('phone');
            
            // Basic validation
            if (!firstName || !lastName || !email || !phone) {
                alert('Por favor, completa todos los campos obligatorios.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, ingresa un email válido.');
                return;
            }
            
            // Phone validation (basic Mexican phone format)
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
            if (!phoneRegex.test(phone)) {
                alert('Por favor, ingresa un teléfono válido.');
                return;
            }
            
            // Disable submit button and show loading
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            // Simulate sending (2-2.5 second delay)
            const delay = Math.random() * 500 + 2000; // 2-2.5 seconds
            
            setTimeout(function() {
                // Show success message
                alert('Gracias por tu mensaje. Te contactaremos pronto.');
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Optional: redirect to thank you page or home
                // window.location.href = '/';
                
            }, delay);
        });
    }
    
    // Setup mobile navigation
    setupMobileNav();
});

// Savings Calculator
function calculateSavings() {
    const monthlyBill = document.getElementById('monthlyBill').value;
    const roofSize = document.getElementById('roofSize').value;
    const resultDiv = document.getElementById('savingsResult');
    
    if (!monthlyBill || !roofSize) {
        alert('Por favor, completa ambos campos para calcular tu ahorro.');
        return;
    }
    
    // Simple calculation logic
    const monthlyBillNum = parseInt(monthlyBill);
    const roofSizeNum = parseInt(roofSize);
    
    // Calculate potential system size (rough estimate)
    const systemSizeKW = Math.min(roofSizeNum / 8, monthlyBillNum / 200);
    
    // Calculate savings (assuming 80% reduction)
    const monthlySavings = monthlyBillNum * 0.8;
    const annualSavings = monthlySavings * 12;
    
    // Calculate estimated investment
    const estimatedInvestment = systemSizeKW * 25000; // $25,000 MXN per kW
    
    // Calculate payback period
    const paybackYears = (estimatedInvestment / annualSavings).toFixed(1);
    
    // Display results
    resultDiv.innerHTML = `
        <h4>🌟 Tu Potencial de Ahorro</h4>
        <p><strong>Sistema estimado:</strong> ${systemSizeKW.toFixed(1)} kW</p>
        <p><strong>Ahorro mensual:</strong> ${monthlySavings.toLocaleString()} MXN</p>
        <p><strong>Ahorro anual:</strong> ${annualSavings.toLocaleString()} MXN</p>
        <p><strong>Inversión estimada:</strong> ${estimatedInvestment.toLocaleString()} MXN</p>
        <p><strong>Recuperación:</strong> ${paybackYears} años</p>
        <br>
        <p><em>*Estimación basada en promedio de radiación solar en México. Solicita una evaluación gratuita para cálculos precisos.</em></p>
    `;
    resultDiv.style.display = 'block';
}

// Smooth scrolling for internal links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Enhanced animation on scroll
function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
}

// Parallax effect for hero background elements
function setupParallax() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        floatingElements.forEach((element, index) => {
            const speed = (index + 1) * 0.1;
            element.style.transform = `translateY(${rate * speed}px)`;
        });
    });
}

// Initialize all enhancements when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    setupScrollAnimations();
    setupParallax();
    
    // Add intersection observer for card hover effects
    const cards = document.querySelectorAll('.feature-card, .benefit-card, .testimonial-card, .hybrid-card');
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        cardObserver.observe(card);
    });
});

// Add dynamic energy indicator animation
function animateEnergyIndicators() {
    const energyIndicators = document.querySelectorAll('.energy-indicator, .wind-indicator');
    
    energyIndicators.forEach(indicator => {
        const icon = indicator.querySelector('.energy-icon, .turbine-icon');
        if (icon) {
            setInterval(() => {
                icon.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    icon.style.transform = 'scale(1)';
                }, 200);
            }, 2000);
        }
    });
}

// Initialize energy animations
document.addEventListener('DOMContentLoaded', animateEnergyIndicators);