function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: "smooth" });
    } else {
        console.error("Section not found:", sectionId);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.nav') && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });

        // Close menu when clicking a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
            });
        });
    }

    // Function to check if the user is logged in
    function isUserLoggedIn() {
        return localStorage.getItem("user") !== null;
    }

    // Redirect to login page if user is not logged in
    function handleAuthRedirect(targetPage) {
        if (!isUserLoggedIn()) {
            alert("Please login to continue.");
            window.location.href = "../../pages/page2/index.html"; // Redirect to login page
        } else {
            window.location.href = targetPage; // Redirect to the intended page
        }
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
        handleAuthRedirect("../../pages/profile/index.html");
    }

    // "Click to View Top Spots" Button - Redirect if logged in, otherwise go to login
    document.querySelector(".hero-text .btn").addEventListener("click", function () {
        handleAuthRedirect("../../pages/Spots/index.html"); // Adjust the path as needed
    });

    // Update profile icon based on login status
    updateProfileIcon();
});
