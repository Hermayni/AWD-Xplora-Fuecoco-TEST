function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: "smooth" });
    } else {
        console.error("Section not found:", sectionId);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // Redirect to login page when clicking the profile icon
    document.querySelector(".profile-icon").addEventListener("click", function () {
        window.location.href = "./../../pages/page2/index.html"; // Adjust the path as needed
    });

    // Redirect to login page when clicking the "Click to View Top Spots" button
    document.querySelector(".hero-text .btn").addEventListener("click", function () {
        window.location.href = "./../../pages/page2/index.html"; // Adjust the path as needed
    });
});
