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
        <p><strong>Ahorro mensual:</strong> $${monthlySavings.toLocaleString()} MXN</p>
        <p><strong>Ahorro anual:</strong> $${annualSavings.toLocaleString()} MXN</p>
        <p><strong>Inversión estimada:</strong> $${estimatedInvestment.toLocaleString()} MXN</p>
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

// Add animation on scroll (optional enhancement)
function animateOnScroll() {
    const elements = document.querySelectorAll('.feature-card, .benefit-card, .testimonial-card, .step');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', animateOnScroll);

// Mobile menu toggle (if needed for mobile responsive design)
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('mobile-active');
}

// Add mobile menu styles when nav becomes mobile
function checkMobileNav() {
    const nav = document.querySelector('.navbar');
    const navMenu = document.querySelector('.nav-menu');
    
    if (window.innerWidth <= 768) {
        nav.classList.add('mobile-nav');
    } else {
        nav.classList.remove('mobile-nav');
        navMenu.classList.remove('mobile-active');
    }
}

window.addEventListener('resize', checkMobileNav);
document.addEventListener('DOMContentLoaded', checkMobileNav);