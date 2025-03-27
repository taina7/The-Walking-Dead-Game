document.addEventListener('DOMContentLoaded', () => {
    // Navigation elements
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const themeToggle = document.querySelector('.theme-toggle');

    // Theme handling
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Set initial theme based on saved preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const initialTheme = savedTheme || (prefersDarkScheme.matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', initialTheme);
    themeToggle.textContent = initialTheme === 'dark' ? '☀️' : '🌙';

    // Theme toggle functionality
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        localStorage.setItem('theme', newTheme);
    });

    // Navigation functionality
    function updateActiveSection(sectionId) {
        // Update sections
        sections.forEach(section => {
            section.classList.remove('active');
            if (section.id === sectionId) {
                section.classList.add('active');
            }
        });
        
        // Update navigation links
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
    }

    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('href').substring(1);
            window.location.hash = sectionId;
            updateActiveSection(sectionId);
        });
    });

    // Handle hash changes
    window.addEventListener('hashchange', () => {
        const sectionId = window.location.hash.substring(1) || 'home';
        updateActiveSection(sectionId);
    });

    // Form validation
    const contactForm = document.getElementById('contactForm');
    const formInputs = contactForm.querySelectorAll('input, textarea');
    const errorMessages = {
        name: 'Please enter your name',
        email: 'Please enter a valid email address',
        message: 'Please enter your message'
    };

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Show error message
    function showError(inputId, message) {
        const errorElement = document.getElementById(`${inputId}Error`);
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    // Hide error message
    function hideError(inputId) {
        const errorElement = document.getElementById(`${inputId}Error`);
        errorElement.style.display = 'none';
    }

    // Validate form inputs
    formInputs.forEach(input => {
        input.addEventListener('input', () => {
            const inputId = input.id;
            
            if (input.value.trim() === '') {
                showError(inputId, errorMessages[inputId]);
            } else if (inputId === 'email' && !emailRegex.test(input.value)) {
                showError(inputId, errorMessages[inputId]);
            } else {
                hideError(inputId);
            }
        });
    });

    // Handle form submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        const formData = new FormData(contactForm);
        
        // Validate all fields
        formInputs.forEach(input => {
            const inputId = input.id;
            
            if (input.value.trim() === '') {
                showError(inputId, errorMessages[inputId]);
                isValid = false;
            } else if (inputId === 'email' && !emailRegex.test(input.value)) {
                showError(inputId, errorMessages[inputId]);
                isValid = false;
            } else {
                hideError(inputId);
            }
        });
        
        if (isValid) {
            // Here you would typically send the form data to a server
            console.log('Form submitted:', Object.fromEntries(formData));
            contactForm.reset();
            alert('Thank you for your message! We will get back to you soon.');
        }
    });

    // Initialize active section based on URL hash
    const initialSection = window.location.hash.substring(1) || 'home';
    updateActiveSection(initialSection);
});
