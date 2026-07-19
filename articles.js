// ============================================
// ARTICLES PAGE - Invest-With-Me
// Share Market Articles & NEPSE Updates
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initializeArticlesPage();
});

function initializeArticlesPage() {
    initNavigation();
    initSearch();
    initArticleInteractions();
    initBackToTop();
    initScrollAnimations();
    initArticleFiltering();
    initViewToggle();
    initNewsletterForm();
    initBookmarks();
    updateNEPSEWidget();
    
    console.log('📊 Invest-With-Me Articles Page Initialized');
}

// 1. Navigation
function initNavigation() {
    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.pageYOffset >= sectionTop) {
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
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
}

// 2. Search Functionality
function toggleSearch() {
    const overlay = document.getElementById('searchOverlay');
    overlay.classList.toggle('active');
    
    if (overlay.classList.contains('active')) {
        document.getElementById('searchInput').focus();
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
        document.getElementById('searchResults').style.display = 'none';
    }
}

// Live Search
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    if (searchInput) {
        searchInput.addEventListener('input', debounce(function(e) {
            const query = e.target.value.toLowerCase();
            
            if (query.length < 2) {
                searchResults.style.display = 'none';
                return;
            }
            
            // Simulate search results
            const articles = [
                { title: 'NEPSE Index Surges 45 Points', category: 'NEPSE Updates', date: 'Jan 15, 2024' },
                { title: 'Candlestick Patterns Every NEPSE Trader Must Know', category: 'Technical Analysis', date: 'Jan 14, 2024' },
                { title: 'Upcoming IPOs in Nepal 2024', category: 'IPO & Auctions', date: 'Jan 13, 2024' },
                { title: 'Fundamental Analysis Guide for NEPSE', category: 'Fundamental Analysis', date: 'Jan 12, 2024' },
                { title: 'Top 10 Investment Strategies', category: 'Investment Strategies', date: 'Jan 11, 2024' },
                { title: 'Weekly Market Wrap: NEPSE Performance', category: 'NEPSE Updates', date: 'Jan 10, 2024' }
            ];
            
            const filtered = articles.filter(article => 
                article.title.toLowerCase().includes(query) || 
                article.category.toLowerCase().includes(query)
            );
            
            if (filtered.length > 0) {
                searchResults.innerHTML = filtered.map(article => `
                    <div class="search-result-item" onclick="navigateToArticle('${article.title}')">
                        <span class="search-result-category">${article.category}</span>
                        <h4>${article.title}</h4>
                        <span class="search-result-date">${article.date}</span>
                    </div>
                `).join('');
                searchResults.style.display = 'block';
            } else {
                searchResults.innerHTML = '<p style="text-align:center;color:#b0b0b0;">No articles found</p>';
                searchResults.style.display = 'block';
            }
        }, 300));
    }
});

function navigateToArticle(title) {
    console.log('Navigating to:', title);
    toggleSearch();
    // Scroll to articles section
    document.getElementById('articles').scrollIntoView({ behavior: 'smooth' });
}

// 3. Article Interactions
function initArticleInteractions() {
    // Article card hover effects
    const articleCards = document.querySelectorAll('.article-card');
    
    articleCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
}

// 4. Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 5. Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.article-card, .category-card, .trending-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
}

// 6. Article Filtering
function filterArticles(category) {
    const articles = document.querySelectorAll('.article-card');
    const categoryCards = document.querySelectorAll('.category-card');
    
    // Update active category
    categoryCards.forEach(card => card.classList.remove('active'));
    event.target.closest('.category-card').classList.add('active');
    
    // Filter articles
    articles.forEach(article => {
        if (category === 'all' || article.dataset.category === category) {
            article.style.display = '';
            setTimeout(() => {
                article.style.opacity = '1';
                article.style.transform = 'translateY(0)';
            }, 100);
        } else {
            article.style.opacity = '0';
            article.style.transform = 'translateY(20px)';
            setTimeout(() => {
                article.style.display = 'none';
            }, 300);
        }
    });
    
    // Scroll to articles section
    document.getElementById('articles').scrollIntoView({ behavior: 'smooth' });
}

// 7. Sort Articles
function sortArticles(sortBy) {
    const grid = document.getElementById('articlesGrid');
    const articles = Array.from(grid.querySelectorAll('.article-card'));
    
    articles.sort((a, b) => {
        switch(sortBy) {
            case 'oldest':
                return new Date(a.dataset.date) - new Date(b.dataset.date);
            case 'popular':
                const viewsA = parseInt(a.querySelector('.article-stats span:first-child').textContent.replace(/[^0-9.]/g, ''));
                const viewsB = parseInt(b.querySelector('.article-stats span:first-child').textContent.replace(/[^0-9.]/g, ''));
                return viewsB - viewsA;
            case 'trending':
                const heartsA = parseInt(a.querySelector('.fa-heart').parentElement.textContent.replace(/[^0-9]/g, ''));
                const heartsB = parseInt(b.querySelector('.fa-heart').parentElement.textContent.replace(/[^0-9]/g, ''));
                return heartsB - heartsA;
            default: // latest
                return new Date(b.dataset.date) - new Date(a.dataset.date);
        }
    });
    
    // Re-render sorted articles
    grid.innerHTML = '';
    articles.forEach(article => grid.appendChild(article));
}

// 8. View Toggle (Grid/List)
function changeView(view) {
    const grid = document.getElementById('articlesGrid');
    const buttons = document.querySelectorAll('.view-btn');
    
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.closest('.view-btn').classList.add('active');
    
    if (view === 'list') {
        grid.classList.add('list-view');
    } else {
        grid.classList.remove('list-view');
    }
}

// 9. Load More Articles
let articlesLoaded = 6;
const totalArticles = 12;

function loadMoreArticles() {
    if (articlesLoaded >= totalArticles) {
        showToast('No more articles to load');
        return;
    }
    
    const btn = document.querySelector('.load-more-btn');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    btn.disabled = true;
    
    // Simulate loading
    setTimeout(() => {
        const grid = document.getElementById('articlesGrid');
        
        // Additional article templates
        const newArticles = [
            {
                category: 'nepse',
                date: '2024-01-09',
                title: 'Banking Sector Analysis: Top Picks for 2024',
                excerpt: 'Comprehensive analysis of Nepal\'s banking sector stocks with expert recommendations...'
            },
            {
                category: 'technical',
                date: '2024-01-08',
                title: 'RSI and MACD Indicators: Complete Trading Guide',
                excerpt: 'Learn how to use RSI and MACD indicators effectively for NEPSE stock trading...'
            },
            {
                category: 'strategy',
                date: '2024-01-07',
                title: 'Dividend Investing in Nepal: Complete Strategy Guide',
                excerpt: 'How to build a dividend portfolio with NEPSE listed companies for passive income...'
            }
        ];
        
        newArticles.forEach((article, index) => {
            if (articlesLoaded < totalArticles) {
                const card = createArticleCard(article);
                grid.appendChild(card);
                articlesLoaded++;
            }
        });
        
        btn.innerHTML = '<i class="fas fa-spinner"></i> Load More Articles';
        btn.disabled = false;
        
        if (articlesLoaded >= totalArticles) {
            btn.style.display = 'none';
        }
        
        showToast('Articles loaded successfully!');
    }, 1500);
}

function createArticleCard(article) {
    const card = document.createElement('article');
    card.className = 'article-card';
    card.dataset.category = article.category;
    card.dataset.date = article.date;
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    card.innerHTML = `
        <div class="article-image">
            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400" alt="${article.title}">
            <span class="article-category">${article.category === 'nepse' ? 'NEPSE Updates' : article.category === 'technical' ? 'Technical Analysis' : 'Investment Strategies'}</span>
            <button class="bookmark-btn" onclick="toggleBookmark(this)">
                <i class="far fa-bookmark"></i>
            </button>
        </div>
        <div class="article-content">
            <div class="article-meta">
                <span class="article-date"><i class="far fa-calendar"></i> ${new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                <span class="article-read-time"><i class="far fa-clock"></i> ${Math.floor(Math.random() * 10 + 5)} min read</span>
            </div>
            <h3 class="article-title"><a href="#">${article.title}</a></h3>
            <p class="article-excerpt">${article.excerpt}</p>
            <div class="article-footer">
                <div class="article-author">
                    <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50" alt="Author">
                    <div>
                        <span class="author-name">Rajesh Hamal</span>
                        <span class="author-role">Senior Analyst</span>
                    </div>
                </div>
                <div class="article-stats">
                    <span><i class="far fa-eye"></i> ${(Math.random() * 5 + 1).toFixed(1)}K</span>
                    <span><i class="far fa-comment"></i> ${Math.floor(Math.random() * 50 + 10)}</span>
                    <span><i class="far fa-heart"></i> ${Math.floor(Math.random() * 200 + 50)}</span>
                </div>
            </div>
        </div>
    `;
    
    setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 100);
    
    return card;
}

// 10. Bookmark Functionality
function initBookmarks() {
    // Load saved bookmarks
    const savedBookmarks = JSON.parse(localStorage.getItem('articleBookmarks') || '[]');
    
    savedBookmarks.forEach(title => {
        const articles = document.querySelectorAll('.article-title a');
        articles.forEach(article => {
            if (article.textContent.trim() === title) {
                const bookmarkBtn = article.closest('.article-card').querySelector('.bookmark-btn');
                if (bookmarkBtn) {
                    bookmarkBtn.classList.add('bookmarked');
                    bookmarkBtn.querySelector('i').classList.replace('far', 'fas');
                }
            }
        });
    });
}

function toggleBookmark(btn) {
    btn.classList.toggle('bookmarked');
    const icon = btn.querySelector('i');
    
    if (btn.classList.contains('bookmarked')) {
        icon.classList.replace('far', 'fas');
        showToast('Article bookmarked!');
        
        // Save to localStorage
        const title = btn.closest('.article-card').querySelector('.article-title a').textContent.trim();
        const bookmarks = JSON.parse(localStorage.getItem('articleBookmarks') || '[]');
        if (!bookmarks.includes(title)) {
            bookmarks.push(title);
            localStorage.setItem('articleBookmarks', JSON.stringify(bookmarks));
        }
    } else {
        icon.classList.replace('fas', 'far');
        showToast('Bookmark removed');
        
        // Remove from localStorage
        const title = btn.closest('.article-card').querySelector('.article-title a').textContent.trim();
        const bookmarks = JSON.parse(localStorage.getItem('articleBookmarks') || '[]');
        const index = bookmarks.indexOf(title);
        if (index > -1) {
            bookmarks.splice(index, 1);
            localStorage.setItem('articleBookmarks', JSON.stringify(bookmarks));
        }
    }
}

// 11. Newsletter Form
function initNewsletterForm() {
    const form = document.querySelector('.newsletter-form');
    if (form) {
        form.addEventListener('submit', handleNewsletterSubmit);
    }
}

function handleNewsletterSubmit(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    const btn = event.target.querySelector('button');
    
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
    btn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
        btn.style.background = '#4caf50';
        showToast('Successfully subscribed to newsletter!');
        
        // Reset form
        event.target.reset();
        
        setTimeout(() => {
            btn.innerHTML = 'Subscribe Now';
            btn.style.background = '#fff';
            btn.disabled = false;
        }, 3000);
    }, 1500);
}

function openNewsletter() {
    document.getElementById('newsletter').scrollIntoView({ behavior: 'smooth' });
}

// 12. NEPSE Widget Update
function updateNEPSEWidget() {
    // Simulate live NEPSE data updates
    setInterval(() => {
        const indexValue = document.querySelector('.index-value');
        const indexChange = document.querySelector('.index-change');
        const turnover = document.querySelectorAll('.detail-value')[0];
        const volume = document.querySelectorAll('.detail-value')[1];
        
        if (indexValue && indexChange) {
            const change = (Math.random() * 10 - 5).toFixed(2);
            const currentValue = parseFloat(indexValue.textContent.replace(/,/g, ''));
            const newValue = (currentValue + parseFloat(change)).toFixed(2);
            
            indexValue.textContent = parseFloat(newValue).toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
            
            indexChange.textContent = `${change > 0 ? '+' : ''}${change} (${((change / currentValue) * 100).toFixed(2)}%)`;
            indexChange.className = `index-change ${change >= 0 ? 'positive' : 'negative'}`;
            
            if (turnover) {
                turnover.textContent = `Rs. ${(Math.random() * 5 + 2).toFixed(1)} Arba`;
            }
            if (volume) {
                volume.textContent = Math.floor(Math.random() * 2000000 + 500000).toLocaleString();
            }
        }
    }, 5000);
}

// 13. Toast Notifications
function showToast(message) {
    const existingToast = document.querySelector('.custom-toast');
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    toast.className = 'custom-toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 2rem;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.9);
        color: #fff;
        padding: 1rem 2rem;
        border-radius: 50px;
        z-index: 10001;
        animation: slideUp 0.3s ease-out;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        border: 1px solid rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideDown 0.3s ease-out';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// 14. Theme Toggle
function toggleTheme() {
    document.body.classList.toggle('light-theme');
    const icon = document.querySelector('.theme-toggle i');
    
    if (document.body.classList.contains('light-theme')) {
        icon.classList.replace('fa-moon', 'fa-sun');
        showToast('Light theme activated');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
        showToast('Dark theme activated');
    }
}

// 15. Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function scrollToArticles() {
    document.getElementById('articles').scrollIntoView({ behavior: 'smooth' });
}

// Keyboard Shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K for search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        toggleSearch();
    }
    
    // Escape to close search
    if (e.key === 'Escape') {
        const searchOverlay = document.getElementById('searchOverlay');
        if (searchOverlay.classList.contains('active')) {
            toggleSearch();
        }
    }
    
    // 'T' for back to top
    if (e.key === 't' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        scrollToTop();
    }
});

// Add toast animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideUp {
        from { transform: translate(-50%, 20px); opacity: 0; }
        to { transform: translate(-50%, 0); opacity: 1; }
    }
    
    @keyframes slideDown {
        from { transform: translate(-50%, 0); opacity: 1; }
        to { transform: translate(-50%, 20px); opacity: 0; }
    }
    
    .search-result-item {
        padding: 1rem;
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.3s;
        margin-bottom: 0.5rem;
    }
    
    .search-result-item:hover {
        background: rgba(255, 255, 255, 0.1);
    }
    
    .search-result-category {
        font-size: 0.8rem;
        color: #667eea;
        text-transform: uppercase;
    }
    
    .search-result-item h4 {
        color: #fff;
        margin: 0.3rem 0;
    }
    
    .search-result-date {
        font-size: 0.85rem;
        color: #b0b0b0;
    }
    
    .light-theme {
        --dark: #f5f5f5;
        --text-primary: #212121;
        --text-secondary: #666;
        --card-bg: rgba(0, 0, 0, 0.03);
        --card-border: rgba(0, 0, 0, 0.1);
    }
    
    .light-theme .navbar {
        background: rgba(255, 255, 255, 0.95);
    }
    
    .light-theme .article-title a,
    .light-theme .section-title,
    .light-theme .nav-link {
        color: #212121;
    }
`;
document.head.appendChild(style);

console.log('✅ All features initialized successfully!');
