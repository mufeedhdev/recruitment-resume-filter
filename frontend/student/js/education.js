console.log("education.js loaded");

document.addEventListener("DOMContentLoaded", () => {

    const educationForm =
        document.getElementById("educationForm");

    const educationList =
        document.getElementById("educationList");

    const educationMessage =
        document.getElementById("educationMessage");


    if (!educationForm) {
        return;
    }


    // ==================================================
    // INPUT ELEMENTS
    // ==================================================

    const degreeInput =
        document.getElementById("degree");

    const institutionInput =
        document.getElementById("institution");

    const departmentInput =
        document.getElementById("department");

    const yearInput =
        document.getElementById("year");

    const cgpaInput =
        document.getElementById("cgpa");


    // ==================================================
    // LOAD SAVED EDUCATION
    // ==================================================

    loadEducation();


    // ==================================================
    // FORM SUBMIT
    // ==================================================

    educationForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            // ------------------------------------------
            // Get values
            // ------------------------------------------

            const degree =
                degreeInput
                    ? degreeInput.value.trim()
                    : "";

            const institution =
                institutionInput
                    ? institutionInput.value.trim()
                    : "";

            const department =
                departmentInput
                    ? departmentInput.value.trim()
                    : "";

            const year =
                yearInput
                    ? yearInput.value
                    : "";

            const cgpa =
                cgpaInput
                    ? cgpaInput.value.trim()
                    : "";


            // ------------------------------------------
            // Required fields
            // ------------------------------------------

            if (
                !degree ||
                !institution ||
                !department ||
                !year ||
                !cgpa
            ) {

                showMessage(
                    "Please fill in all fields.",
                    "error"
                );

                return;
            }


            // ------------------------------------------
            // CGPA validation
            // ------------------------------------------

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


            // ------------------------------------------
            // Get existing education
            // ------------------------------------------

            let educationData =
                JSON.parse(
                    localStorage.getItem(
                        "studentEducation"
                    )
                ) || [];


            // ------------------------------------------
            // Create education record
            // ------------------------------------------

            const education = {

                id:
                    Date.now(),

                degree:
                    degree,

                institution:
                    institution,

                department:
                    department,

                year:
                    year,

                cgpa:
                    cgpa

            };


            // ------------------------------------------
            // Add education
            // ------------------------------------------

            educationData.push(
                education
            );


            // ------------------------------------------
            // Save to localStorage
            // ------------------------------------------

            localStorage.setItem(
                "studentEducation",
                JSON.stringify(educationData)
            );


            console.log(
                "Education saved:",
                education
            );


            // ------------------------------------------
            // Reset form
            // ------------------------------------------

            educationForm.reset();


            // ------------------------------------------
            // Refresh education list
            // ------------------------------------------

            displayEducation(
                educationData
            );


            showMessage(
                "Education added successfully.",
                "success"
            );

        }
    );


    // ==================================================
    // DISPLAY EDUCATION
    // ==================================================

    function loadEducation() {

        const savedEducation =
            localStorage.getItem(
                "studentEducation"
            );


        if (!savedEducation) {

            displayEducation([]);

            return;
        }


        try {

            const educationData =
                JSON.parse(
                    savedEducation
                );


            displayEducation(
                educationData
            );

        } catch (error) {

            console.error(
                "Error loading education:",
                error
            );

            displayEducation([]);

        }

    }


    function displayEducation(
        educationData
    ) {

        if (!educationList) {
            return;
        }


        educationList.innerHTML = "";


        // No education records

        if (
            educationData.length === 0
        ) {

            educationList.innerHTML = `
                <p class="no-data">
                    No education details added yet.
                </p>
            `;

            return;
        }


        // Display records

        educationData.forEach(
            (education) => {

                const educationCard =
                    document.createElement("div");

                educationCard.className =
                    "education-item";


                educationCard.innerHTML = `

                    <div class="education-details">

                        <h3>
                            ${escapeHTML(
                                education.degree
                            )}
                        </h3>

                        <p>
                            <strong>
                                Institution:
                            </strong>

                            ${escapeHTML(
                                education.institution
                            )}
                        </p>

                        <p>
                            <strong>
                                Department:
                            </strong>

                            ${escapeHTML(
                                education.department
                            )}
                        </p>

                        <p>
                            <strong>
                                Year:
                            </strong>

                            ${escapeHTML(
                                education.year
                            )}
                        </p>

                        <p>
                            <strong>
                                CGPA:
                            </strong>

                            ${escapeHTML(
                                education.cgpa
                            )}
                        </p>

                    </div>


                    <button
                        type="button"
                        class="btn btn-danger delete-education"
                        data-id="${education.id}">
                        Delete
                    </button>

                `;


                educationList.appendChild(
                    educationCard
                );

            }
        );


        // ------------------------------------------
        // Delete buttons
        // ------------------------------------------

        const deleteButtons =
            document.querySelectorAll(
                ".delete-education"
            );


        deleteButtons.forEach(
            (button) => {

                button.addEventListener(
                    "click",
                    function () {

                        const id =
                            Number(
                                this.dataset.id
                            );


                        deleteEducation(id);

                    }
                );

            }
        );

    }


    // ==================================================
    // DELETE EDUCATION
    // ==================================================

    function deleteEducation(id) {

        let educationData =
            JSON.parse(
                localStorage.getItem(
                    "studentEducation"
                )
            ) || [];


        educationData =
            educationData.filter(
                (education) =>
                    education.id !== id
            );


        localStorage.setItem(
            "studentEducation",
            JSON.stringify(
                educationData
            )
        );


        displayEducation(
            educationData
        );


        showMessage(
            "Education deleted.",
            "success"
        );

    }


    // ==================================================
    // MESSAGE FUNCTION
    // ==================================================

    function showMessage(
        text,
        type
    ) {

        if (!educationMessage) {
            return;
        }


        educationMessage.textContent =
            text;


        educationMessage.className =
            "message " + type;

    }


    // ==================================================
    // HTML SAFETY
    // ==================================================

    function escapeHTML(value) {

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }

});