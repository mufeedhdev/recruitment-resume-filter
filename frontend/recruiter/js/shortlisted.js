document.addEventListener("DOMContentLoaded", function () {

    // Check login

    if (
        localStorage.getItem("recruiterLoggedIn")
        !== "true"
    ) {

        window.location.href = "login.html";

        return;
    }


    const students = getStudents();


    const shortlistedIds =
        JSON.parse(
            localStorage.getItem(
                "shortlistedStudents"
            ) || "[]"
        );


    const result =
        document.getElementById(
            "shortlistedResults"
        );


    // Logout

    document.getElementById(
        "logoutBtn"
    ).addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            localStorage.removeItem(
                "recruiterLoggedIn"
            );

            window.location.href =
                "login.html";
        }
    );


    const shortlisted =
        students.filter(
            function (student) {

                return shortlistedIds.includes(
                    student.id
                );

            }
        );


    if (shortlisted.length === 0) {

        result.innerHTML = `
            <div class="empty">
                No students shortlisted yet.
            </div>
        `;

        return;
    }


    shortlisted.forEach(
        function (student) {

            const card =
                document.createElement("div");

            card.className =
                "student-card";


            card.innerHTML = `

                <h2>
                    ${student.name}
                </h2>

                <p>
                    <b>Register ID:</b>
                    ${student.id}
                </p>

                <p>
                    <b>Department:</b>
                    ${student.department}
                </p>

                <p>
                    <b>CGPA:</b>
                    ${student.cgpa}
                </p>

                <p>
                    <b>Skills:</b>
                    ${student.skills.join(", ")}
                </p>

                <div class="card-actions">

                    <a
                        href="student-profile.html?id=${student.id}"
                        class="secondary-btn">

                        View Profile

                    </a>

                    <button
                        class="danger-btn remove-btn"
                        data-id="${student.id}">

                        Remove

                    </button>

                </div>
            `;


            result.appendChild(card);

        }
    );


    // Remove shortlisted student

    document.querySelectorAll(
        ".remove-btn"
    ).forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const id =
                        this.dataset.id;


                    const updated =
                        shortlistedIds.filter(
                            function (item) {

                                return item !== id;

                            }
                        );


                    localStorage.setItem(
                        "shortlistedStudents",
                        JSON.stringify(updated)
                    );


                    alert(
                        "Student removed from shortlist."
                    );


                    location.reload();

                }
            );

        }
    );

});



function getStudents() {

    return [

        {
            id: "STU001",
            name: "Arun Kumar",
            department: "CSC",
            email: "arun@example.com",
            phone: "9876543210",
            skills: [
                "Java",
                "Python",
                "Communication"
            ],
            cgpa: "8.7",
            activities:
                "Coding Club, Hackathon"
        },


        {
            id: "STU002",
            name: "Divya Sri",
            department: "ECE",
            email: "divya@example.com",
            phone: "9876543211",
            skills: [
                "JavaScript",
                "HTML",
                "Communication"
            ],
            cgpa: "9.1",
            activities:
                "Technical Symposium"
        },


        {
            id: "STU003",
            name: "Karthik Raj",
            department: "Maths",
            email: "karthik@example.com",
            phone: "9876543212",
            skills: [
                "Python",
                "Data Analysis",
                "Leadership"
            ],
            cgpa: "8.4",
            activities:
                "Maths Club, NSS"
        },


        {
            id: "STU004",
            name: "Meena Priya",
            department: "Accounts",
            email: "meena@example.com",
            phone: "9876543213",
            skills: [
                "Excel",
                "Accounting",
                "Communication"
            ],
            cgpa: "8.9",
            activities:
                "Commerce Club"
        },


        {
            id: "STU005",
            name: "Rahul S",
            department: "CSC",
            email: "rahul@example.com",
            phone: "9876543214",
            skills: [
                "C++",
                "SQL",
                "Problem Solving"
            ],
            cgpa: "8.2",
            activities:
                "Coding Club"
        }

    ];

}