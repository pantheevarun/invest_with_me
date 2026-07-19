// ============================================
// LEGAL PAGES JS - Invest-With-Me
// About Us, Terms & Conditions, Privacy Policy
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initializeLegalPages();
});

function initializeLegalPages() {
    initSmoothScroll();
    initActiveNavLink();
    initBackToTop();
    initPrintButton();
    initExternalLinks();
    initLastUpdated();
    initAccessibility();
    
    console.log('✅ Legal pages initialized - https://barunpanthi.com.np/');
}

// 1. Smooth Scroll for Internal Links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 2. Active Navigation Link Highlighting
function initActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        if (linkPath === currentPath) {
            link.classList.add('active');
        }
    });
}

// 3. Back to Top Button
function initBackToTop() {
    // Create back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'backToTopBtn';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #ff6f00;
        color: #fff;
        border: none;
        cursor: pointer;
        font-size: 1.2rem;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        transition: all 0.3s ease;
        opacity: 0;
        visibility: hidden;
        z-index: 999;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    document.body.appendChild(backToTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 400) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top on click
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect
    backToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 8px 25px rgba(255,111,0,0.4)';
    });
    
    backToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
    });
}

// 4. Print Page Functionality
function initPrintButton() {
    // Add print buttons to legal pages
    const legalPages = document.querySelectorAll('.legal-content');
    
    legalPages.forEach(page => {
        const printBtn = document.createElement('button');
        printBtn.className = 'print-btn';
        printBtn.innerHTML = '<i class="fas fa-print"></i> Print This Page';
        printBtn.setAttribute('aria-label', 'Print page');
        printBtn.style.cssText = `
            background: #1a237e;
            color: #fff;
            border: none;
            padding: 0.8rem 1.5rem;
            border-radius: 50px;
            cursor: pointer;
            font-size: 0.9rem;
            margin-bottom: 1.5rem;
            transition: all 0.3s ease;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
        `;
        
        printBtn.addEventListener('click', function() {
            window.print();
        });
        
        printBtn.addEventListener('mouseenter', function() {
            this.style.background = '#ff6f00';
            this.style.transform = 'translateY(-2px)';
        });
        
        printBtn.addEventListener('mouseleave', function() {
            this.style.background = '#1a237e';
            this.style.transform = 'translateY(0)';
        });
        
        // Insert before first content card
        const firstCard = page.querySelector('.content-card');
        if (firstCard) {
            firstCard.parentNode.insertBefore(printBtn, firstCard);
        }
    });
}

// 5. External Links - Open in New Tab
function initExternalLinks() {
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        const linkDomain = new URL(link.href).hostname;
        const currentDomain = window.location.hostname;
        
        if (linkDomain !== currentDomain) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
            
            // Add external link icon
            if (!link.querySelector('i')) {
                const icon = document.createElement('i');
                icon.className = 'fas fa-external-link-alt';
                icon.style.cssText = `
                    font-size: 0.7rem;
                    margin-left: 0.3rem;
                    opacity: 0.6;
                `;
                link.appendChild(icon);
            }
        }
    });
}

// 6. Auto-Update Last Modified Date
function initLastUpdated() {
    const lastUpdatedElements = document.querySelectorAll('.last-updated');
    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    lastUpdatedElements.forEach(element => {
        if (!element.textContent.includes(currentDate)) {
            element.textContent = `Last Updated: ${currentDate}`;
        }
    });
    
    // Update hero section dates too
    const heroDates = document.querySelectorAll('.legal-hero p');
    heroDates.forEach(date => {
        if (date.textContent.includes('Last Updated')) {
            date.textContent = `Last Updated: ${currentDate}`;
        }
    });
}

// 7. Accessibility Enhancements
function initAccessibility() {
    // Add ARIA labels to links
    document.querySelectorAll('a').forEach(link => {
        if (!link.getAttribute('aria-label') && link.textContent.trim()) {
            link.setAttribute('aria-label', link.textContent.trim());
        }
    });
    
    // Add skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 0;
        background: #ff6f00;
        color: #fff;
        padding: 0.5rem 1rem;
        z-index: 10000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '0';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main-content id to main section
    const mainContent = document.querySelector('.about-content, .legal-content');
    if (mainContent && !mainContent.id) {
        mainContent.id = 'main-content';
    }
}

// 8. Cookie Consent Banner
function initCookieConsent() {
    // Check if user has already accepted
    if (localStorage.getItem('cookieConsent')) return;
    
    const cookieBanner = document.createElement('div');
    cookieBanner.className = 'cookie-consent-banner';
    cookieBanner.setAttribute('role', 'alert');
    cookieBanner.innerHTML = `
        <div class="cookie-content">
            <div class="cookie-text">
                <i class="fas fa-cookie-bite"></i>
                <p>We use cookies to improve your experience on our website. By continuing to browse, you agree to our use of cookies. 
                <a href="https://barunpanthi.com.np/privacy">Learn more</a></p>
            </div>
            <div class="cookie-actions">
                <button class="cookie-accept-btn">Accept All</button>
                <button class="cookie-reject-btn">Reject</button>
            </div>
        </div>
    `;
    
    // Style the banner
    cookieBanner.style.cssText = `
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: #fff;
        box-shadow: 0 -4px 20px rgba(0,0,0,0.15);
        z-index: 10000;
        padding: 1rem 2rem;
        animation: slideUp 0.5s ease-out;
    `;
    
    const cookieContent = cookieBanner.querySelector('.cookie-content');
    cookieContent.style.cssText = `
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 2rem;
        flex-wrap: wrap;
    `;
    
    const cookieText = cookieBanner.querySelector('.cookie-text');
    cookieText.style.cssText = `
        display: flex;
        align-items: center;
        gap: 1rem;
        flex: 1;
    `;
    
    cookieText.querySelector('i').style.cssText = `
        font-size: 1.5rem;
        color: #ff6f00;
    `;
    
    cookieText.querySelector('p').style.cssText = `
        margin: 0;
        font-size: 0.9rem;
        color: #666;
    `;
    
    cookieText.querySelector('a').style.cssText = `
        color: #1a237e;
        font-weight: 600;
    `;
    
    const cookieActions = cookieBanner.querySelector('.cookie-actions');
    cookieActions.style.cssText = `
        display: flex;
        gap: 1rem;
    `;
    
    const acceptBtn = cookieBanner.querySelector('.cookie-accept-btn');
    acceptBtn.style.cssText = `
        background: #ff6f00;
        color: #fff;
        border: none;
        padding: 0.7rem 1.5rem;
        border-radius: 50px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s ease;
    `;
    
    const rejectBtn = cookieBanner.querySelector('.cookie-reject-btn');
    rejectBtn.style.cssText = `
        background: transparent;
        color: #666;
        border: 2px solid #ddd;
        padding: 0.7rem 1.5rem;
        border-radius: 50px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(cookieBanner);
    
    // Handle accept
    acceptBtn.addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'accepted');
        cookieBanner.style.animation = 'slideDown 0.5s ease-in';
        setTimeout(() => cookieBanner.remove(), 500);
    });
    
    // Handle reject
    rejectBtn.addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'rejected');
        cookieBanner.style.animation = 'slideDown 0.5s ease-in';
        setTimeout(() => cookieBanner.remove(), 500);
    });
    
    // Hover effects
    acceptBtn.addEventListener('mouseenter', function() {
        this.style.background = '#e65c00';
        this.style.transform = 'translateY(-2px)';
    });
    
    acceptBtn.addEventListener('mouseleave', function() {
        this.style.background = '#ff6f00';
        this.style.transform = 'translateY(0)';
    });
    
    rejectBtn.addEventListener('mouseenter', function() {
        this.style.background = '#f5f5f5';
    });
    
    rejectBtn.addEventListener('mouseleave', function() {
        this.style.background = 'transparent';
    });
}

// 9. Table of Contents Generator
function initTableOfContents() {
    const legalContent = document.querySelector('.legal-content');
    if (!legalContent) return;
    
    const headings = legalContent.querySelectorAll('h2');
    if (headings.length < 3) return;
    
    const toc = document.createElement('div');
    toc.className = 'table-of-contents';
    toc.style.cssText = `
        background: #f8f9fa;
        border: 1px solid #e0e0e0;
        border-radius: 12px;
        padding: 1.5rem;
        margin-bottom: 2rem;
    `;
    
    let tocHTML = '<h3 style="margin-bottom: 1rem; color: #1a237e;"><i class="fas fa-list"></i> Table of Contents</h3><ol style="margin-left: 1.5rem;">';
    
    headings.forEach((heading, index) => {
        const id = `section-${index + 1}`;
        heading.id = id;
        tocHTML += `<li style="margin-bottom: 0.5rem;"><a href="#${id}" style="color: #1a237e; text-decoration: none;">${heading.textContent}</a></li>`;
    });
    
    tocHTML += '</ol>';
    toc.innerHTML = tocHTML;
    
    // Insert after first paragraph
    const firstCard = legalContent.querySelector('.content-card');
    if (firstCard) {
        firstCard.insertBefore(toc, firstCard.querySelector('p').nextSibling);
    }
    
    // Smooth scroll for TOC links
    toc.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// 10. Initialize All Features
document.addEventListener('DOMContentLoaded', function() {
    initCookieConsent();
    initTableOfContents();
});

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideUp {
        from {
            transform: translateY(100%);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideDown {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(100%);
            opacity: 0;
        }
    }
    
    .skip-link:focus {
        top: 0 !important;
    }
    
    @media print {
        .cookie-consent-banner,
        .print-btn,
        #backToTopBtn,
        .skip-link {
            display: none !important;
        }
    }
`;
document.head.appendChild(style);

console.log('✅ All features loaded for https://barunpanthi.com.np/');
