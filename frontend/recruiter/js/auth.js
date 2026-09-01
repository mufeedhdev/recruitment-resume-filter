document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // REGISTER
    // =========================
    const registerForm = document.getElementById("registerForm");

    if (registerForm) {

        registerForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("staffName").value.trim();
            const department = document.getElementById("department").value;
            const staffId = document.getElementById("staffId").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();
            const confirmPassword =
                document.getElementById("confirmPassword").value.trim();

            // Phone validation
            if (!/^\d{10}$/.test(phone)) {
                alert("Phone number must contain exactly 10 digits.");
                return;
            }

            // Email validation
            if (!/^\d+@sastra\.ac\.in$/.test(email)) {
                alert("Enter a valid SASTRA email ID.");
                return;
            }

            // Password validation
            if (!/^\d{6}$/.test(password)) {
                alert("Password must contain exactly 6 digits.");
                return;
            }

            // Confirm password
            if (password !== confirmPassword) {
                alert("Passwords do not match.");
                return;
            }

            // Save recruiter details
            const recruiter = {
                name: name,
                department: department,
                staffId: staffId,
                phone: phone,
                email: email,
                password: password
            };

            localStorage.setItem("recruiterData", JSON.stringify(recruiter));

            alert("Registration successful!");

            // Go to login page
            window.location.href = "login.html";
        });
    }


    // =========================
    // LOGIN
    // =========================
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {

        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();

            // Get registered data
            const savedData = localStorage.getItem("recruiterData");

            if (!savedData) {
                alert("No registered recruiter found. Please register first.");
                return;
            }

            const recruiter = JSON.parse(savedData);

            // Check email and password
            if (
                email === recruiter.email &&
                password === recruiter.password
            ) {

                localStorage.setItem("loggedIn", "true");

                alert("Login successful!");

                // IMPORTANT
                window.location.href = "dashboard.html";

            } else {
                alert("Invalid Email ID or Password");
            }
        });
    }
});