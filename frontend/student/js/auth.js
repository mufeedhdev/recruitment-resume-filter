console.log("auth.js loaded");

document.addEventListener("DOMContentLoaded", () => {

    // ==================================================
    // REGISTER
    // ==================================================

    const registerForm = document.getElementById("registerForm");
    const messageBox = document.getElementById("formMessage");

    const regNumberInput = document.getElementById("regNumber");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");

    const regNumberError = document.getElementById("regNumberError");
    const emailError = document.getElementById("emailError");
    const phoneError = document.getElementById("phoneError");
    const passwordError = document.getElementById("passwordError");
    const confirmPasswordError = document.getElementById("confirmPasswordError");


    // ------------------------------------------
    // Register live validation
    // ------------------------------------------

    function checkRegAndEmailLive() {

        if (!regNumberInput || !emailInput) return;

        const regNumber = regNumberInput.value.trim();
        const email = emailInput.value.trim();

        const regNumberPattern = /^[0-9]{9}$/;

        const emailPattern =
            /^[0-9]{9}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


        if (regNumber && !regNumberPattern.test(regNumber)) {

            regNumberError.textContent =
                "Must be exactly 9 digits.";

            regNumberError.style.display = "block";

        } else {

            regNumberError.style.display = "none";

        }


        if (email && !emailPattern.test(email)) {

            emailError.textContent =
                "Enter a valid college email.";

            emailError.style.display = "block";

        } else if (
            email &&
            regNumber &&
            email.split("@")[0] !== regNumber
        ) {

            emailError.textContent =
                "Email must match your register number.";

            emailError.style.display = "block";

        } else {

            emailError.style.display = "none";

        }

    }


    function checkPhoneLive() {

        if (!phoneInput) return;

        const phone = phoneInput.value.trim();

        const phonePattern = /^[0-9]{10}$/;


        if (phone && !phonePattern.test(phone)) {

            phoneError.textContent =
                "Phone number must be exactly 10 digits.";

            phoneError.style.display = "block";

        } else {

            phoneError.style.display = "none";

        }

    }


    function checkPasswordLive() {

        if (!passwordInput) return;

        const password = passwordInput.value;


        if (password && password.length < 6) {

            passwordError.textContent =
                "Password must be at least 6 characters.";

            passwordError.style.display = "block";

        } else {

            passwordError.style.display = "none";

        }


        checkConfirmPasswordLive();

    }


    function checkConfirmPasswordLive() {

        if (!passwordInput || !confirmPasswordInput) return;

        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;


        if (
            confirmPassword &&
            password !== confirmPassword
        ) {

            confirmPasswordError.textContent =
                "Passwords do not match.";

            confirmPasswordError.style.display = "block";

        } else {

            confirmPasswordError.style.display = "none";

        }

    }


    if (regNumberInput && emailInput) {

        regNumberInput.addEventListener(
            "input",
            checkRegAndEmailLive
        );

        emailInput.addEventListener(
            "input",
            checkRegAndEmailLive
        );

    }


    if (phoneInput) {

        phoneInput.addEventListener(
            "input",
            checkPhoneLive
        );

    }


    if (passwordInput) {

        passwordInput.addEventListener(
            "input",
            checkPasswordLive
        );

    }


    if (confirmPasswordInput) {

        confirmPasswordInput.addEventListener(
            "input",
            checkConfirmPasswordLive
        );

    }


    // ------------------------------------------
    // Register submit
    // ------------------------------------------

    if (registerForm) {

        registerForm.addEventListener("submit", (event) => {

            event.preventDefault();


            const fullName =
                document.getElementById("fullName").value.trim();

            const regNumber =
                document.getElementById("regNumber").value.trim();

            const email =
                document.getElementById("email").value.trim();

            const phone =
                document.getElementById("phone").value.trim();

            const department =
                document.getElementById("department").value;

            const year =
                document.getElementById("year").value;

            const cgpa =
                parseFloat(document.getElementById("cgpa").value);

            const password =
                document.getElementById("password").value;

            const confirmPassword =
                document.getElementById("confirmPassword").value;


            if (
                !fullName ||
                !regNumber ||
                !email ||
                !phone ||
                !department ||
                !year ||
                isNaN(cgpa) ||
                !password ||
                !confirmPassword
            ) {

                showMessage(
                    "Please fill in all fields.",
                    "error"
                );

                return;

            }


            const regNumberPattern = /^[0-9]{9}$/;


            if (!regNumberPattern.test(regNumber)) {

                showMessage(
                    "Register number must be exactly 9 digits.",
                    "error"
                );

                return;

            }


            const emailPattern =
                /^[0-9]{9}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


            if (!emailPattern.test(email)) {

                showMessage(
                    "Enter a valid college email.",
                    "error"
                );

                return;

            }


            if (email.split("@")[0] !== regNumber) {

                showMessage(
                    "Email must match your register number.",
                    "error"
                );

                return;

            }


            const phonePattern = /^[0-9]{10}$/;


            if (!phonePattern.test(phone)) {

                showMessage(
                    "Phone number must be 10 digits.",
                    "error"
                );

                return;

            }


            if (cgpa < 0 || cgpa > 10) {

                showMessage(
                    "CGPA must be between 0 and 10.",
                    "error"
                );

                return;

            }


            if (password.length < 6) {

                showMessage(
                    "Password must be at least 6 characters.",
                    "error"
                );

                return;

            }


            if (password !== confirmPassword) {

                showMessage(
                    "Passwords do not match.",
                    "error"
                );

                return;

            }


            const studentData = {
                fullName,
                regNumber,
                email,
                phone,
                department,
                year,
                cgpa,
                password
            };


            console.log(
                "Student registration data:",
                studentData
            );


            showMessage(
                "Registered successfully! Redirecting to login...",
                "success"
            );


            setTimeout(() => {

                window.location.href = "login.html";

            }, 1500);

        });

    }


    // ==================================================
    // LOGIN WITH OTP
    // ==================================================

    const loginForm =
        document.getElementById("loginForm");

    if (!loginForm) {
        return;
    }


    const loginEmail =
        document.getElementById("email");

    const sendOtpBtn =
        document.getElementById("sendOtpBtn");

    const otpSection =
        document.getElementById("otpSection");

    const otpInput =
        document.getElementById("otp");

    const resendOtpBtn =
        document.getElementById("resendOtpBtn");

    const emailError =
        document.getElementById("emailError");

    const otpError =
        document.getElementById("otpError");

    const loginMessage =
        document.getElementById("formMessage");


    // This stores the OTP temporarily.
    // Real OTP generation and email sending
    // should eventually be handled by your backend.
    let generatedOTP = null;


    // ------------------------------------------
    // College email validation
    // ------------------------------------------

    function validateCollegeEmail() {

        const email =
            loginEmail.value.trim();


        // SASTRA college email format
        const emailPattern =
            /^[0-9]{9}@sastra\.ac\.in$/;


        if (!email) {

            emailError.textContent =
                "Please enter your college email.";

            emailError.style.display =
                "block";

            return false;

        }


        if (!emailPattern.test(email)) {

            emailError.textContent =
                "Use your college email, e.g. 123456789@sastra.ac.in";

            emailError.style.display =
                "block";

            return false;

        }


        emailError.style.display =
            "none";

        return true;

    }


    // ------------------------------------------
    // Email live validation
    // ------------------------------------------

    loginEmail.addEventListener("input", () => {

        if (emailError) {
            emailError.style.display = "none";
        }

    });


    // ------------------------------------------
    // SEND OTP
    // ------------------------------------------

    sendOtpBtn.addEventListener("click", () => {

        if (!validateCollegeEmail()) {
            return;
        }


        const email =
            loginEmail.value.trim();


        // Generate 6-digit OTP
        generatedOTP =
            Math.floor(
                100000 + Math.random() * 900000
            ).toString();


        console.log(
            "Generated OTP:",
            generatedOTP
        );


        // Show OTP section
        otpSection.style.display =
            "block";


        // Disable email field
        loginEmail.disabled =
            true;


        // Change button
        sendOtpBtn.textContent =
            "OTP Sent";

        sendOtpBtn.disabled =
            true;


        // Show message
        loginMessage.textContent =
            "OTP sent to " + email;

        loginMessage.className =
            "message success";


        /*
         * DEMO ONLY:
         *
         * The OTP is currently printed in the
         * browser console because we have not
         * connected an email/SMS backend yet.
         *
         * Later:
         * frontend → backend → email service
         */


        alert(
            "Demo OTP: " + generatedOTP +
            "\n\nFor the real project, this OTP should be sent to the student's college email."
        );

    });


    // ------------------------------------------
    // RESEND OTP
    // ------------------------------------------

    resendOtpBtn.addEventListener("click", () => {

        if (!loginEmail.value.trim()) {
            return;
        }


        generatedOTP =
            Math.floor(
                100000 + Math.random() * 900000
            ).toString();


        console.log(
            "New OTP:",
            generatedOTP
        );


        otpInput.value = "";


        otpError.style.display =
            "none";


        loginMessage.textContent =
            "A new OTP has been sent.";

        loginMessage.className =
            "message success";


        alert(
            "Demo OTP: " + generatedOTP +
            "\n\nReal email OTP will be connected through the backend."
        );

    });


    // ------------------------------------------
    // VERIFY OTP
    // ------------------------------------------

    loginForm.addEventListener("submit", (event) => {

        event.preventDefault();


        const enteredOTP =
            otpInput.value.trim();


        // Make sure OTP was requested
        if (!generatedOTP) {

            otpError.textContent =
                "Please request an OTP first.";

            otpError.style.display =
                "block";

            return;

        }


        // Check 6 digits
        if (!/^[0-9]{6}$/.test(enteredOTP)) {

            otpError.textContent =
                "OTP must be exactly 6 digits.";

            otpError.style.display =
                "block";

            return;

        }


        // Check OTP
        if (enteredOTP !== generatedOTP) {

            otpError.textContent =
                "Invalid OTP. Please try again.";

            otpError.style.display =
                "block";

            return;

        }


        // OTP correct
        otpError.style.display =
            "none";


        loginMessage.textContent =
            "OTP verified successfully! Redirecting...";

        loginMessage.className =
            "message success";


        console.log(
            "Login successful:",
            loginEmail.value.trim()
        );


        // Clear OTP after successful login
        generatedOTP = null;


        // Redirect
        setTimeout(() => {

            window.location.href =
                "dashboard.html";

        }, 1500);

    });


    // ------------------------------------------
    // Message function
    // ------------------------------------------

    function showMessage(text, type) {

        if (messageBox) {

            messageBox.textContent =
                text;

            messageBox.className =
                "message " + type;

        }

    }

});