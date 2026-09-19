console.log("resume.js loaded");


document.addEventListener(
    "DOMContentLoaded",
    () => {


        // ==========================================
        // ELEMENTS
        // ==========================================

        const resumeForm =
            document.getElementById("resumeForm");


        const resumeFile =
            document.getElementById("resumeFile");


        const resumeInfo =
            document.getElementById("resumeInfo");


        const resumeFileName =
            document.getElementById("resumeFileName");


        const resumeFileSize =
            document.getElementById("resumeFileSize");


        const removeResumeBtn =
            document.getElementById(
                "removeResumeBtn"
            );


        const resumeMessage =
            document.getElementById(
                "resumeMessage"
            );



        // ==========================================
        // MAXIMUM FILE SIZE
        // ==========================================

        const MAX_FILE_SIZE =
            5 * 1024 * 1024;



        // ==========================================
        // FILE SELECTION
        // ==========================================

        resumeFile.addEventListener(
            "change",
            function () {


                const file =
                    this.files[0];


                // No file selected

                if (!file) {

                    hideResumeInfo();

                    return;

                }



                // ======================================
                // CHECK FILE TYPE
                // ======================================

                if (
                    file.type !==
                        "application/pdf"
                    &&
                    !file.name
                        .toLowerCase()
                        .endsWith(".pdf")
                ) {


                    showMessage(
                        "Please upload a PDF file only.",
                        "error"
                    );


                    this.value = "";


                    hideResumeInfo();


                    return;

                }



                // ======================================
                // CHECK FILE SIZE
                // ======================================

                if (
                    file.size > MAX_FILE_SIZE
                ) {


                    showMessage(
                        "Resume must be smaller than 5 MB.",
                        "error"
                    );


                    this.value = "";


                    hideResumeInfo();


                    return;

                }



                // ======================================
                // SHOW FILE INFORMATION
                // ======================================

                resumeFileName.textContent =
                    file.name;


                resumeFileSize.textContent =
                    "Size: " +
                    formatFileSize(
                        file.size
                    );


                resumeInfo.style.display =
                    "block";


                removeResumeBtn.style.display =
                    "inline-block";


                resumeMessage.textContent = "";


            }
        );



        // ==========================================
        // SAVE RESUME
        // ==========================================

        resumeForm.addEventListener(
            "submit",
            function (event) {


                event.preventDefault();


                const file =
                    resumeFile.files[0];



                // No file

                if (!file) {


                    showMessage(
                        "Please select your resume.",
                        "error"
                    );


                    return;

                }



                // ======================================
                // CHECK PDF AGAIN
                // ======================================

                if (
                    file.type !==
                        "application/pdf"
                    &&
                    !file.name
                        .toLowerCase()
                        .endsWith(".pdf")
                ) {


                    showMessage(
                        "Only PDF resumes are allowed.",
                        "error"
                    );


                    return;

                }



                // ======================================
                // CHECK SIZE AGAIN
                // ======================================

                if (
                    file.size > MAX_FILE_SIZE
                ) {


                    showMessage(
                        "Resume must be smaller than 5 MB.",
                        "error"
                    );


                    return;

                }



                // ======================================
                // TEMPORARY FRONTEND SAVE
                // ======================================

                console.log(
                    "Resume selected:",
                    file
                );



                showMessage(
                    "Resume saved successfully.",
                    "success"
                );


            }
        );



        // ==========================================
        // REMOVE RESUME
        // ==========================================

        removeResumeBtn.addEventListener(
            "click",
            function () {


                const confirmRemove =
                    confirm(
                        "Are you sure you want to remove your resume?"
                    );


                if (!confirmRemove) {

                    return;

                }



                // Clear selected file

                resumeFile.value = "";



                // Hide information

                resumeInfo.style.display =
                    "none";



                // Hide remove button

                removeResumeBtn.style.display =
                    "none";



                // Clear filename

                resumeFileName.textContent =
                    "";



                resumeFileSize.textContent =
                    "";



                // Show message

                showMessage(
                    "Resume removed.",
                    "success"
                );


            }
        );



        // ==========================================
        // HIDE RESUME INFORMATION
        // ==========================================

        function hideResumeInfo() {


            resumeInfo.style.display =
                "none";


            removeResumeBtn.style.display =
                "none";


            resumeFileName.textContent =
                "";


            resumeFileSize.textContent =
                "";


        }



        // ==========================================
        // FORMAT FILE SIZE
        // ==========================================

        function formatFileSize(bytes) {


            if (bytes < 1024) {

                return (
                    bytes +
                    " bytes"
                );

            }


            if (
                bytes <
                1024 * 1024
            ) {

                return (
                    (bytes / 1024)
                        .toFixed(1)
                    +
                    " KB"
                );

            }


            return (
                (bytes /
                    (1024 * 1024)
                ).toFixed(2)
                +
                " MB"
            );

        }



        // ==========================================
        // MESSAGE
        // ==========================================

        function showMessage(
            text,
            type
        ) {


            resumeMessage.textContent =
                text;


            resumeMessage.className =
                "message " + type;


        }


    }
);