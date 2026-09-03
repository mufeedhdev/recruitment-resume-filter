document.addEventListener("DOMContentLoaded", function () {

    console.log("Recruiter Dashboard Loaded Successfully");


    // Logout button
    const logoutBtn = document.getElementById("logoutBtn");


    if (logoutBtn) {

        logoutBtn.addEventListener("click", function () {

            // Remove login information
            localStorage.removeItem("loggedIn");
            localStorage.removeItem("loginEmail");

            // Go back to login page
            window.location.href = "login.html";

        });

    }

});