document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
    
    // Check if user is logged in
    function isUserLoggedIn() {
        const user = localStorage.getItem('user');
        return user !== null;
    }
    
    // Handle user logout
    function handleLogout() {
        console.log('Logout function called');
        
        const currentUser = JSON.parse(localStorage.getItem('user'));
        if (!currentUser || !currentUser.id) {
            window.location.href = '/index.html';
            return;
        }

        // Clear user data from localStorage
        localStorage.removeItem('user');
        console.log('User logged out, localStorage cleared');
        
        // Redirect to main index page
        window.location.href = '/index.html';
    }
    
    // Update profile icon based on login status
    function updateProfileIcon() {
        const profileIcon = document.querySelector('.profile-icon');
        if (!profileIcon) return;
        
        const isLoggedIn = isUserLoggedIn();
        
        if (isLoggedIn) {
            // Change to logout icon when logged in
            profileIcon.innerHTML = '<i class="fas fa-sign-out-alt fa-2x"></i>';
            profileIcon.title = 'Logout';
            
            // Change click event to logout
            profileIcon.removeEventListener('click', handleProfileClick);
            profileIcon.addEventListener('click', handleLogout);
        } else {
            // Change to profile icon when logged out
            profileIcon.innerHTML = '<i class="fas fa-user-circle fa-2x"></i>';
            profileIcon.title = 'Profile';
            
            // Change click event to profile redirect
            profileIcon.removeEventListener('click', handleLogout);
            profileIcon.addEventListener('click', handleProfileClick);
        }
    }
    
    // Profile icon click handler
    function handleProfileClick() {
        if (isUserLoggedIn()) {
            window.location.href = "../../pages/profile/index.html";
        } else {
            window.location.href = "../../pages/page2/index.html";
        }
    }
    
    // Add click event to profile icon
    const profileIcon = document.querySelector('.profile-icon');
    if (profileIcon) {
        profileIcon.addEventListener('click', handleProfileClick);
    }
    
    // Update profile icon based on login status
    updateProfileIcon();
});

