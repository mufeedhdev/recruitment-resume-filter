console.log("profile.js loaded");

document.addEventListener("DOMContentLoaded", () => {

    // ==================================================
    // ELEMENTS
    // ==================================================

    const profilePhoto =
        document.getElementById("profilePhoto");

    const photoPreview =
        document.getElementById("photoPreview");

    const removePhotoBtn =
        document.getElementById("removePhotoBtn");

    const profileForm =
        document.getElementById("profileForm");

    const profileMessage =
        document.getElementById("profileMessage");


    // ==================================================
    // PROFILE PHOTO
    // ==================================================

    if (profilePhoto) {

        profilePhoto.addEventListener("change", function () {

            const file = this.files[0];

            if (!file) {
                return;
            }


            // Check file type

            const allowedTypes = [
                "image/jpeg",
                "image/png",
                "image/webp"
            ];

            if (!allowedTypes.includes(file.type)) {

                alert(
                    "Please select a JPG, PNG or WebP image."
                );

                this.value = "";

                photoPreview.src = "";

                photoPreview.style.display = "none";

                return;
            }


            // Check file size

            if (file.size > 2 * 1024 * 1024) {

                alert(
                    "Photo must be smaller than 2 MB."
                );

                this.value = "";

                photoPreview.src = "";

                photoPreview.style.display = "none";

                return;
            }


            // Create photo preview

            const reader = new FileReader();

            reader.onload = function (event) {

                photoPreview.src =
                    event.target.result;

                photoPreview.style.display =
                    "block";

            };

            reader.readAsDataURL(file);

        });

    }


    // ==================================================
    // REMOVE PHOTO
    // ==================================================

    if (removePhotoBtn) {

        removePhotoBtn.addEventListener("click", function () {

            profilePhoto.value = "";

            photoPreview.src = "";

            photoPreview.style.display = "none";

        });

    }


    // ==================================================
    // PROFILE FORM
    // ==================================================

    if (profileForm) {

        profileForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                // Get values

                const fullName =
                    document.getElementById("fullName")
                    .value
                    .trim();

                const regNumber =
                    document.getElementById("regNumber")
                    .value
                    .trim();

                const email =
                    document.getElementById("email")
                    .value
                    .trim();

                const phone =
                    document.getElementById("phone")
                    .value
                    .trim();

                const department =
                    document.getElementById("department")
                    .value;

                const year =
                    document.getElementById("year")
                    .value;

                const cgpa =
                    parseFloat(
                        document.getElementById("cgpa").value
                    );

                const bio =
                    document.getElementById("bio")
                    .value
                    .trim();


                // Error elements

                const regNumberError =
                    document.getElementById("regNumberError");

                const emailError =
                    document.getElementById("emailError");

                const phoneError =
                    document.getElementById("phoneError");

                const cgpaError =
                    document.getElementById("cgpaError");


                // ==================================================
                // REGISTER NUMBER VALIDATION
                // ==================================================

                const regNumberPattern =
                    /^[0-9]{9}$/;

                if (!regNumberPattern.test(regNumber)) {

                    regNumberError.textContent =
                        "Register number must be exactly 9 digits.";

                    regNumberError.style.display =
                        "block";

                    return;

                } else {

                    regNumberError.style.display =
                        "none";

                }


                // ==================================================
                // EMAIL VALIDATION
                // ==================================================

                const emailPattern =
                    /^[0-9]{9}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


                if (!emailPattern.test(email)) {

                    emailError.textContent =
                        "Enter a valid college email address.";

                    emailError.style.display =
                        "block";

                    return;
                }


                if (email.split("@")[0] !== regNumber) {

                    emailError.textContent =
                        "Email must match your register number.";

                    emailError.style.display =
                        "block";

                    return;

                } else {

                    emailError.style.display =
                        "none";

                }


                // ==================================================
                // PHONE VALIDATION
                // ==================================================

                const phonePattern =
                    /^[0-9]{10}$/;


                if (!phonePattern.test(phone)) {

                    phoneError.textContent =
                        "Phone number must be exactly 10 digits.";

                    phoneError.style.display =
                        "block";

                    return;

                } else {

                    phoneError.style.display =
                        "none";

                }


                // ==================================================
                // CGPA VALIDATION
                // ==================================================

                if (
                    isNaN(cgpa) ||
                    cgpa < 0 ||
                    cgpa > 10
                ) {

                    cgpaError.textContent =
                        "CGPA must be between 0 and 10.";

                    cgpaError.style.display =
                        "block";

                    return;

                } else {

                    cgpaError.style.display =
                        "none";

                }


                // ==================================================
                // SAVE PROFILE
                // ==================================================

                const profileData = {

                    fullName: fullName,

                    regNumber: regNumber,

                    email: email,

                    phone: phone,

                    department: department,

                    year: year,

                    cgpa: cgpa,

                    bio: bio,

                    photo:
                        profilePhoto.files[0] || null

                };


                console.log(
                    "Profile saved:",
                    profileData
                );


                // Success message

                profileMessage.textContent =
                    "Profile saved successfully.";

                profileMessage.className =
                    "message success";

            }
        );

    }

});