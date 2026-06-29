// Global state
let currentUser = {
    name: '',
    role: '',
    email: ''
};

// Page Navigation
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

// View Navigation
function showView(viewId) {
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
    });
    document.getElementById(viewId).classList.add('active');
    
    // Update nav active state
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-view="${viewId.replace('View', '')}"]`).classList.add('active');
    
    // Update page title
    const titles = {
        'dashboardView': 'Dashboard',
        'controlsView': 'Controls Management',
        'reviewControlsView': 'Review Controls',
        'assessmentsView': 'Assessments',
        'reportsView': 'Reports'
    };
    
    const subtitles = {
        'dashboardView': 'Overview of your control compliance',
        'controlsView': 'Create and manage controls',
        'reviewControlsView': 'Manage and review assigned controls',
        'assessmentsView': 'Review and submit assessments',
        'reportsView': 'Generate compliance reports'
    };
    
    document.getElementById('pageTitle').textContent = titles[viewId] || 'Dashboard';
    document.getElementById('pageSubtitle').textContent = subtitles[viewId] || '';
}

// Login Functions
function loginAs(role) {
    const roleConfig = {
        'assessor': {
            name: 'Sarah Johnson',
            role: 'Assessor',
            email: 'sarah.johnson@airline.com'
        },
        'certifier': {
            name: 'John Smith',
            role: 'Certifier',
            email: 'john.smith@airline.com'
        }
,
        'dept-head': {
            name: 'Michael Chen',
            role: 'Department Head',
            email: 'michael.chen@airline.com'
        },
        'auditor': {
            name: 'David Miller',
            role: 'Auditor',
            email: 'david.miller@airline.com'
        }
    };
    
    currentUser = roleConfig[role];
    document.getElementById('userName').textContent = currentUser.name;
    document.getElementById('userRole').textContent = currentUser.role;
    
    // Configure sidebar based on role
    configureSidebarForRole(role);
    
    // Update dashboard stats based on role
    updateDashboardForRole(role);
    
    showPage('dashboardPage');
}

function configureSidebarForRole(role) {
    const controlsNav = document.getElementById('controlsNav');
    const assessmentsNav = document.getElementById('assessmentsNav');
    
    // Reset all
    [controlsNav, assessmentsNav].forEach(nav => {
        if (nav) nav.style.display = 'flex';
    });
    
    // Configure based on role
    if (role === 'dept-head') {
        controlsNav.style.display = 'none';
    } else if (role === 'auditor') {
        // Auditor can see everything (read-only)
    } else if (role === 'certifier') {
        controlsNav.querySelector('span').textContent = 'Controls';
        assessmentsNav.style.display = 'none';
    }
}

function updateDashboardForRole(role) {
    // Update stats based on role
    const stats = {
        'assessor': {
            totalControls: 45,
            activeControls: 38,
            pendingAssessments: 7
        },
        'certifier': {
            totalControls: 120,
            activeControls: 105,
            pendingAssessments: 15
        }
,
        'dept-head': {
            totalControls: 65,
            activeControls: 58,
            pendingAssessments: 5
        },
        'auditor': {
            totalControls: 250,
            activeControls: 220,
            pendingAssessments: 30
        }
    };
    
    const roleStats = stats[role] || stats['assessor'];
    document.getElementById('totalControls').textContent = roleStats.totalControls;
    document.getElementById('activeControls').textContent = roleStats.activeControls;
    document.getElementById('pendingAssessments').textContent = roleStats.pendingAssessments;
}

function logout() {
    currentUser = { name: '', role: '', email: '' };
    showPage('loginPage');
    showView('dashboardView');
}

// Form Handling
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    
    // Simple role detection based on email
    if (email.includes('sarah')) {
        loginAs('assessor');
    } else if (email.includes('john')) {
        loginAs('certifier');
    } else if (email.includes('michael')) {
        loginAs('dept-head');
    } else if (email.includes('david')) {
        loginAs('auditor');
    } else {
        loginAs('assessor');
    }
});

// Create Control Modal
document.getElementById('createControlBtn')?.addEventListener('click', function() {
    openModal('createControlModal');
});

document.getElementById('createControlForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('controlName').value,
        description: document.getElementById('controlDescription').value,
        objective: document.getElementById('controlObjective').value,
        owner: document.getElementById('controlOwner').value,
        effectiveness: document.getElementById('controlEffectiveness').value,
        risk: document.getElementById('controlRisk').value,
        frequency: document.getElementById('controlFrequency').value
    };

    
    console.log('Control Created:', formData);
    
    // Show success message
    alert('Control submitted for certification successfully!');
    
    // Close modal and reset form
    closeModal('createControlModal');
    this.reset();
});

// Modal Functions
function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// Navigation Event Listeners
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        const viewName = this.getAttribute('data-view');
        if (viewName) {
            showView(viewName + 'View');
        }
    });
});

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Show login page by default
    showPage('loginPage');
    
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
});

// Notification System (Placeholder)
function showNotification(message, type = 'info') {
    console.log(`[${type.toUpperCase()}] ${message}`);
    // In a real application, this would show a toast notification
}

// Export for use in HTML
window.loginAs = loginAs;
window.logout = logout;
window.openModal = openModal;
window.closeModal = closeModal;
