// Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Preloader
    const preloader = document.querySelector('#preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.remove();
        });
    }

    // Navbar scroll behavior
    const selectHeader = document.querySelector('.navbar');
    if (selectHeader) {
        const headerScrolled = () => {
            if (window.scrollY > 100) {
                selectHeader.classList.add('navbar-scrolled', 'shadow-sm');
            } else {
                selectHeader.classList.remove('navbar-scrolled', 'shadow-sm');
            }
        };
        window.addEventListener('load', headerScrolled);
        document.addEventListener('scroll', headerScrolled);
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = selectHeader.offsetHeight;
                const scrollTop = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: scrollTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                }
            }
        });
    });

    // Portfolio isotope and filter
    const portfolioContainer = document.querySelector('.portfolio-container');
    if (portfolioContainer) {
        // Initialize portfolio items
        const initPortfolio = () => {
            // Portfolio filter
            const portfolioFilters = document.querySelectorAll('.portfolio-filters button');
            
            portfolioFilters.forEach(filter => {
                filter.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Remove active class from all filters
                    portfolioFilters.forEach(btn => {
                        btn.classList.remove('active');
                    });
                    
                    // Add active class to clicked filter
                    this.classList.add('active');
                    
                    // Get filter value
                    const filterValue = this.getAttribute('data-filter');
                    
                    // Filter portfolio items
                    const portfolioItems = document.querySelectorAll('.portfolio-item');
                    
                    portfolioItems.forEach(item => {
                        if (filterValue === '*') {
                            item.style.display = 'block';
                        } else if (item.classList.contains(filterValue.substring(1))) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    });
                });
            });
        };
        
        window.addEventListener('load', initPortfolio);
    }

    // Portfolio lightbox
    const portfolioLightbox = document.querySelectorAll('.portfolio-lightbox');
    if (portfolioLightbox.length) {
        portfolioLightbox.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                
                const imgSrc = this.getAttribute('href');
                const title = this.getAttribute('title');
                
                // Create lightbox elements
                const lightbox = document.createElement('div');
                lightbox.className = 'lightbox-overlay';
                
                const lightboxContent = document.createElement('div');
                lightboxContent.className = 'lightbox-content';
                
                const lightboxImg = document.createElement('img');
                lightboxImg.src = imgSrc;
                lightboxImg.alt = title;
                
                const lightboxClose = document.createElement('span');
                lightboxClose.className = 'lightbox-close';
                lightboxClose.innerHTML = '&times;';
                
                const lightboxTitle = document.createElement('div');
                lightboxTitle.className = 'lightbox-title';
                lightboxTitle.textContent = title;
                
                // Append elements
                lightboxContent.appendChild(lightboxImg);
                lightboxContent.appendChild(lightboxClose);
                lightboxContent.appendChild(lightboxTitle);
                lightbox.appendChild(lightboxContent);
                document.body.appendChild(lightbox);
                
                // Show lightbox
                setTimeout(() => {
                    lightbox.style.opacity = '1';
                }, 10);
                
                // Close lightbox on click
                lightboxClose.addEventListener('click', () => {
                    lightbox.style.opacity = '0';
                    setTimeout(() => {
                        document.body.removeChild(lightbox);
                    }, 300);
                });
                
                // Close lightbox on outside click
                lightbox.addEventListener('click', (e) => {
                    if (e.target === lightbox) {
                        lightbox.style.opacity = '0';
                        setTimeout(() => {
                            document.body.removeChild(lightbox);
                        }, 300);
                    }
                });
            });
        });
    }

    // Contact form validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validate form
            let isValid = true;
            
            if (name === '') {
                isValid = false;
                showError('name', 'Please enter your name');
            } else {
                removeError('name');
            }
            
            if (email === '') {
                isValid = false;
                showError('email', 'Please enter your email');
            } else if (!isValidEmail(email)) {
                isValid = false;
                showError('email', 'Please enter a valid email');
            } else {
                removeError('email');
            }
            
            if (subject === '') {
                isValid = false;
                showError('subject', 'Please enter a subject');
            } else {
                removeError('subject');
            }
            
            if (message === '') {
                isValid = false;
                showError('message', 'Please enter your message');
            } else {
                removeError('message');
            }
            
            // If form is valid, submit it
            if (isValid) {
                // In a real application, you would send the form data to a server
                // For this example, we'll just show a success message
                showSuccessMessage();
                contactForm.reset();
            }
        });
        
        // Helper functions
        function showError(inputId, message) {
            const input = document.getElementById(inputId);
            const errorDiv = document.createElement('div');
            errorDiv.className = 'invalid-feedback';
            errorDiv.textContent = message;
            
            input.classList.add('is-invalid');
            
            // Remove existing error message if any
            const existingError = input.nextElementSibling;
            if (existingError && existingError.className === 'invalid-feedback') {
                existingError.remove();
            }
            
            input.parentNode.insertBefore(errorDiv, input.nextElementSibling);
        }
        
        function removeError(inputId) {
            const input = document.getElementById(inputId);
            input.classList.remove('is-invalid');
            
            const existingError = input.nextElementSibling;
            if (existingError && existingError.className === 'invalid-feedback') {
                existingError.remove();
            }
        }
        
        function isValidEmail(email) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
        
        function showSuccessMessage() {
            // Create alert element
            const alertDiv = document.createElement('div');
            alertDiv.className = 'alert alert-success alert-dismissible fade show mt-3';
            alertDiv.role = 'alert';
            alertDiv.innerHTML = `
                <strong>Success!</strong> Your message has been sent. We'll get back to you soon.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            `;
            
            // Insert alert before form
            contactForm.parentNode.insertBefore(alertDiv, contactForm);
            
            // Remove alert after 5 seconds
            setTimeout(() => {
                alertDiv.remove();
            }, 5000);
        }
    }

    // Add AOS animation
    window.addEventListener('load', () => {
        // Add scroll reveal animations
        const scrollElements = document.querySelectorAll('.scrollreveal');
        
        const elementInView = (el, dividend = 1) => {
            const elementTop = el.getBoundingClientRect().top;
            return (
                elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
            );
        };
        
        const elementOutofView = (el) => {
            const elementTop = el.getBoundingClientRect().top;
            return (
                elementTop > (window.innerHeight || document.documentElement.clientHeight)
            );
        };
        
        const displayScrollElement = (element) => {
            element.classList.add('scrolled');
        };
        
        const hideScrollElement = (element) => {
            element.classList.remove('scrolled');
        };
        
        const handleScrollAnimation = () => {
            scrollElements.forEach((el) => {
                if (elementInView(el, 1.25)) {
                    displayScrollElement(el);
                } else if (elementOutofView(el)) {
                    hideScrollElement(el);
                }
            });
        };
        
        window.addEventListener('scroll', () => {
            handleScrollAnimation();
        });
        
        // Initialize on page load
        handleScrollAnimation();
    });
});