// DOM Elements
const navLinks = document.querySelectorAll('.nav-link');
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const hamburger = document.querySelector('.hamburger');
const backToTop = document.querySelector('.back-to-top');
const contactForm = document.getElementById('contactForm');
const successModal = document.querySelector('.success-modal');
const modalClose = document.querySelector('.modal-close');
const sections = document.querySelectorAll('.section');

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initAnimations();
    
    // Initialize counters
    initCounters();
    
    // Initialize skill bars
    initSkillBars();
    
    // Initialize form submission
    initFormSubmission();
    
    // Initialize tool animations
    initToolAnimations();
    
    // Trigger animations on page load
    setTimeout(() => {
        triggerScrollAnimations();
    }, 500);
});

// Navigation smooth scroll
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        // Update active nav link
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        
        // Close mobile menu if open
        closeMobileMenu();
        
        // Smooth scroll to section
        smoothScrollTo(targetId);
    });
});

// Mobile menu toggle
menuToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu function
function closeMobileMenu() {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
}

// Smooth scroll to element
function smoothScrollTo(elementId) {
    const element = document.querySelector(elementId);
    if (element) {
        const offset = 80; // Adjust based on your navbar height
        const elementPosition = element.offsetTop - offset;
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// Initialize animations
function initAnimations() {
    // Add scroll event listener for back to top button
    window.addEventListener('scroll', function() {
        // Back to top button visibility
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
        
        // Trigger animations when scrolling
        triggerScrollAnimations();
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
        
        // Add parallax effect
        addParallaxEffect();
    });
    
    // Close modal
    modalClose.addEventListener('click', function() {
        successModal.classList.remove('active');
    });
    
    // Close modal when clicking outside
    successModal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('active');
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target) && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Back to top button
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Update active nav link based on scroll position
function updateActiveNavLink() {
    let current = '';
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Initialize counters
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const updateCounter = () => {
            const target = +counter.getAttribute('data-target');
            
            // Start counter when element is in viewport
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        let count = 0;
                        const increment = target / 100;
                        
                        const countUp = () => {
                            count += increment;
                            
                            if (count < target) {
                                if (counter.getAttribute('data-target').includes('M')) {
                                    counter.innerText = (count / 1000000).toFixed(1) + 'M+';
                                } else if (counter.getAttribute('data-target') === '50') {
                                    counter.innerText = Math.floor(count) + '+';
                                } else if (counter.getAttribute('data-target') === '245') {
                                    counter.innerText = Math.floor(count) + '%';
                                } else {
                                    counter.innerText = Math.floor(count);
                                }
                                setTimeout(countUp, 20);
                            } else {
                                if (counter.getAttribute('data-target').includes('M')) {
                                    counter.innerText = (target / 1000000).toFixed(1) + 'M+';
                                } else if (counter.getAttribute('data-target') === '50') {
                                    counter.innerText = target + '+';
                                } else if (counter.getAttribute('data-target') === '245') {
                                    counter.innerText = target + '%';
                                } else {
                                    counter.innerText = target;
                                }
                            }
                        };
                        
                        countUp();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(counter);
        };
        
        updateCounter();
    });
}

// Initialize skill bars
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    skillBars.forEach(bar => {
        const progress = bar.querySelector('.progress');
        const percentSpan = bar.querySelector('.skill-percent');
        const targetWidth = percentSpan.getAttribute('data-width');
        
        // Start animation when element is in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate progress bar
                    progress.style.width = targetWidth + '%';
                    
                    // Animate percentage counter
                    let current = 0;
                    const target = parseInt(targetWidth);
                    const increment = target / 50;
                    
                    const updatePercent = () => {
                        if (current < target) {
                            current = Math.min(current + increment, target);
                            percentSpan.textContent = Math.round(current) + '%';
                            setTimeout(updatePercent, 20);
                        }
                    };
                    
                    updatePercent();
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(bar);
    });
}

// Initialize tool animations
function initToolAnimations() {
    const tools = document.querySelectorAll('.tool');
    
    tools.forEach((tool, index) => {
        tool.style.animationDelay = (index * 0.1) + 's';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    tool.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(tool);
    });
}

// Initialize form submission
function initFormSubmission() {
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitButton = this.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            
            // Change button text to show loading
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
            
            try {
                // Create FormData object
                const formData = new FormData(this);
                
                // Send the form data
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData
                });
                
                const result = await response.json();
                
                if (result.success) {
                    // Show success modal
                    successModal.classList.add('active');
                    
                    // Reset form
                    this.reset();
                } else {
                    // Show error message
                    alert('There was an error sending your message. Please try again or email me directly at muscabberde0@gmail.com');
                    console.error('Form error:', result.message);
                }
            } catch (error) {
                // Show error message
                alert('There was an error sending your message. Please try again or email me directly at muscabberde0@gmail.com');
                console.error('Form submission error:', error);
            } finally {
                // Reset button state
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
            }
        });
    }
}

// Trigger animations on scroll
function triggerScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .bounce-in');
    
    animatedElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animated');
        }
    });
}

// Add parallax effect to background elements
function addParallaxEffect() {
    const scrolled = window.pageYOffset;
    const circles = document.querySelectorAll('.circle');
    const squares = document.querySelectorAll('.square');
    
    circles.forEach((circle, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        circle.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
    });
    
    squares.forEach((square, index) => {
        const speed = 0.3 + (index * 0.1);
        const yPos = -(scrolled * speed);
        square.style.transform = `translateY(${yPos}px) rotate(${-scrolled * 0.05}deg)`;
    });
}

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Escape key closes modal
    if (e.key === 'Escape' && successModal.classList.contains('active')) {
        successModal.classList.remove('active');
    }
    
    // Escape key closes mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});