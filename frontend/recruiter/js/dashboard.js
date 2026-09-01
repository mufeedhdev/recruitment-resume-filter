document.addEventListener("DOMContentLoaded", function () {


    /* =================================
       CHECK LOGIN
    ================================= */

    const loggedIn =
        localStorage.getItem("loggedIn");


    if (loggedIn !== "true") {

        window.location.href =
            "login.html";

        return;
    }


    /* =================================
       GET RECRUITER EMAIL
    ================================= */

    const email =
        localStorage.getItem("recruiterEmail");


    const recruiterEmail =
        document.getElementById(
            "recruiterEmail"
        );


    if (recruiterEmail && email) {

        recruiterEmail.textContent =
            email;

    }


    /* =================================
       LOGOUT FUNCTION
    ================================= */

    function logout() {

        localStorage.removeItem(
            "loggedIn"
        );

        localStorage.removeItem(
            "loginEmail"
        );

        window.location.href =
            "login.html";

    }


    /* =================================
       TOP LOGOUT
    ================================= */

    const logoutBtn =
        document.getElementById(
            "logoutBtn"
        );


    if (logoutBtn) {

        logoutBtn.addEventListener(
            "click",
            logout
        );

    }


    /* =================================
       SIDEBAR LOGOUT
    ================================= */

    const sidebarLogout =
        document.getElementById(
            "sidebarLogout"
        );


    if (sidebarLogout) {

        sidebarLogout.addEventListener(
            "click",
            logout
        );

    }


});