document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("login-form");

    if (!form) {
        console.error("Login form not found! Make sure the ID is correct.");
        return;
    }

    const API_URL_USERS = "https://demo-api-skills.vercel.app/api/UrbanExplorer/users";

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        axios.get(API_URL_USERS)
            .then(response => {
                const users = response.data; // Get user list
                const user = users.find(u => u.name === username);

                if (user) {
                    alert("Logged in successfully! Off you go, Explorer!");

                    localStorage.setItem("user", JSON.stringify({
                        name: user.name,
                        id: user.id
                    }));

                    window.location.replace("../../index.html");
                } else {
                    alert("Invalid username or password. Please try again.");
                }
            })
            .catch(error => {
                console.error("Login Error:", error);
                alert("Login failed. Try again later.");
            });
    });
});
