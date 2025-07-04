document.addEventListener('DOMContentLoaded', function() {
    /* ==================== Dark/Light Theme Toggle ==================== */
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    if (savedTheme === 'dark') body.classList.add('dark');
    
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark');
        const theme = body.classList.contains('dark') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
    });

    /* ==================== Header Scroll Effect ==================== */
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* ==================== Navigation Links Active State ==================== */
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 300) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    /* ==================== Resume Tabs ==================== */
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Show corresponding content
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    /* ==================== Portfolio Filter ==================== */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    /* ==================== Portfolio Modal ==================== */
    const viewBtns = document.querySelectorAll('.view-btn');
    const portfolioModal = document.querySelector('.portfolio-modal');
    const closeModal = document.querySelector('.close-modal');
    const modalOverlay = document.querySelector('.modal-overlay');
    
    // Portfolio items data (normally this would come from a database/API)
    const portfolioData = {
        1: {
            title: "FromHeart Tea Order App",
            description: "A mobile application built using Flutter that allows users to easily browse and order their favorite teas. FromHeart provides a seamless user experience with various features like account management, order tracking, and tea promotions. Perfect for tea enthusiasts looking for a convenient way to enjoy their favorite drinks!",
            tags: ["Flutter", "PHP"],
            image: "img/FromHeart.png",
            link: "https://github.com/mawarkarmen/fromheart-tea-ordering-app"
        },
        2: {
            title: "Accounting Information System",
            description: "Designed a user-friendly mobile banking application interface with a focus on accessibility and ease of use. The design includes innovative features like biometric authentication, budgeting tools, and transaction categorization.",
            tags: ["HTML", "CSS", "JavaScript"],
            image: "img/AIS.png",
            link: "https://github.com/mawarkarmen/production-accounting-system"
        },
        3: {
            title: "Brand Identity Package",
            description: "Created a comprehensive brand identity package for a tech startup, including logo design, color palette, typography system, and brand guidelines. The identity reflects the innovative and modern approach of the company.",
            tags: ["Graphic Design", "Branding", "Illustration"],
            image: "https://placehold.co/800x500",
            link: "#"
        },
        // Add more items as needed
    };
    
    viewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            const project = portfolioData[id];
            
            if (project) {
                document.querySelector('.modal-content').innerHTML = `
                    <img src="${project.image}" alt="${project.title}" class="modal-img">
                    <h2>${project.title}</h2>
                    <p>${project.description}</p>
                    <div class="modal-tags">
                        ${project.tags.map(tag => `<span class="modal-tag">${tag}</span>`).join('')}
                    </div>
                    <div class="modal-links">
                        <a href="${project.link}" target="_blank" class="modal-link">
                            <i class="ri-external-link-line"></i> View Project
                        </a>
                    </div>
                `;
                
                portfolioModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close modal
    closeModal.addEventListener('click', closePortfolioModal);
    modalOverlay.addEventListener('click', closePortfolioModal);
    
    function closePortfolioModal() {
        portfolioModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Close modal with Esc key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && portfolioModal.classList.contains('active')) {
            closePortfolioModal();
        }
    });

    /* ==================== Smooth Scrolling ==================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                // You would add this if you had a mobile menu
            }
        });
    });

    /* ==================== Animation on Scroll ==================== */
    // You would typically use a library like AOS or implement your own
    // simple animation logic here if desired
});

// Check if a section is in viewport for animations (helper function)
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.75
    );
}

// Get in Touch
document.querySelector('.contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(this);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };

    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", data)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            alert('Message sent successfully!');
        }, function(error) {
            console.log('FAILED...', error);
            alert('Failed to send message. Please try again later.');
        });
});
