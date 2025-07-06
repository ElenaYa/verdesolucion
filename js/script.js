function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu-organic');
    const burgerMenu = document.querySelector('.burger-menu-organic');
    
    navMenu.classList.toggle('mobile-active');
    burgerMenu.classList.toggle('active');
}

function setupMobileNav() {
    const nav = document.querySelector('.navbar-organic');
    const navMenu = document.querySelector('.nav-menu-organic');
    const burgerMenu = document.querySelector('.burger-menu-organic');
    
    if (!navMenu || !burgerMenu) return;
    
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
    
    navMenu.addEventListener('click', (e) => {
        if (e.target.classList.contains('nav-link-organic')) {
            navMenu.classList.remove('mobile-active');
            burgerMenu.classList.remove('active');
        }
    });
    
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && navMenu.classList.contains('mobile-active')) {
            navMenu.classList.remove('mobile-active');
            burgerMenu.classList.remove('active');
        }
    });
    
    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();
}

function showModal() {
    const modal = document.getElementById('successModal');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
    requestAnimationFrame(() => {
        modal.classList.add('show');
    });
}

function closeModal() {
    const modal = document.getElementById('successModal');
    document.body.style.overflow = ''; // Restore scrolling
    modal.classList.remove('show');
}

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const firstName = formData.get('firstName');
            const email = formData.get('email');
            const city = formData.get('city');
            const propertyType = formData.get('propertyType');
            const message = formData.get('message');
            
            if (!firstName || !email || !message) {
                if (!firstName) {
                    const firstNameInput = document.getElementById('firstName');
                    firstNameInput.classList.add('error');
                }
                if (!email) {
                    const emailInput = document.getElementById('email');
                    emailInput.classList.add('error');
                }
                if (!message) {
                    const messageInput = document.getElementById('message');
                    messageInput.classList.add('error');
                }
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                const emailInput = document.getElementById('email');
                emailInput.classList.add('error');
                alert('Por favor, ingresa un email válido.');
                return;
            }
            
            document.getElementById('firstName').classList.remove('error');
            document.getElementById('email').classList.remove('error');
            document.getElementById('message').classList.remove('error');
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            const delay = Math.random() * 500 + 2000;
            
            setTimeout(function() {
                showModal();
                
                contactForm.reset();
                
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
            }, delay);
        });

        ['firstName', 'email', 'message'].forEach(fieldId => {
            const input = document.getElementById(fieldId);
            if (input) {
                input.addEventListener('input', function() {
                    this.classList.remove('error');
                });
            }
        });

        document.addEventListener('click', function(e) {
            const modal = document.getElementById('successModal');
            if (e.target === modal) {
                closeModal();
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeModal();
            }
        });
    }
    
    setupMobileNav();
});

function calculateSavings() {
    const monthlyBill = document.getElementById('monthlyBill').value;
    const roofSize = document.getElementById('roofSize').value;
    const resultDiv = document.getElementById('savingsResult');
    
    if (!monthlyBill || !roofSize) {
        alert('Por favor, completa ambos campos para calcular tu ahorro.');
        return;
    }
    
    const monthlyBillNum = parseInt(monthlyBill);
    const roofSizeNum = parseInt(roofSize);
    
    const systemSizeKW = Math.min(roofSizeNum / 8, monthlyBillNum / 200);
    
    const monthlySavings = monthlyBillNum * 0.8;
    const annualSavings = monthlySavings * 12;
    
    const estimatedInvestment = systemSizeKW * 25000; 
    
    const paybackYears = (estimatedInvestment / annualSavings).toFixed(1);
    
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

document.addEventListener('DOMContentLoaded', function() {
    setupScrollAnimations();
    setupParallax();
    
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

document.addEventListener('DOMContentLoaded', animateEnergyIndicators);