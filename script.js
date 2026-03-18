// ================================================
// Department of Computing & Informatics
// Interactive Features
// ================================================

// Dynamic Countdown Timer
const symposiumDate = new Date("Dec 31, 2025 23:59:59").getTime();

function updateTimer() {
    const now = new Date().getTime();
    const diff = symposiumDate - now;
    
    if (diff < 0) {
        document.getElementById("timer").innerHTML = "Event Ended";
        return;
    }
    
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById("timer").innerHTML = `⏰ Symposium: ${d}d ${h}h ${m}m ${s}s`;
}

setInterval(updateTimer, 1000);
updateTimer(); // Initial call

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const pillNav = document.querySelector('.pill-nav');

if (menuToggle && pillNav) {
    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        pillNav.classList.toggle('active');
        
        // Update icon
        const icon = menuToggle.querySelector('.material-icons');
        if (icon) {
            icon.textContent = isExpanded ? 'menu' : 'close';
        }
    });
}

// Notice Pop-up (Toast style)
function createNotice(msg) {
    const area = document.getElementById("notification-area");
    if (!area) return;
    
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'polite');
    toast.textContent = msg;
    area.appendChild(toast);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        toast.remove();
    }, 5000);
}

// Form Handling
document.addEventListener('DOMContentLoaded', () => {
    const regForm = document.getElementById('regForm');
    
    if (regForm) {
        regForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(regForm);
            const data = Object.fromEntries(formData.entries());
            
            // Get selected courses
            const courses = [];
            document.querySelectorAll('input[name="courses"]:checked').forEach(checkbox => {
                courses.push(checkbox.value);
            });
            
            // Validate
            if (!data.fullname || !data.regnumber || !data.email || !data.course) {
                createNotice('Please fill in all required fields!');
                return;
            }
            
            if (courses.length === 0) {
                createNotice('Please select at least one course unit!');
                return;
            }
            
            // Simulate form submission
            console.log('Registration submitted:', { ...data, courses });
            
            createNotice(`Thank you ${data.fullname}! Registration submitted successfully.`);
            
            // Reset form
            regForm.reset();
        });
    }
    
    // Show welcome notification on page load
    setTimeout(() => {
        createNotice('Welcome to Department of Computing & Informatics');
    }, 1500);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Add current year to footer if needed
document.addEventListener('DOMContentLoaded', () => {
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(el => {
        el.textContent = currentYear;
    });
});
