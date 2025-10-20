// Keeneyes Landing Page JavaScript

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {

    // Initialize all functionality
    initSmoothScrolling();
    initIntelligenceDemo();
    initIntersectionObserver();
    initNavbarScroll();
    initConnectionLines();
    initScenarioTabs();
    addUtilityEffects();
    initMagnetButton();

});

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Get navbar height to offset scroll position
                const navbar = document.querySelector('nav');
                const navbarHeight = navbar ? navbar.offsetHeight : 0;

                // Calculate target position accounting for navbar
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                // For #how section, scroll to the heading specifically
                if (this.getAttribute('href') === '#how') {
                    const heading = target.querySelector('h2');
                    if (heading) {
                        const headingPosition = heading.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                        window.scrollTo({
                            top: headingPosition,
                            behavior: 'smooth'
                        });
                        return;
                    }
                }

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Intelligence Demo
function initIntelligenceDemo() {
    // Add entrance animation to intelligence demo
    const intelligenceDemo = document.querySelector('.intelligence-demo');
    if (intelligenceDemo) {
        // Add entrance animation
        setTimeout(() => {
            intelligenceDemo.style.opacity = '1';
            intelligenceDemo.style.transform = 'translateY(0)';
        }, 300);
    }
}

// Intersection Observer for animations
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);

    // Observe demo cards
    document.querySelectorAll('.demo-card').forEach(card => {
        observer.observe(card);
    });
}

// Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.querySelector('nav');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 100) {
            navbar.classList.add('scrolled');
            if (currentScrollY > lastScrollY) {
                // Scrolling down
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                navbar.style.transform = 'translateY(0)';
            }
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.transform = 'translateY(0)';
        }

        lastScrollY = currentScrollY;
    });
}

// Dynamic connection lines
function initConnectionLines() {
    const connectionContainer = document.querySelector('.connection-lines svg');
    if (!connectionContainer) return;

    const lines = [];
    const maxLines = 3;

    function createConnectionLine() {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;
        const endX = Math.random() * window.innerWidth;
        const endY = Math.random() * window.innerHeight;

        line.setAttribute('x1', startX);
        line.setAttribute('y1', startY);
        line.setAttribute('x2', startX); // Start with same point
        line.setAttribute('y2', startY);
        line.setAttribute('stroke', 'url(#connectionGradient)');
        line.setAttribute('stroke-width', '1');
        line.setAttribute('opacity', '0');

        connectionContainer.appendChild(line);

        // Animate the line
        const duration = 2000 + Math.random() * 3000;
        const startTime = Date.now();

        function animateLine() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            if (progress < 0.1) {
                // Fade in
                line.setAttribute('opacity', progress * 10);
            } else if (progress > 0.9) {
                // Fade out
                line.setAttribute('opacity', (1 - progress) * 10);
            } else {
                line.setAttribute('opacity', '0.3');
            }

            // Animate line growth
            const currentEndX = startX + (endX - startX) * progress;
            const currentEndY = startY + (endY - startY) * progress;
            line.setAttribute('x2', currentEndX);
            line.setAttribute('y2', currentEndY);

            if (progress < 1) {
                requestAnimationFrame(animateLine);
            } else {
                connectionContainer.removeChild(line);
                lines.splice(lines.indexOf(line), 1);
            }
        }

        lines.push(line);
        animateLine();
    }

    // Create new lines periodically
    setInterval(() => {
        if (lines.length < maxLines && Math.random() > 0.7) {
            createConnectionLine();
        }
    }, 2000);
}

// Interactive Scenario Tabs
function initScenarioTabs() {
    const tabs = document.querySelectorAll('.scenario-tab');
    const panels = document.querySelectorAll('.scenario-panel');

    if (tabs.length === 0 || panels.length === 0) return;

    // Ensure proper initial state
    panels.forEach((panel, index) => {
        if (index === 0) {
            panel.classList.add('active');
            panel.style.opacity = '1';
            panel.style.transform = 'translateY(0)';
            panel.style.display = 'block';
        } else {
            panel.classList.remove('active');
            panel.style.opacity = '0';
            panel.style.transform = 'translateY(20px)';
            panel.style.display = 'none';
        }
    });

    // Initialize first interface mockup
    setTimeout(() => {
        const firstPanel = panels[0];
        if (firstPanel) {
            animateInterfaceMockup(firstPanel);
        }
    }, 500);

    // Tab switching functionality
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetScenario = this.dataset.scenario;

            // Update tab states
            tabs.forEach(t => {
                t.classList.remove('active');
                t.classList.remove('bg-paper-50', 'text-ocean-600', 'shadow-soft');
                t.classList.add('text-ink-400', 'hover:text-ink-600');
                t.setAttribute('aria-selected', 'false');
                t.setAttribute('tabindex', '-1');
            });
            this.classList.add('active');
            this.classList.remove('text-ink-400', 'hover:text-ink-600');
            this.classList.add('bg-paper-50', 'text-ocean-600', 'shadow-soft');
            this.setAttribute('aria-selected', 'true');
            this.setAttribute('tabindex', '0');

            // Update panel states with smooth transition
            panels.forEach(panel => {
                if (panel.id === `${targetScenario}-scenario`) {
                    // Hide all panels first
                    panels.forEach(p => {
                        p.classList.remove('active');
                        p.style.display = 'none';
                    });

                    // Show and animate target panel
                    panel.style.display = 'block';
                    panel.style.opacity = '0';
                    panel.style.transform = 'translateY(20px)';

                    setTimeout(() => {
                        panel.classList.add('active');
                        panel.style.opacity = '1';
                        panel.style.transform = 'translateY(0)';

                        // Trigger interface animations
                        animateInterfaceMockup(panel);
                    }, 50);
                }
            });

            // Add visual feedback to tab
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);

            // Trigger connection animation
            triggerScenarioConnections();
        });
    });

    // Auto-cycle through scenarios (subtle demo)
    let currentScenarioIndex = 0;
    setInterval(() => {
        // Only auto-cycle if user hasn't interacted recently
        if (!document.querySelector('.scenario-tabs').dataset.userInteracted) {
            currentScenarioIndex = (currentScenarioIndex + 1) % tabs.length;
            tabs[currentScenarioIndex].click();
        }
    }, 8000);

    // Mark user interaction
    document.querySelector('.scenario-tabs').addEventListener('click', () => {
        document.querySelector('.scenario-tabs').dataset.userInteracted = 'true';
    });

    // Keyboard navigation for scenario tabs
    tabs.forEach((tab, index) => {
        tab.addEventListener('keydown', (e) => {
            let targetIndex = index;

            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    targetIndex = index > 0 ? index - 1 : tabs.length - 1;
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    targetIndex = index < tabs.length - 1 ? index + 1 : 0;
                    break;
                case 'Home':
                    e.preventDefault();
                    targetIndex = 0;
                    break;
                case 'End':
                    e.preventDefault();
                    targetIndex = tabs.length - 1;
                    break;
                default:
                    return;
            }

            tabs[targetIndex].focus();
            tabs[targetIndex].click();
        });
    });
}

// Enhanced interface mockup animations
function animateInterfaceMockup(panel) {
    const mockup = panel.querySelector('.interface-mockup');
    if (!mockup) return;

    // Animate search bar typing
    const searchBar = mockup.querySelector('.search-interface .font-mono');
    if (searchBar) {
        const originalText = searchBar.textContent;
        searchBar.textContent = '';

        let i = 0;
        const typeInterval = setInterval(() => {
            searchBar.textContent = originalText.slice(0, i + 1);
            i++;

            if (i > originalText.length) {
                clearInterval(typeInterval);

                // Animate results appearing
                setTimeout(() => {
                    animateSearchResults(mockup);
                }, 300);
            }
        }, 80);
    }
}

function animateSearchResults(mockup) {
    const results = mockup.querySelectorAll('.result-item');

    results.forEach((result, index) => {
        result.style.opacity = '0';
        result.style.transform = 'translateX(-20px)';

        setTimeout(() => {
            result.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            result.style.opacity = '1';
            result.style.transform = 'translateX(0)';

            // Add subtle glow effect
            result.style.boxShadow = '0 0 20px rgba(6, 182, 212, 0.1)';
            setTimeout(() => {
                result.style.boxShadow = 'none';
            }, 800);

        }, index * 150 + 200);
    });
}

// Enhanced connection animations for scenario switches
function triggerScenarioConnections() {
    // Create temporary connection lines across the scenario section
    const scenarioSection = document.querySelector('#scenarios') || document.querySelector('.scenario-tabs').closest('section');
    if (!scenarioSection) return;

    const connectionOverlay = document.createElement('div');
    connectionOverlay.className = 'absolute inset-0 pointer-events-none z-10';
    connectionOverlay.style.background = 'radial-gradient(circle at 30% 50%, rgba(6, 182, 212, 0.03) 0%, transparent 50%)';

    scenarioSection.style.position = 'relative';
    scenarioSection.appendChild(connectionOverlay);

    // Animate connection pulse
    connectionOverlay.style.opacity = '0';
    connectionOverlay.style.transform = 'scale(0.8)';

    setTimeout(() => {
        connectionOverlay.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        connectionOverlay.style.opacity = '1';
        connectionOverlay.style.transform = 'scale(1)';
    }, 50);

    // Remove after animation
    setTimeout(() => {
        connectionOverlay.style.opacity = '0';
        setTimeout(() => {
            if (scenarioSection.contains(connectionOverlay)) {
                scenarioSection.removeChild(connectionOverlay);
            }
        }, 800);
    }, 1000);

    // Add subtle effects to scatter dots during scenario switch
    const scatterDots = document.querySelectorAll('.scatter-dot');
    scatterDots.forEach((dot, index) => {
        setTimeout(() => {
            dot.style.transform = 'scale(1.2)';
            dot.style.opacity = '0.8';

            setTimeout(() => {
                dot.style.transform = '';
                dot.style.opacity = '';
            }, 300);
        }, index * 100);
    });
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // ⌘K or Ctrl+K to focus search demo
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const searchDemo = document.querySelector('.search-demo');
        if (searchDemo) {
            searchDemo.scrollIntoView({ behavior: 'smooth', block: 'center' });
            // Add a subtle highlight effect
            searchDemo.style.transform = 'scale(1.05)';
            setTimeout(() => {
                searchDemo.style.transform = 'scale(1)';
            }, 200);
        }
    }
});

// Button click handlers
document.addEventListener('click', function(e) {
    // Early access buttons
    if (e.target.textContent.includes('Get early access') ||
        e.target.textContent.includes('I need this') ||
        e.target.textContent.includes('I want this')) {
        e.preventDefault();

        // Simple, honest message
        const message = "I'll email you when it's ready.";

        // Create a simple notification
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-slate-800 border border-slate-600 text-slate-100 px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300';
        notification.textContent = message;
        notification.style.transform = 'translateY(-100%)';

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateY(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateY(-100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Navigation links
    if (e.target.textContent.includes('See the impact')) {
        e.preventDefault();
        document.getElementById('impact').scrollIntoView({ behavior: 'smooth' });
    }
});

// Simple utility functions for enhanced UX
function addUtilityEffects() {
    // Add subtle focus indicators for better accessibility
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-nav');
    });
}

// Magnet Button Effect
function initMagnetButton() {
    // Wait for layout to settle
    setTimeout(() => {
        const magnetContainers = document.querySelectorAll('.magnet-container');
        if (magnetContainers.length === 0) return;

        magnetContainers.forEach(container => {
            const button = container.querySelector('.magnet-button');
            if (!button) return;

            const particleCount = 6;
            const particles = [];

            // Get button dimensions and position within container
            const containerRect = container.getBoundingClientRect();
            const buttonRect = button.getBoundingClientRect();

            // Calculate button center relative to container
            const buttonCenterX = buttonRect.left - containerRect.left + buttonRect.width / 2;
            const buttonCenterY = buttonRect.top - containerRect.top + buttonRect.height / 2;

            // Create particles positioned around button but within container
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'magnet-particle';

                // Position particles in circle around button center
                const angle = (i / particleCount) * Math.PI * 2;
                const radius = Math.max(buttonRect.width, buttonRect.height) / 2 + 15 + Math.random() * 10;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                // Position relative to container, not button
                particle.style.left = `${buttonCenterX + x}px`;
                particle.style.top = `${buttonCenterY + y}px`;
                particle.style.transform = 'translate(-50%, -50%)';
                particle.style.position = 'absolute';
                particle.style.zIndex = '10'; // Above button

                particles.push({
                    element: particle,
                    originalX: buttonCenterX + x,
                    originalY: buttonCenterY + y,
                    buttonCenterX,
                    buttonCenterY
                });

                container.appendChild(particle);
            }

            // Magnetic attraction on hover
            container.addEventListener('mouseenter', () => {
                particles.forEach((particle, index) => {
                    setTimeout(() => {
                        particle.element.style.left = `${particle.buttonCenterX}px`;
                        particle.element.style.top = `${particle.buttonCenterY}px`;
                    }, index * 50);
                });
            });

            container.addEventListener('mouseleave', () => {
                particles.forEach((particle, index) => {
                    setTimeout(() => {
                        particle.element.style.left = `${particle.originalX}px`;
                        particle.element.style.top = `${particle.originalY}px`;
                    }, index * 30);
                });
            });
        });
    }, 100);
}