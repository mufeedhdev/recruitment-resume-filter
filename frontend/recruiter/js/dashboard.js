document.addEventListener("DOMContentLoaded", function () {

    const loggedIn = localStorage.getItem("recruiterLoggedIn");

    if (loggedIn !== "true") {
        window.location.href = "login.html";
        return;
    }

    console.log("Dashboard loaded successfully");

});