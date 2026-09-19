document.addEventListener("DOMContentLoaded", function () {

    // Check login

    if (
        localStorage.getItem("recruiterLoggedIn")
        !== "true"
    ) {

        window.location.href =
            "login.html";

        return;
    }


    const params =
        new URLSearchParams(
            window.location.search
        );


    const studentId =
        params.get("id");


    const students =
        getStudents();


    const student =
        students.find(
            function (item) {

                return item.id === studentId;

            }
        );


    const profile =
        document.getElementById(
            "profile"
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


    if (!student) {

        profile.innerHTML = `

            <h2>
                Student not found
            </h2>

            <p>
                Please go back to Search Students.
            </p>

        `;

        return;
    }


    profile.innerHTML = `

        <div class="profile-header">

            <div class="avatar">

                ${student.name.charAt(0)}

            </div>


            <div>

                <h1>
                    ${student.name}
                </h1>

                <p>
                    ${student.id}
                    |
                    ${student.department}
                </p>

            </div>

        </div>



        <div class="profile-grid">


            <div class="profile-item">

                <span>
                    Register ID
                </span>

                <strong>
                    ${student.id}
                </strong>

            </div>



            <div class="profile-item">

                <span>
                    Department
                </span>

                <strong>
                    ${student.department}
                </strong>

            </div>



            <div class="profile-item">

                <span>
                    Email
                </span>

                <strong>
                    ${student.email}
                </strong>

            </div>



            <div class="profile-item">

                <span>
                    Phone
                </span>

                <strong>
                    ${student.phone}
                </strong>

            </div>



            <div class="profile-item">

                <span>
                    CGPA
                </span>

                <strong>
                    ${student.cgpa}
                </strong>

            </div>



            <div class="profile-item">

                <span>
                    Skills
                </span>

                <strong>
                    ${student.skills.join(", ")}
                </strong>

            </div>



            <div class="profile-item">

                <span>
                    Activities
                </span>

                <strong>
                    ${student.activities}
                </strong>

            </div>


        </div>

    `;

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