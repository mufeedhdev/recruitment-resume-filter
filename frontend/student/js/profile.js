console.log("profile.js loaded");

document.addEventListener("DOMContentLoaded", () => {

    const profileForm = document.getElementById("profileForm");

    if (!profileForm) {
        return;
    }


    // ==================================================
    // INPUT ELEMENTS
    // ==================================================

    const fullNameInput =
        document.getElementById("fullName");

    const regNumberInput =
        document.getElementById("regNumber");

    const emailInput =
        document.getElementById("email");

    const phoneInput =
        document.getElementById("phone");

    const departmentInput =
        document.getElementById("department");

    const yearInput =
        document.getElementById("year");

    const cgpaInput =
        document.getElementById("cgpa");

    const bioInput =
        document.getElementById("bio");

    const photoInput =
        document.getElementById("photo");

    const photoPreview =
        document.getElementById("photoPreview");


    // ==================================================
    // ERROR ELEMENTS
    // ==================================================

    const regNumberError =
        document.getElementById("regNumberError");

    const emailError =
        document.getElementById("emailError");

    const phoneError =
        document.getElementById("phoneError");

    const cgpaError =
        document.getElementById("cgpaError");


    // ==================================================
    // MESSAGE
    // ==================================================

    const profileMessage =
        document.getElementById("profileMessage");


    // ==================================================
    // REGISTRATION NUMBER + EMAIL VALIDATION
    // ==================================================

    function checkRegAndEmailLive() {

        const regNumber =
            regNumberInput
                ? regNumberInput.value.trim()
                : "";

        const email =
            emailInput
                ? emailInput.value.trim()
                : "";


        const regNumberPattern =
            /^[0-9]{9}$/;


        const emailPattern =
            /^[0-9]{9}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


        // Register number

        if (
            regNumber &&
            !regNumberPattern.test(regNumber)
        ) {

            if (regNumberError) {

                regNumberError.textContent =
                    "Must be exactly 9 digits.";

                regNumberError.style.display =
                    "block";
            }

        } else {

            if (regNumberError) {
                regNumberError.style.display =
                    "none";
            }

        }


        // Email format

        if (
            email &&
            !emailPattern.test(email)
        ) {

            if (emailError) {

                emailError.textContent =
                    "Enter a valid college email such as 123456789@sastra.ac.in.";

                emailError.style.display =
                    "block";
            }

        }

        // Email register number match

        else if (
            email &&
            regNumber &&
            email.split("@")[0] !== regNumber
        ) {

            if (emailError) {

                emailError.textContent =
                    "Email must match your register number.";

                emailError.style.display =
                    "block";
            }

        } else {

            if (emailError) {
                emailError.style.display =
                    "none";
            }

        }

    }


    // ==================================================
    // PHONE VALIDATION
    // ==================================================

    function checkPhoneLive() {

        const phone =
            phoneInput
                ? phoneInput.value.trim()
                : "";


        const phonePattern =
            /^[0-9]{10}$/;


        if (
            phone &&
            !phonePattern.test(phone)
        ) {

            if (phoneError) {

                phoneError.textContent =
                    "Phone number must be exactly 10 digits.";

                phoneError.style.display =
                    "block";
            }

        } else {

            if (phoneError) {
                phoneError.style.display =
                    "none";
            }

        }

    }


    // ==================================================
    // CGPA VALIDATION
    // ==================================================

    function checkCGPALive() {

        const cgpa =
            cgpaInput
                ? cgpaInput.value.trim()
                : "";


        if (cgpa === "") {

            if (cgpaError) {
                cgpaError.style.display =
                    "none";
            }

            return;
        }


        const cgpaValue =
            parseFloat(cgpa);


        if (
            isNaN(cgpaValue) ||
            cgpaValue < 0 ||
            cgpaValue > 10
        ) {

            if (cgpaError) {

                cgpaError.textContent =
                    "CGPA must be between 0 and 10.";

                cgpaError.style.display =
                    "block";
            }

        } else {

            if (cgpaError) {
                cgpaError.style.display =
                    "none";
            }

        }

    }


    // ==================================================
    // ADD LIVE VALIDATION
    // ==================================================

    if (regNumberInput) {

        regNumberInput.addEventListener(
            "input",
            checkRegAndEmailLive
        );

    }


    if (emailInput) {

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


    if (cgpaInput) {

        cgpaInput.addEventListener(
            "input",
            checkCGPALive
        );

    }


    // ==================================================
    // PROFILE PHOTO
    // ==================================================

    if (photoInput && photoPreview) {

        photoInput.addEventListener(
            "change",
            function () {

                const file =
                    this.files[0];


                if (!file) {
                    return;
                }


                // Check image type

                if (!file.type.startsWith("image/")) {

                    showMessage(
                        "Please select a valid image file.",
                        "error"
                    );

                    this.value = "";

                    return;
                }


                // Maximum 5 MB

                const maxSize =
                    5 * 1024 * 1024;


                if (file.size > maxSize) {

                    showMessage(
                        "Photo size must be less than 5 MB.",
                        "error"
                    );

                    this.value = "";

                    return;
                }


                // Preview image

                const reader =
                    new FileReader();


                reader.onload =
                    function (event) {

                        photoPreview.src =
                            event.target.result;

                    };


                reader.readAsDataURL(file);

            }
        );

    }


    // ==================================================
    // LOAD SAVED PROFILE
    // ==================================================

    loadProfile();


    function loadProfile() {

        const savedProfile =
            localStorage.getItem(
                "studentProfile"
            );


        if (!savedProfile) {
            return;
        }


        try {

            const profile =
                JSON.parse(savedProfile);


            if (fullNameInput) {

                fullNameInput.value =
                    profile.fullName || "";

            }


            if (regNumberInput) {

                regNumberInput.value =
                    profile.regNumber || "";

            }


            if (emailInput) {

                emailInput.value =
                    profile.email || "";

            }


            if (phoneInput) {

                phoneInput.value =
                    profile.phone || "";

            }


            if (departmentInput) {

                departmentInput.value =
                    profile.department || "";

            }


            if (yearInput) {

                yearInput.value =
                    profile.year || "";

            }


            if (cgpaInput) {

                cgpaInput.value =
                    profile.cgpa || "";

            }


            if (bioInput) {

                bioInput.value =
                    profile.bio || "";

            }


            // Load photo

            if (
                profile.photo &&
                photoPreview
            ) {

                photoPreview.src =
                    profile.photo;

            }


        } catch (error) {

            console.error(
                "Error loading profile:",
                error
            );

        }

    }


    // ==================================================
    // FORM SUBMIT
    // ==================================================

    profileForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            // ------------------------------------------
            // Get values
            // ------------------------------------------

            const fullName =
                fullNameInput
                    ? fullNameInput.value.trim()
                    : "";

            const regNumber =
                regNumberInput
                    ? regNumberInput.value.trim()
                    : "";

            const email =
                emailInput
                    ? emailInput.value.trim()
                    : "";

            const phone =
                phoneInput
                    ? phoneInput.value.trim()
                    : "";

            const department =
                departmentInput
                    ? departmentInput.value
                    : "";

            const year =
                yearInput
                    ? yearInput.value
                    : "";

            const cgpa =
                cgpaInput
                    ? cgpaInput.value.trim()
                    : "";

            const bio =
                bioInput
                    ? bioInput.value.trim()
                    : "";


            // ------------------------------------------
            // Required fields
            // ------------------------------------------

            if (
                !fullName ||
                !regNumber ||
                !email ||
                !phone ||
                !department ||
                !year
            ) {

                showMessage(
                    "Please fill in all required fields.",
                    "error"
                );

                return;
            }


            // ------------------------------------------
            // Register number
            // ------------------------------------------

            const regNumberPattern =
                /^[0-9]{9}$/;


            if (
                !regNumberPattern.test(regNumber)
            ) {

                showMessage(
                    "Register number must be exactly 9 digits.",
                    "error"
                );

                return;
            }


            // ------------------------------------------
            // Email
            // ------------------------------------------

            const emailPattern =
                /^[0-9]{9}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


            if (
                !emailPattern.test(email)
            ) {

                showMessage(
                    "Enter a valid college email.",
                    "error"
                );

                return;
            }


            // ------------------------------------------
            // Email must match register number
            // ------------------------------------------

            if (
                email.split("@")[0] !==
                regNumber
            ) {

                showMessage(
                    "Email must match your register number.",
                    "error"
                );

                return;
            }


            // ------------------------------------------
            // Phone
            // ------------------------------------------

            const phonePattern =
                /^[0-9]{10}$/;


            if (
                !phonePattern.test(phone)
            ) {

                showMessage(
                    "Phone number must be exactly 10 digits.",
                    "error"
                );

                return;
            }


            // ------------------------------------------
            // CGPA
            // ------------------------------------------

            if (cgpa !== "") {

                const cgpaValue =
                    parseFloat(cgpa);


                if (
                    isNaN(cgpaValue) ||
                    cgpaValue < 0 ||
                    cgpaValue > 10
                ) {

                    showMessage(
                        "CGPA must be between 0 and 10.",
                        "error"
                    );

                    return;
                }

            }


            // ------------------------------------------
            // Get existing photo
            // ------------------------------------------

            let existingPhoto = "";


            const oldProfile =
                localStorage.getItem(
                    "studentProfile"
                );


            if (oldProfile) {

                try {

                    const oldData =
                        JSON.parse(oldProfile);

                    existingPhoto =
                        oldData.photo || "";

                } catch (error) {

                    console.error(error);

                }

            }


            // ------------------------------------------
            // Save profile
            // ------------------------------------------

            function saveProfile(photo) {

                const studentProfile = {

                    fullName:
                        fullName,

                    regNumber:
                        regNumber,

                    email:
                        email,

                    phone:
                        phone,

                    department:
                        department,

                    year:
                        year,

                    cgpa:
                        cgpa,

                    bio:
                        bio,

                    photo:
                        photo

                };


                localStorage.setItem(
                    "studentProfile",
                    JSON.stringify(studentProfile)
                );


                console.log(
                    "Student profile saved:",
                    studentProfile
                );


                showMessage(
                    "Profile saved successfully.",
                    "success"
                );

            }


            // ------------------------------------------
            // Save new photo if selected
            // ------------------------------------------

            if (
                photoInput &&
                photoInput.files[0]
            ) {

                const file =
                    photoInput.files[0];


                const reader =
                    new FileReader();


                reader.onload =
                    function (event) {

                        saveProfile(
                            event.target.result
                        );

                    };


                reader.readAsDataURL(file);

            } else {

                saveProfile(
                    existingPhoto
                );

            }

        }
    );


    // ==================================================
    // MESSAGE FUNCTION
    // ==================================================

    function showMessage(text, type) {

        if (!profileMessage) {
            return;
        }


        profileMessage.textContent =
            text;


        profileMessage.className =
            "message " + type;

    }

});