// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Theme Toggle Functionality
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or use device preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
    
    // Toggle theme on click
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        let newTheme;
        
        if (currentTheme === 'dark') {
            newTheme = 'light';
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            document.documentElement.removeAttribute('data-theme');
        } else {
            newTheme = 'dark';
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            document.documentElement.setAttribute('data-theme', 'dark');
        }
        
        localStorage.setItem('theme', newTheme);
    });

    // Typing Animation
    const typedTextElement = document.getElementById('typed-text');
    const cursorElement = document.querySelector('.cursor');
    const textArray = [
        "Creating innovative digital solutions",
        "Building responsive web applications",
        "Turning ideas into reality",
        "Passionate about web development"
    ];
    let textArrayIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100; // Delay between each character typing
    let erasingDelay = 50; // Delay between each character erasing
    let newTextDelay = 2000; // Delay before starting to erase text

    function type() {
        const currentText = textArray[textArrayIndex];
        
        if (isDeleting) {
            // Remove character
            typedTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = erasingDelay;
        } else {
            // Add character
            typedTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 100;
        }

        // If word is complete
        if (!isDeleting && charIndex === currentText.length) {
            // Set delete to true and give some time before starting to delete
            isDeleting = true;
            typingDelay = newTextDelay;
        } else if (isDeleting && charIndex === 0) {
            // If all characters are deleted
            isDeleting = false;
            // Move to next text in the array
            textArrayIndex = (textArrayIndex + 1) % textArray.length;
        }

        setTimeout(type, typingDelay);
    }

    // Start the typing animation
    setTimeout(type, newTextDelay);

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Navigation
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', function() {
        // Toggle Nav
        navLinks.classList.toggle('active');
        
        // Toggle Burger Animation
        burger.classList.toggle('active');
        
        // Animate Links
        navLinksItems.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });

    // Close mobile menu when clicking on a link
    navLinksItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                burger.classList.remove('active');
                
                navLinksItems.forEach(link => {
                    link.style.animation = '';
                });
            }
        });
    });

    // Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For now, we'll just log it to the console
            console.log('Form submitted:', { name, email, subject, message });
            
            // Show a success message (you can replace this with your own UI feedback)
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset the form
            contactForm.reset();
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for navbar height
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add animation to project cards on hover
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}); 