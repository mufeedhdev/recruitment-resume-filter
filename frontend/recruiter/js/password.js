document.addEventListener("DOMContentLoaded", function () {

    const form =
        document.getElementById("forgotForm");


    if (!form) {
        return;
    }


    form.addEventListener("submit", function (event) {

        event.preventDefault();


        document.querySelectorAll(".error")
            .forEach(function (error) {

                error.innerText = "";

            });


        const email =
            document.getElementById("resetEmail")
                .value
                .trim()
                .toLowerCase();


        const newPassword =
            document.getElementById("newPassword")
                .value;


        const confirmPassword =
            document.getElementById("resetConfirmPassword")
                .value;



        // Email validation

        if (
            !/^[A-Za-z0-9._%+-]+@sastra\.ac\.in$/
                .test(email)
        ) {

            document.getElementById(
                "resetEmailError"
            ).innerText =
                "Email must be in @sastra.ac.in format.";

            return;
        }



        // Get registered account

        const account =
            JSON.parse(
                localStorage.getItem(
                    "recruiterAccount"
                )
            );


        if (!account) {

            document.getElementById(
                "resetEmailError"
            ).innerText =
                "No registered account found.";

            return;
        }



        // Check email

        if (email !== account.email) {

            document.getElementById(
                "resetEmailError"
            ).innerText =
                "Email is not registered.";

            return;
        }



        // Password length

        if (newPassword.length !== 6) {

            document.getElementById(
                "newPasswordError"
            ).innerText =
                "Password must be exactly 6 characters.";

            return;
        }



        // Confirm password

        if (newPassword !== confirmPassword) {

            document.getElementById(
                "resetConfirmPasswordError"
            ).innerText =
                "Passwords do not match.";

            return;
        }



        // Change password

        account.password = newPassword;


        localStorage.setItem(
            "recruiterAccount",
            JSON.stringify(account)
        );


        alert("Password changed successfully!");


        window.location.href =
            "login.html";

    });

});