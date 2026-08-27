document.addEventListener("DOMContentLoaded", () => {

    const educationForm =
        document.getElementById("educationForm");

    const educationMessage =
        document.getElementById("educationMessage");

    educationForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const startYear =
            parseInt(document.getElementById("startYear").value);

        const graduationYear =
            parseInt(document.getElementById("graduationYear").value);

        const cgpa =
            parseFloat(document.getElementById("cgpa").value);

        const graduationYearError =
            document.getElementById("graduationYearError");

        const cgpaError =
            document.getElementById("cgpaError");


        // Graduation year validation

        if (graduationYear < startYear) {

            graduationYearError.textContent =
                "Graduation year cannot be before the start year.";

            graduationYearError.style.display =
                "block";

            return;

        }

        graduationYearError.style.display =
            "none";


        // CGPA validation

        if (cgpa < 0 || cgpa > 10) {

            cgpaError.textContent =
                "CGPA must be between 0 and 10.";

            cgpaError.style.display =
                "block";

            return;

        }

        cgpaError.style.display =
            "none";


        // Temporary save

        educationMessage.textContent =
            "Education details saved successfully.";

        educationMessage.className =
            "message success";

        console.log("Education details saved.");

    });

});