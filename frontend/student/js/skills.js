console.log("skills.js loaded");

document.addEventListener("DOMContentLoaded", () => {

    const skillsForm =
        document.getElementById("skillsForm");

    const skillsList =
        document.getElementById("skillsList");

    const skillsMessage =
        document.getElementById("skillsMessage");


    if (!skillsForm) {
        return;
    }


    // ==================================================
    // INPUT ELEMENTS
    // ==================================================

    const technicalSkillsInput =
        document.getElementById("technicalSkills");

    const professionalSkillsInput =
        document.getElementById("professionalSkills");


    // ==================================================
    // LOAD SAVED SKILLS
    // ==================================================

    loadSkills();


    // ==================================================
    // FORM SUBMIT
    // ==================================================

    skillsForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const technicalSkills =
                technicalSkillsInput
                    ? technicalSkillsInput.value.trim()
                    : "";

            const professionalSkills =
                professionalSkillsInput
                    ? professionalSkillsInput.value.trim()
                    : "";


            // ------------------------------------------
            // Validation
            // ------------------------------------------

            if (
                !technicalSkills &&
                !professionalSkills
            ) {

                showMessage(
                    "Please enter at least one skill.",
                    "error"
                );

                return;
            }


            // ------------------------------------------
            // Get existing skills
            // ------------------------------------------

            let skillsData =
                JSON.parse(
                    localStorage.getItem(
                        "studentSkills"
                    )
                ) || [];


            // ------------------------------------------
            // Create skill record
            // ------------------------------------------

            const skill = {

                id:
                    Date.now(),

                technicalSkills:
                    technicalSkills,

                professionalSkills:
                    professionalSkills

            };


            // ------------------------------------------
            // Add skill record
            // ------------------------------------------

            skillsData.push(skill);


            // ------------------------------------------
            // Save
            // ------------------------------------------

            localStorage.setItem(
                "studentSkills",
                JSON.stringify(skillsData)
            );


            console.log(
                "Skills saved:",
                skill
            );


            // ------------------------------------------
            // Reset form
            // ------------------------------------------

            skillsForm.reset();


            // ------------------------------------------
            // Refresh list
            // ------------------------------------------

            displaySkills(
                skillsData
            );


            showMessage(
                "Skills added successfully.",
                "success"
            );

        }
    );


    // ==================================================
    // LOAD SKILLS
    // ==================================================

    function loadSkills() {

        const savedSkills =
            localStorage.getItem(
                "studentSkills"
            );


        if (!savedSkills) {

            displaySkills([]);

            return;
        }


        try {

            const skillsData =
                JSON.parse(
                    savedSkills
                );


            displaySkills(
                skillsData
            );

        } catch (error) {

            console.error(
                "Error loading skills:",
                error
            );

            displaySkills([]);

        }

    }


    // ==================================================
    // DISPLAY SKILLS
    // ==================================================

    function displaySkills(
        skillsData
    ) {

        if (!skillsList) {
            return;
        }


        skillsList.innerHTML = "";


        // No skills

        if (
            skillsData.length === 0
        ) {

            skillsList.innerHTML = `
                <p class="no-data">
                    No skills added yet.
                </p>
            `;

            return;
        }


        // Display each skill record

        skillsData.forEach(
            (skill) => {

                const skillCard =
                    document.createElement("div");

                skillCard.className =
                    "skill-item";


                skillCard.innerHTML = `

                    <div class="skill-details">

                        ${
                            skill.technicalSkills
                            ? `
                                <div class="skill-group">

                                    <h3>
                                        Technical Skills
                                    </h3>

                                    <p>
                                        ${escapeHTML(
                                            skill.technicalSkills
                                        )}
                                    </p>

                                </div>
                            `
                            : ""
                        }


                        ${
                            skill.professionalSkills
                            ? `
                                <div class="skill-group">

                                    <h3>
                                        Professional / Soft Skills
                                    </h3>

                                    <p>
                                        ${escapeHTML(
                                            skill.professionalSkills
                                        )}
                                    </p>

                                </div>
                            `
                            : ""
                        }

                    </div>


                    <button
                        type="button"
                        class="btn btn-danger delete-skill"
                        data-id="${skill.id}">
                        Delete
                    </button>

                `;


                skillsList.appendChild(
                    skillCard
                );

            }
        );


        // ==================================================
        // DELETE BUTTONS
        // ==================================================

        const deleteButtons =
            document.querySelectorAll(
                ".delete-skill"
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


                        deleteSkill(id);

                    }
                );

            }
        );

    }


    // ==================================================
    // DELETE SKILL
    // ==================================================

    function deleteSkill(id) {

        let skillsData =
            JSON.parse(
                localStorage.getItem(
                    "studentSkills"
                )
            ) || [];


        skillsData =
            skillsData.filter(
                (skill) =>
                    skill.id !== id
            );


        localStorage.setItem(
            "studentSkills",
            JSON.stringify(
                skillsData
            )
        );


        displaySkills(
            skillsData
        );


        showMessage(
            "Skill deleted.",
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

        if (!skillsMessage) {
            return;
        }


        skillsMessage.textContent =
            text;


        skillsMessage.className =
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