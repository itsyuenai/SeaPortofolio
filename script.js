// Menu Toggle
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

// Mobile Menu Toggle
menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Scroll Active Link
window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });

    // Scroll to top button
    let scrollTop = document.getElementById('scrollTop');
    if (window.scrollY > 300) {
        scrollTop.classList.add('active');
    } else {
        scrollTop.classList.remove('active');
    }
};

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        // Close mobile menu if open
        navbar.classList.remove('active');
        menuIcon.classList.remove('bx-x');
    });
});

// Scroll to Top Button
document.getElementById('scrollTop').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

function createBubbles() {
    const bubblesContainer = document.getElementById('bubblesContainer');
    const bubbleCount = Math.floor(Math.random() * 8) + 12; // Random between 12-20

    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');

        // More realistic size distribution
        const sizeRandom = Math.random();
        let size;
        if (sizeRandom < 0.4) {
            size = Math.random() * 8 + 4; // Small bubbles 
        } else if (sizeRandom < 0.8) {
            size = Math.random() * 15 + 12; // Medium bubbles 
        } else {
            size = Math.random() * 20 + 27; // Large bubbles 
        }

        bubble.style.width = size + 'px';
        bubble.style.height = size + 'px';

        // Random horizontal position with some margin
        bubble.style.left = Math.random() * 90 + 5 + '%';

        // larger bubbles float slower
        const baseDuration = size < 15 ? 12 : size < 30 ? 18 : 25;
        const duration = baseDuration + Math.random() * 8;
        bubble.style.animationDuration = duration + 's';

        // Random delay for more natural appearance
        const delay = Math.random() * 10;
        bubble.style.animationDelay = delay + 's';

        // Add slight horizontal drift variation
        const drift = (Math.random() - 0.5) * 40;
        bubble.style.setProperty('--drift', drift + 'px');

        bubblesContainer.appendChild(bubble);
    }
}

// Skills Animation on Scroll
function animateSkills() {
    const skillBoxes = document.querySelectorAll('.skill-box');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.progress-bar');
                if (progressBar) {
                    const width = progressBar.getAttribute('data-width');
                    setTimeout(() => {
                        progressBar.style.width = width + '%';
                    }, 500);
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillBoxes.forEach(box => {
        observer.observe(box);
    });
}

// Portfolio Filter
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    const cardCategory = card.getAttribute('data-category');
                    if (cardCategory === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });
}

// Enhanced Contact Form
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = contactForm.querySelector('input[placeholder="Full Name"]').value;
        const email = contactForm.querySelector('input[placeholder="Email Address"]').value;
        const message = contactForm.querySelector('textarea').value;

        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        const submitBtn = contactForm.querySelector('.btn');
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Sending...';
        submitBtn.style.pointerEvents = 'none';

        setTimeout(() => {
            alert('Message sent successfully! I will get back to you soon.');
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.style.pointerEvents = 'auto';
        }, 2000);
    });
}

// Enhanced Parallax Effect for Seaweed
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const seaweeds = document.querySelectorAll('.seaweed');

        seaweeds.forEach((seaweed, index) => {
            const speed = 0.2 + (index * 0.05);
            const rotation = Math.sin(scrolled * 0.005 + index) * 3;
            seaweed.style.transform = `translateY(${scrolled * speed}px) rotate(${rotation}deg)`;
        });
    });
}

// Add Loading Animation
function addLoadingAnimation() {
    const elements = document.querySelectorAll('.home-content, .home-img, .skill-box, .service-box, .portfolio-card, .education-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Enhanced Typing Animation
function enhanceTypingAnimation() {
    const words = ["UI/UX Designer"];
    let wordIndex = 0;
    let letterIndex = 0;
    let isDeleting = false;
    const textElement = document.querySelector('.text-animation span::before');

    // Remove the CSS animation and handle it with JavaScript instead
    const style = document.createElement('style');
    style.textContent = `
        .text-animation span::before {
            content: "";
            animation: none;
        }
        .text-animation span::after {
            content: "";
            background-color: var(--bg-color);
            position: absolute;
            width: 3px;
            height: 100%;
            border-left: 3px solid var(--main-color);
            right: -8px;
            animation: cursor 0.6s infinite;
        }
    `;
    document.head.appendChild(style);

    const spanElement = document.querySelector('.text-animation span');
    if (!spanElement) return;

    function typeEffect() {
        const currentWord = words[wordIndex];

        if (!isDeleting) {
            spanElement.textContent = currentWord.substring(0, letterIndex + 1);
            letterIndex++;

            if (letterIndex === currentWord.length) {
                isDeleting = true;
                setTimeout(typeEffect, 2000); // Pause at end of word
                return;
            }
        } else {
            spanElement.textContent = currentWord.substring(0, letterIndex);
            letterIndex--;

            if (letterIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }
        }

        const speed = isDeleting ? 100 : 150;
        setTimeout(typeEffect, speed);
    }

    // Start the typing effect
    setTimeout(typeEffect, 1000);
}

// Add Hover Effects
function addHoverEffects() {
    const interactiveElements = document.querySelectorAll('.btn, .social-icons a, .skill-box, .service-box, .portfolio-card, .filter-btn, .education-item');

    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            if (!element.style.transform.includes('scale')) {
                element.style.transform += ' scale(1.02)';
            }
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = element.style.transform.replace(' scale(1.02)', '');
        });
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createBubbles();
    animateSkills();
    initPortfolioFilter();
    initContactForm();
    initParallax();
    addLoadingAnimation();
    enhanceTypingAnimation();
    addHoverEffects();

    // Recreate bubbles periodically for continuous effect
    setInterval(() => {
        const currentBubbles = document.querySelectorAll('.bubble').length;
        if (currentBubbles < 15) {
            createBubbles();
        }
    }, 8000);

    // Clean up old bubbles to prevent memory issues
    setInterval(() => {
        const bubbles = document.querySelectorAll('.bubble');
        if (bubbles.length > 30) {
            for (let i = 0; i < 10; i++) {
                if (bubbles[i]) {
                    bubbles[i].remove();
                }
            }
        }
    }, 15000);
});

// Section reveal animation
const revealSections = () => {
    const sections = document.querySelectorAll('section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.15 });

    sections.forEach(section => {
        observer.observe(section);
    });
};

document.addEventListener('DOMContentLoaded', revealSections);

// Add reveal styles
const style = document.createElement('style');
style.textContent = `
    section {
        opacity: 0;
        transform: translateY(50px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    section.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    .home {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);