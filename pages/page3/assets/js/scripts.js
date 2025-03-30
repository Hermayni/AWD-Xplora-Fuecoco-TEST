document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("register-form");

    registerForm.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent form from reloading the page

        // Get form values
        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm_password").value;

        // Check if passwords match
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Prepare data for API request
        const requestData = {
            username: username,
            email: email,
            password: password,
        };

        try {
            const response = await fetch("http://demo-api-skills.vercel.app/api/UrbanExplorer/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Registration successful! Redirecting to login page...");
                window.location.href = "../../../page2/index.html"; // Redirect to login page
            } else {
                alert(data.message || "Registration failed. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again later.");
        }
    });
});
