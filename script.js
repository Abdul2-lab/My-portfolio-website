// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== DARK MODE TOGGLE FUNCTIONALITY =====
    const themeToggle = document.getElementById('themeToggle');
    const themeText = document.getElementById('themeText');
    const body = document.body;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        if (themeText) themeText.textContent = 'Light Mode';
    }

    // Toggle theme on button click
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            
            // Update button text
            if (body.classList.contains('dark-mode')) {
                if (themeText) themeText.textContent = 'Light Mode';
                localStorage.setItem('theme', 'dark');
            } else {
                if (themeText) themeText.textContent = 'Dark Mode';
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // ===== SMOOTH SCROLLING FOR NAVIGATION LINKS =====
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===== MOBILE MENU TOGGLE (Optional) =====
    // You can add this if you want a mobile hamburger menu
    // For now, it's just a placeholder for future enhancements

    // ===== ACTIVE LINK HIGHLIGHTING =====
    function highlightActiveLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
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

    // Add active link style
    window.addEventListener('scroll', highlightActiveLink);

    // ===== FORM SUBMISSION HANDLER (if you add a form later) =====
    // This is a placeholder for future contact form functionality
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add your form submission logic here
            alert('Form submitted! (Demo)');
        });
    }

    // ===== LAZY LOADING FOR IMAGES =====
    const images = document.querySelectorAll('img');
    const imageOptions = {
        threshold: 0,
        rootMargin: '0px 0px 50px 0px'
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src; // Use data-src if available
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    }, imageOptions);

    images.forEach(img => imageObserver.observe(img));

    // ===== SCROLL TO TOP BUTTON (Optional) =====
    // Create scroll to top button
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: #2563eb;
        color: white;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        box-shadow: 0 4px 10px rgba(37, 99, 235, 0.3);
        z-index: 1000;
        transition: all 0.3s ease;
    `;

    document.body.appendChild(scrollBtn);

    // Show/hide scroll button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.display = 'flex';
        } else {
            scrollBtn.style.display = 'none';
        }
    });

    // Scroll to top on click
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ===== ADD ACTIVE LINK STYLE =====
    const style = document.createElement('style');
    style.textContent = `
        .nav-links a.active {
            color: #2563eb;
            font-weight: 600;
        }
        .nav-links a.active i {
            color: #2563eb;
        }
        .scroll-top:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 15px rgba(37, 99, 235, 0.4);
        }
    `;
    document.head.appendChild(style);

    console.log('Portfolio website loaded successfully!');
});