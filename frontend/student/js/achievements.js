console.log("achievements.js loaded");

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // ELEMENTS
    // ==========================================

    const achievementList =
        document.getElementById("achievementList");

    const addAchievementBtn =
        document.getElementById("addAchievementBtn");

    const saveAchievementsBtn =
        document.getElementById("saveAchievementsBtn");

    const achievementMessage =
        document.getElementById("achievementMessage");


    // ==========================================
    // ADD ACHIEVEMENT
    // ==========================================

    function addAchievement() {

        const achievementCard =
            document.createElement("div");

        achievementCard.className = "card";

        achievementCard.style.marginTop =
            "1.5rem";


        achievementCard.innerHTML = `

            <h3>Achievement</h3>


            <!-- Achievement Title -->

            <div class="form-group">

                <label>
                    Achievement Title
                </label>

                <input
                    type="text"
                    class="achievementTitle"
                    placeholder="e.g. First Prize in Coding Competition"
                    required
                >

            </div>


            <!-- Achievement Type -->

            <div class="form-group">

                <label>
                    Achievement Type
                </label>

                <select
                    class="achievementType"
                    required
                >

                    <option value="">
                        Select Type
                    </option>

                    <option value="Academic">
                        Academic
                    </option>

                    <option value="Competition">
                        Competition
                    </option>

                    <option value="Sports">
                        Sports
                    </option>

                    <option value="Leadership">
                        Leadership
                    </option>

                    <option value="Research">
                        Research
                    </option>

                    <option value="Other">
                        Other
                    </option>

                </select>

            </div>


            <!-- Organization -->

            <div class="form-group">

                <label>
                    Organization / Institution
                </label>

                <input
                    type="text"
                    class="achievementOrganization"
                    placeholder="e.g. SASTRA University"
                    required
                >

            </div>


            <!-- Date -->

            <div class="form-group">

                <label>
                    Date
                </label>

                <input
                    type="date"
                    class="achievementDate"
                    required
                >

            </div>


            <!-- Description -->

            <div class="form-group">

                <label>
                    Description
                </label>

                <textarea
                    class="achievementDescription"
                    rows="4"
                    placeholder="Describe your achievement..."
                ></textarea>

            </div>


            <!-- Certificate / Proof -->

            <div class="form-group">

                <label>
                    Proof / Certificate
                </label>

                <input
                    type="file"
                    class="achievementFile"
                    accept=".pdf,.jpg,.jpeg,.png"
                >

                <small
                    style="
                        display: block;
                        margin-top: 0.4rem;
                        color: var(--text-muted);
                    ">
                    PDF, JPG, JPEG or PNG.
                    Maximum 5 MB.
                </small>

            </div>


            <!-- Remove -->

            <button
                type="button"
                class="btn btn-secondary removeAchievementBtn">
                Remove Achievement
            </button>

        `;


        achievementList.appendChild(
            achievementCard
        );


        // ==========================================
        // REMOVE ACHIEVEMENT
        // ==========================================

        const removeButton =
            achievementCard.querySelector(
                ".removeAchievementBtn"
            );


        removeButton.addEventListener(
            "click",
            () => {

                achievementCard.remove();

            }
        );


        // ==========================================
        // FILE VALIDATION
        // ==========================================

        const achievementFile =
            achievementCard.querySelector(
                ".achievementFile"
            );


        achievementFile.addEventListener(
            "change",
            function () {

                const file =
                    this.files[0];


                if (!file) {
                    return;
                }


                const allowedTypes = [
                    "application/pdf",
                    "image/jpeg",
                    "image/png"
                ];


                // Check file type

                if (
                    !allowedTypes.includes(
                        file.type
                    )
                ) {

                    showMessage(
                        "Proof file must be PDF, JPG or PNG.",
                        "error"
                    );

                    this.value = "";

                    return;
                }


                // Check file size

                const maxFileSize =
                    5 * 1024 * 1024;


                if (
                    file.size > maxFileSize
                ) {

                    showMessage(
                        "Proof file must be smaller than 5 MB.",
                        "error"
                    );

                    this.value = "";

                    return;
                }


                showMessage(
                    "Proof file selected successfully.",
                    "success"
                );

            }
        );

    }


    // ==========================================
    // ADD FIRST ACHIEVEMENT
    // ==========================================

    addAchievement();


    // ==========================================
    // ADD ANOTHER ACHIEVEMENT
    // ==========================================

    addAchievementBtn.addEventListener(
        "click",
        addAchievement
    );


    // ==========================================
    // SAVE ACHIEVEMENTS
    // ==========================================

    saveAchievementsBtn.addEventListener(
        "click",
        function () {

            const achievements =
                document.querySelectorAll(
                    "#achievementList > .card"
                );


            if (
                achievements.length === 0
            ) {

                showMessage(
                    "Please add at least one achievement.",
                    "error"
                );

                return;
            }


            const achievementData = [];


            // ======================================
            // READ EACH ACHIEVEMENT
            // ======================================

            for (
                let i = 0;
                i < achievements.length;
                i++
            ) {

                const card =
                    achievements[i];


                const title =
                    card.querySelector(
                        ".achievementTitle"
                    ).value.trim();


                const type =
                    card.querySelector(
                        ".achievementType"
                    ).value;


                const organization =
                    card.querySelector(
                        ".achievementOrganization"
                    ).value.trim();


                const date =
                    card.querySelector(
                        ".achievementDate"
                    ).value;


                const description =
                    card.querySelector(
                        ".achievementDescription"
                    ).value.trim();


                const file =
                    card.querySelector(
                        ".achievementFile"
                    ).files[0];


                // ==================================
                // REQUIRED FIELD VALIDATION
                // ==================================

                if (
                    !title ||
                    !type ||
                    !organization ||
                    !date
                ) {

                    showMessage(
                        "Please fill in all required achievement fields.",
                        "error"
                    );

                    return;
                }


                // ==================================
                // SAVE DATA
                // ==================================

                achievementData.push({

                    title:
                        title,

                    type:
                        type,

                    organization:
                        organization,

                    date:
                        date,

                    description:
                        description || null,

                    proofFile:
                        file
                            ? file.name
                            : null

                });

            }


            // ==========================================
            // TEMPORARY FRONTEND STORAGE
            // ==========================================

            localStorage.setItem(
                "studentAchievements",
                JSON.stringify(
                    achievementData
                )
            );


            console.log(
                "Achievement data:",
                achievementData
            );


            showMessage(
                "Achievements saved successfully.",
                "success"
            );

        }
    );


    // ==========================================
    // MESSAGE
    // ==========================================

    function showMessage(
        text,
        type
    ) {

        achievementMessage.textContent =
            text;

        achievementMessage.className =
            "message " + type;

    }

});