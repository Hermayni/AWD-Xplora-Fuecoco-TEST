document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".form-inputs");

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent default form submission

        const email = form.username.value.trim();  // Username should be email
        const password = form.password.value.trim();

        if (!email || !password) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            const response = await fetch("http://demo-api-skills.vercel.app/api/UrbanExplorer/users/login", { 
                method: "POST", 
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }) // Send credentials to API
            });

            const userData = await response.json();

            if (response.ok) {
                // Store user session (Example: LocalStorage)
                localStorage.setItem("user", JSON.stringify(userData));

                // Redirect to dashboard/home page
                window.location.href = "/index.html";
            } else {
                alert(userData.message || "Invalid credentials.");
            }
        } catch (error) {
            console.error("Error logging in:", error);
            alert("An error occurred. Please try again later.");
        }
    });
});
