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

// Create Floating Bubbles
function createBubbles() {
    const bubblesContainer = document.getElementById('bubblesContainer');
    const bubbleCount = 15;

    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');

        // Random size between 10px and 40px
        const size = Math.random() * 30 + 10;
        bubble.style.width = size + 'px';
        bubble.style.height = size + 'px';

        // Random horizontal position
        bubble.style.left = Math.random() * 100 + '%';

        // Random animation duration between 10s and 20s
        const duration = Math.random() * 10 + 10;
        bubble.style.animationDuration = duration + 's';

        // Random delay
        const delay = Math.random() * 5;
        bubble.style.animationDelay = delay + 's';

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
                const width = progressBar.getAttribute('data-width');

                setTimeout(() => {
                    progressBar.style.width = width + '%';
                }, 500);

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

// Form Submission
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[placeholder="Full Name"]').value;
        const email = contactForm.querySelector('input[placeholder="Email Address"]').value;
        const message = contactForm.querySelector('textarea').value;

        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
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

function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const seaweeds = document.querySelectorAll('.seaweed');

        seaweeds.forEach((seaweed, index) => {
            const speed = 0.5 + (index * 0.1);
            seaweed.style.transform = `translateY(${scrolled * speed}px) rotate(${Math.sin(scrolled * 0.01) * 5}deg)`;
        });
    });
}

// Add Loading Animation
function addLoadingAnimation() {
    const elements = document.querySelectorAll('.home-content, .home-img, .skill-box, .service-box, .portfolio-card');

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

// Typing Animation Enhancement

function addHoverEffects() {
    const interactiveElements = document.querySelectorAll('.btn, .social-icons a, .skill-box, .service-box, .portfolio-card, .filter-btn');

    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.transform += ' scale(1.05)';
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = element.style.transform.replace(' scale(1.05)', '');
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    createBubbles();
    animateSkills();
    initPortfolioFilter();
    initContactForm();
    initParallax();
    addLoadingAnimation();
    enhanceTypingAnimation();
    addHoverEffects();

    setInterval(() => {
        if (document.querySelectorAll('.bubble').length < 20) {
            createBubbles();
        }
    }, 10000);
});

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