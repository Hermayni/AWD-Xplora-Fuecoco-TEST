function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: "smooth" });
    } else {
        console.error("Section not found:", sectionId);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // Function to check if the user is logged in
    function isUserLoggedIn() {
        return localStorage.getItem("user") !== null;
    }

    // Redirect to login page if user is not logged in
    function handleAuthRedirect(targetPage) {
        if (!isUserLoggedIn()) {
            alert("Please log in to continue.");
            window.location.href = "../../pages/page2/index.html"; // Redirect to login page
        } else {
            window.location.href = targetPage; // Redirect to the intended page
        }
    }

    // Profile Icon Click - Redirect if logged in, otherwise go to login
    document.querySelector(".profile-icon").addEventListener("click", function () {
        handleAuthRedirect("../../pages/profile/index.html"); // Adjust the path as needed
        window.location.href = "./../pages/page2/index.html" ; // Adjust the path as needed
    });

    // "Click to View Top Spots" Button - Redirect if logged in, otherwise go to login
    document.querySelector(".hero-text .btn").addEventListener("click", function () {
        handleAuthRedirect("../../pages/top-spots/index.html"); // Adjust the path as needed
        window.location.href = "./../pages/page2/index.html" ; // Adjust the path as needed
    });
});
