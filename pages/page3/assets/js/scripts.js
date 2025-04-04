document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("register-form");

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent page refresh

        // ✅ Correct field names to match API expectations
        const name = document.getElementById("username").value.trim(); // Changed 'username' to 'name'
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("confirm_password").value.trim();

        // ✅ Ensure all fields are filled
        if (!name || !email || !password || !confirmPassword) {
            alert("Please fill out all fields.");
            return;
        }

        // ✅ Check if passwords match
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        // ✅ Construct the correct data format
        const requestData = { email, name, password };

        console.log("Sending data:", requestData); // Debugging step

        try {
            // ✅ Send API Request
            const response = await axios.post(
                "https://demo-api-skills.vercel.app/api/UrbanExplorer/users",
                requestData,
                { headers: { "Content-Type": "application/json" } }
            );

            alert("Signup successful!");
            console.log("Response:", response.data);

              // ✅ Redirect to login page after successful signup
            window.location.href = "../page2/index.html"; 

        } catch (error) {
            console.error("Signup failed:", error.response ? error.response.data : error.message);
            alert("Signup failed: " + (error.response?.data?.error || "Unknown error"));
        }
    });
});
