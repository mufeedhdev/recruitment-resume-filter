console.log("dashboard.js loaded");

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // ELEMENTS
    // ==========================================

    const welcomeHeading =
        document.querySelector(".dashboard-header h1");

    const completionScore =
        document.querySelector(".completion-score strong");


    // ==========================================
    // LOAD STUDENT INFORMATION
    // ==========================================

    loadStudentName();


    // ==========================================
    // CALCULATE PROFILE COMPLETION
    // ==========================================

    calculateProfileCompletion();



    // ==========================================
    // LOAD STUDENT NAME
    // ==========================================

    function loadStudentName() {

        if (!welcomeHeading) {
            return;
        }


        const savedStudent =
            localStorage.getItem("studentData");


        if (!savedStudent) {

            welcomeHeading.textContent =
                "Welcome back, Student";

            return;
        }


        try {

            const studentData =
                JSON.parse(savedStudent);


            if (studentData.fullName) {

                welcomeHeading.textContent =
                    "Welcome back, " +
                    studentData.fullName;

            }

        } catch (error) {

            console.error(
                "Error loading student data:",
                error
            );

        }

    }



    // ==========================================
    // PROFILE COMPLETION
    // ==========================================

    function calculateProfileCompletion() {

        if (!completionScore) {
            return;
        }


        let completedSections = 0;


        const totalSections = 8;


        // --------------------------------------
        // Profile
        // --------------------------------------

        if (
            localStorage.getItem(
                "studentProfile"
            )
        ) {

            completedSections++;

        }


        // --------------------------------------
        // Education
        // --------------------------------------

        if (
            localStorage.getItem(
                "studentEducation"
            )
        ) {

            completedSections++;

        }


        // --------------------------------------
        // Skills
        // --------------------------------------

        if (
            localStorage.getItem(
                "studentSkills"
            )
        ) {

            completedSections++;

        }


        // --------------------------------------
        // Resume
        // --------------------------------------

        if (
            localStorage.getItem(
                "studentResume"
            )
        ) {

            completedSections++;

        }


        // --------------------------------------
        // Certifications
        // --------------------------------------

        if (
            localStorage.getItem(
                "studentCertifications"
            )
        ) {

            completedSections++;

        }


        // --------------------------------------
        // Achievements
        // --------------------------------------

        if (
            localStorage.getItem(
                "studentAchievements"
            )
        ) {

            completedSections++;

        }


        // --------------------------------------
        // Events
        // --------------------------------------

        if (
            localStorage.getItem(
                "studentEvents"
            )
        ) {

            completedSections++;

        }


        // --------------------------------------
        // Workshops
        // --------------------------------------

        if (
            localStorage.getItem(
                "studentWorkshops"
            )
        ) {

            completedSections++;

        }


        // ======================================
        // CALCULATE PERCENTAGE
        // ======================================

        const percentage =
            Math.round(
                (
                    completedSections /
                    totalSections
                ) * 100
            );


        completionScore.textContent =
            percentage + "%";


        console.log(
            "Profile completion:",
            percentage + "%"
        );

    }

});