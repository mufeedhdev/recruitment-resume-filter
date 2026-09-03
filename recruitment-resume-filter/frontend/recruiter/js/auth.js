document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {

        loginForm.addEventListener("submit", function (event) {

            event.preventDefault();

            // Get login details
            const emailInput = document.getElementById("email");
            const passwordInput = document.getElementById("password");

            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            // Get registered recruiter details from localStorage
            const registeredEmail = localStorage.getItem("recruiterEmail");
            const registeredPassword = localStorage.getItem("recruiterPassword");

            // Check email and password
            if (
                email === registeredEmail &&
                password === registeredPassword
            ) {

                // Store login status
                localStorage.setItem("loggedIn", "true");
                localStorage.setItem("loginEmail", email);

                // Login successful
                alert("Login successful!");

                // Open dashboard after clicking OK
                window.location.href = "dashboard.html";

            } else {

                alert("Invalid Email ID or Password.");

            }

        });

    }

});