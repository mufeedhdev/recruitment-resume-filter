document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {

        loginForm.addEventListener("submit", function (e) {

            e.preventDefault();

            const email = document.getElementById("loginEmail").value.trim();
            const password = document.getElementById("loginPassword").value.trim();

            if (email === "" || password === "") {
                alert("Please enter Email and Password");
                return;
            }

            // Save login status
            localStorage.setItem("recruiterLoggedIn", "true");
            localStorage.setItem("recruiterEmail", email);

            alert("Login Successful!");

            // Go to dashboard
            window.location.href = "dashboard.html";

        });
    }

});