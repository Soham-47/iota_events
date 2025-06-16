document.addEventListener('DOMContentLoaded', () => {
    // Initialize GSAP plugins if available
    if (typeof gsap !== 'undefined' && gsap.registerPlugin) {
        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

        // Page load animations
        gsap.from('nav', {
            y: -100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });

        // Staggered animations for content sections
        const animateOnScroll = (selector, delay = 0) => {
            const elements = document.querySelectorAll(selector);
            elements.forEach((element, index) => {
                gsap.from(element, {
                    opacity: 0,
                    y: 30,
                    duration: 0.8,
                    delay: delay + (index * 0.1),
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: element,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    }
                });
            });
        };


        // Animate sections with staggered delays
        animateOnScroll('.content-2');
        animateOnScroll('.recent-events h2');
        
        // Animate event cards with staggered delays
        document.querySelectorAll('.event-card').forEach((card, index) => {
            card.style.setProperty('--delay', `${index * 0.15}s`);
            gsap.from(card, {
                opacity: 0,
                y: 50,
                duration: 0.8,
                delay: index * 0.15,
                ease: 'back.out(1.4)',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 90%',
                    toggleActions: 'play none none none'
                }
            });
        });

        // Animate footer elements
        animateOnScroll('footer h3, footer p, footer .social-links a', 0.2);

        // Add floating animation to elements with .float class
        gsap.utils.toArray('.float').forEach((el, i) => {
            gsap.to(el, {
                y: '10px',
                duration: 2 + Math.random(),
                yoyo: true,
                repeat: -1,
                ease: 'sine.inOut',
                delay: Math.random() * 2
            });
        });

        // Enhanced smooth scroll for navigation with active state
        const navLinks = document.querySelectorAll('navbar li');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('data-target') || link.textContent.toLowerCase();
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Add active class to clicked link
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                    
                    // Animate scroll
                    gsap.to(window, {
                        duration: 1.2,
                        scrollTo: {
                            y: targetElement,
                            offsetY: 80
                        },
                        ease: 'power3.inOut',
                        onComplete: () => {
                            // Add pulse effect to target section
                            gsap.to(targetElement, {
                                scale: 1.02,
                                duration: 0.3,
                                yoyo: true,
                                repeat: 1,
                                ease: 'power1.inOut'
                            });
                        }
                    });
                }
            });
        });
        
        // Update active nav link on scroll
        const sections = document.querySelectorAll('section[id]');
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (pageYOffset >= sectionTop - 100) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-target') === current || 
                    link.textContent.toLowerCase() === current) {
                    link.classList.add('active');
                }
            });
        });
    }
});

// Enhanced event card hover effects
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.event-card').forEach(card => {
        const image = card.querySelector('img');
        const content = card.querySelector('.event-card-content');
        
        // Initial state
        gsap.set(content, { y: 0, opacity: 1 });
        
        card.addEventListener('mouseenter', () => {
            // Card lift effect
            gsap.to(card, {
                y: -15,
                duration: 0.6,
                ease: 'power2.out',
                boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                overwrite: 'auto'
            });
            
            // Image zoom effect
            gsap.to(image, {
                scale: 1.1,
                duration: 1.2,
                ease: 'power2.out'
            });
            
            // Content slide up
            gsap.to(content, {
                y: -10,
                duration: 0.6,
                ease: 'power2.out'
            });
            
            // Add a subtle glow
            gsap.to(card, {
                '--glow-opacity': 0.3,
                duration: 0.6,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            // Reset card position
            gsap.to(card, {
                y: 0,
                duration: 0.8,
                ease: 'elastic.out(1, 0.5)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                '--glow-opacity': 0,
                overwrite: 'auto'
            });
            
            // Reset image scale
            gsap.to(image, {
                scale: 1,
                duration: 0.8,
                ease: 'power2.inOut'
            });
            
            // Reset content position
            gsap.to(content, {
                y: 0,
                duration: 0.6,
                ease: 'power2.out'
            });
        });
        
        // Add parallax effect to card image on mousemove
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const moveX = (x - centerX) / 20;
            const moveY = (y - centerY) / 20;
            
            gsap.to(image, {
                x: moveX,
                y: moveY,
                duration: 1.5,
                ease: 'power2.out'
            });
        });
    });
});

// Enhanced parallax and scroll effects
const initParallax = () => {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        const depth = parseFloat(element.getAttribute('data-depth')) || 0.3;
        const yOffset = window.innerHeight * 0.3;
        
        gsap.to(element, {
            y: yOffset * depth,
            scrollTrigger: {
                trigger: element,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            }
        });
    });
};

// Initialize animations when everything is loaded
window.addEventListener('load', () => {
    // Add loaded class to body for any load animations
    document.body.classList.add('loaded');
    
    // Initialize parallax effects
    initParallax();
    
    // Smooth scroll for navigation links with active state
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Update active state
                document.querySelectorAll('nav a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
            
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    });
});

// Add subtle tilt effect to cards on mousemove
const tiltCards = document.querySelectorAll('.tilt');
tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const angleX = (y - centerY) / 20;
        const angleY = (centerX - x) / 20;
        
        gsap.to(card, {
            rotationX: angleX,
            rotationY: angleY,
            transformPerspective: 1000,
            transformOrigin: 'center center',
            ease: 'power1.out',
            duration: 0.5
        });
    });
    
    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            rotationX: 0,
            rotationY: 0,
            duration: 0.8,
            ease: 'elastic.out(1, 0.5)'
        });
    });
});

// Initialize Image Slider
const initImageSlider = () => {
    const slider = document.querySelector('.image-sliders .track');
    if (!slider) return;

    // Clone slides for infinite effect
    const slides = slider.querySelectorAll('img');
    slides.forEach(slide => {
        const clone = slide.cloneNode(true);
        slider.appendChild(clone);
    });

    // Pause on hover
    slider.addEventListener('mouseenter', () => {
        slider.style.animationPlayState = 'paused';
    });

    slider.addEventListener('mouseleave', () => {
        slider.style.animationPlayState = 'running';
    });

    // Handle click on images for lightbox
    const showLightbox = (imgSrc) => {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <img src="${imgSrc}" alt="Gallery Image">
                <span class="close-lightbox">&times;</span>
            </div>
        `;
        
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';
        
        // Close lightbox
        lightbox.querySelector('.close-lightbox').addEventListener('click', () => {
            lightbox.remove();
            document.body.style.overflow = '';
        });
        
        // Close on click outside
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.remove();
                document.body.style.overflow = '';
            }
        });
    };

    // Add click event to all images
    document.querySelectorAll('.image-sliders img').forEach(img => {
        img.addEventListener('click', () => showLightbox(img.src));
    });
};

// Add scroll-triggered animations
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        }
    });
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initImageSlider();
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
});