console.log("certifications.js loaded");

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // ELEMENTS
    // ==========================================

    const certificationList =
        document.getElementById("certificationList");

    const addCertificationBtn =
        document.getElementById("addCertificationBtn");

    const saveCertificationsBtn =
        document.getElementById("saveCertificationsBtn");

    const certificationMessage =
        document.getElementById("certificationMessage");


    // ==========================================
    // CONSTANTS
    // ==========================================

    const MAX_FILE_SIZE =
        5 * 1024 * 1024;


    // ==========================================
    // ADD CERTIFICATION
    // ==========================================

    function addCertification() {

        const certificationCard =
            document.createElement("div");

        certificationCard.className = "card";

        certificationCard.style.marginTop =
            "1.5rem";


        certificationCard.innerHTML = `

            <h3>Certification</h3>


            <!-- Certification Name -->

            <div class="form-group">

                <label>
                    Certification Name
                </label>

                <input
                    type="text"
                    class="certificationName"
                    placeholder="e.g. Python Programming"
                    required
                >

            </div>


            <!-- Issuing Organization -->

            <div class="form-group">

                <label>
                    Issuing Organization
                </label>

                <input
                    type="text"
                    class="issuingOrganization"
                    placeholder="e.g. Coursera, Udemy, AWS"
                    required
                >

            </div>


            <!-- Issue Date -->

            <div class="form-group">

                <label>
                    Issue Date
                </label>

                <input
                    type="date"
                    class="issueDate"
                    required
                >

            </div>


            <!-- Expiry Date -->

            <div class="form-group">

                <label>
                    Expiry Date
                </label>

                <input
                    type="date"
                    class="expiryDate"
                >

                <small
                    style="
                        display: block;
                        margin-top: 0.4rem;
                        color: var(--text-muted);
                    "
                >
                    Leave empty if the certification does not expire.
                </small>

            </div>


            <!-- Credential ID -->

            <div class="form-group">

                <label>
                    Credential ID
                </label>

                <input
                    type="text"
                    class="credentialId"
                    placeholder="e.g. ABC12345"
                >

            </div>


            <!-- Credential URL -->

            <div class="form-group">

                <label>
                    Credential URL
                </label>

                <input
                    type="url"
                    class="credentialUrl"
                    placeholder="https://example.com/verify"
                >

            </div>


            <!-- Certificate File -->

            <div class="form-group">

                <label>
                    Certificate File
                </label>

                <input
                    type="file"
                    class="certificateFile"
                    accept=".pdf,.jpg,.jpeg,.png"
                >

                <small
                    style="
                        display: block;
                        margin-top: 0.4rem;
                        color: var(--text-muted);
                    "
                >
                    PDF, JPG, JPEG or PNG.
                    Maximum 5 MB.
                </small>

            </div>


            <!-- Remove -->

            <button
                type="button"
                class="btn btn-secondary removeCertificationBtn"
            >
                Remove Certification
            </button>

        `;


        certificationList.appendChild(
            certificationCard
        );


        // ==========================================
        // REMOVE CERTIFICATION
        // ==========================================

        const removeButton =
            certificationCard.querySelector(
                ".removeCertificationBtn"
            );


        removeButton.addEventListener(
            "click",
            () => {

                certificationCard.remove();

            }
        );


        // ==========================================
        // CERTIFICATE FILE VALIDATION
        // ==========================================

        const certificateFile =
            certificationCard.querySelector(
                ".certificateFile"
            );


        certificateFile.addEventListener(
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
                        "Certificate must be PDF, JPG or PNG.",
                        "error"
                    );

                    this.value = "";

                    return;
                }


                // Check file size

                if (
                    file.size > MAX_FILE_SIZE
                ) {

                    showMessage(
                        "Certificate file must be smaller than 5 MB.",
                        "error"
                    );

                    this.value = "";

                    return;
                }


                showMessage(
                    "Certificate file selected successfully.",
                    "success"
                );

            }
        );

    }


    // ==========================================
    // ADD FIRST CERTIFICATION
    // ==========================================

    addCertification();


    // ==========================================
    // ADD ANOTHER CERTIFICATION
    // ==========================================

    addCertificationBtn.addEventListener(
        "click",
        addCertification
    );


    // ==========================================
    // SAVE CERTIFICATIONS
    // ==========================================

    saveCertificationsBtn.addEventListener(
        "click",
        function () {

            const certifications =
                document.querySelectorAll(
                    "#certificationList > .card"
                );


            if (
                certifications.length === 0
            ) {

                showMessage(
                    "Please add at least one certification.",
                    "error"
                );

                return;
            }


            const certificationData = [];


            // ======================================
            // READ EACH CERTIFICATION
            // ======================================

            for (
                let i = 0;
                i < certifications.length;
                i++
            ) {

                const card =
                    certifications[i];


                const name =
                    card.querySelector(
                        ".certificationName"
                    ).value.trim();


                const organization =
                    card.querySelector(
                        ".issuingOrganization"
                    ).value.trim();


                const issueDate =
                    card.querySelector(
                        ".issueDate"
                    ).value;


                const expiryDate =
                    card.querySelector(
                        ".expiryDate"
                    ).value;


                const credentialId =
                    card.querySelector(
                        ".credentialId"
                    ).value.trim();


                const credentialUrl =
                    card.querySelector(
                        ".credentialUrl"
                    ).value.trim();


                const certificateFile =
                    card.querySelector(
                        ".certificateFile"
                    ).files[0];


                // ==================================
                // REQUIRED FIELD VALIDATION
                // ==================================

                if (
                    !name ||
                    !organization ||
                    !issueDate
                ) {

                    showMessage(
                        "Please fill in the required certification fields.",
                        "error"
                    );

                    return;
                }


                // ==================================
                // EXPIRY DATE VALIDATION
                // ==================================

                if (
                    expiryDate &&
                    expiryDate < issueDate
                ) {

                    showMessage(
                        "Expiry date cannot be before the issue date.",
                        "error"
                    );

                    return;
                }


                // ==================================
                // URL VALIDATION
                // ==================================

                if (credentialUrl) {

                    try {

                        new URL(
                            credentialUrl
                        );

                    } catch (error) {

                        showMessage(
                            "Please enter a valid credential URL.",
                            "error"
                        );

                        return;
                    }

                }


                // ==================================
                // ADD DATA
                // ==================================

                certificationData.push({

                    name:
                        name,

                    issuingOrganization:
                        organization,

                    issueDate:
                        issueDate,

                    expiryDate:
                        expiryDate || null,

                    credentialId:
                        credentialId || null,

                    credentialUrl:
                        credentialUrl || null,

                    certificateFile:
                        certificateFile
                            ? certificateFile.name
                            : null

                });

            }


            // ==========================================
            // TEMPORARY FRONTEND SAVE
            // ==========================================

            localStorage.setItem(
                "studentCertifications",
                JSON.stringify(
                    certificationData
                )
            );


            console.log(
                "Certification data:",
                certificationData
            );


            showMessage(
                "Certifications saved successfully.",
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

        certificationMessage.textContent =
            text;

        certificationMessage.className =
            "message " + type;

    }

});