document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        nav.classList.toggle('active');
        this.innerHTML = nav.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // Header Scroll Effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Services Tab System
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.service-tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const dotsContainer = document.querySelector('.slider-dots');
    let currentIndex = 0;
    
    // Create dots
    testimonials.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToTestimonial(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.slider-dot');
    
    function updateTestimonial() {
        testimonials.forEach((testimonial, index) => {
            testimonial.classList.toggle('active', index === currentIndex);
        });
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    function goToTestimonial(index) {
        currentIndex = index;
        updateTestimonial();
    }
    
    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        updateTestimonial();
    }
    
    function prevTestimonial() {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        updateTestimonial();
    }
    
    nextBtn.addEventListener('click', nextTestimonial);
    prevBtn.addEventListener('click', prevTestimonial);
    
    // Auto-rotate testimonials
    let testimonialInterval = setInterval(nextTestimonial, 5000);
    
    // Pause on hover
    const slider = document.querySelector('.testimonials-slider');
    slider.addEventListener('mouseenter', () => clearInterval(testimonialInterval));
    slider.addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(nextTestimonial, 5000);
    });
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', { name, email, subject, message });
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });
    
    // Animation on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.about-item, .product-card, .service-card, .testimonial, .contact-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial state for animated elements
    document.querySelectorAll('.about-item, .product-card, .service-card, .testimonial, .contact-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
});