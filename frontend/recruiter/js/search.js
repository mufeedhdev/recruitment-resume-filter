document.addEventListener("DOMContentLoaded", function () {


    if (
        localStorage.getItem(
            "recruiterLoggedIn"
        ) !== "true"
    ) {

        window.location.href =
            "login.html";

        return;
    }



    const students = getStudents();


    const nameFilter =
        document.getElementById(
            "nameFilter"
        );


    const departmentFilter =
        document.getElementById(
            "departmentFilter"
        );


    const skillFilter =
        document.getElementById(
            "skillFilter"
        );


    const results =
        document.getElementById(
            "studentResults"
        );


    function searchStudents() {


        const name =
            nameFilter.value
                .trim()
                .toLowerCase();


        const department =
            departmentFilter.value;


        const skill =
            skillFilter.value
                .trim()
                .toLowerCase();



        const filtered =
            students.filter(
                function (student) {


                    const nameMatch =
                        student.name
                            .toLowerCase()
                            .includes(name);


                    const departmentMatch =
                        department === "" ||
                        student.department ===
                            department;


                    const skillMatch =
                        skill === "" ||
                        student.skills.some(
                            function (item) {

                                return item
                                    .toLowerCase()
                                    .includes(skill);

                            }
                        );


                    return (
                        nameMatch &&
                        departmentMatch &&
                        skillMatch
                    );

                }
            );



        document.getElementById(
            "resultCount"
        ).innerText =
            filtered.length +
            " student(s) found.";



        results.innerHTML = "";



        filtered.forEach(
            function (student) {


                const card =
                    document.createElement(
                        "div"
                    );


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
                            class="primary-btn shortlist-btn"
                            data-id="${student.id}">

                            Shortlist

                        </button>

                    </div>

                `;


                results.appendChild(card);

            }
        );



        document.querySelectorAll(
            ".shortlist-btn"
        ).forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        shortlistStudent(
                            this.dataset.id
                        );

                    }
                );

            }
        );

    }



    document.getElementById(
        "searchBtn"
    ).addEventListener(
        "click",
        searchStudents
    );


    nameFilter.addEventListener(
        "input",
        searchStudents
    );


    departmentFilter.addEventListener(
        "change",
        searchStudents
    );


    skillFilter.addEventListener(
        "input",
        searchStudents
    );



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


    searchStudents();

});



function shortlistStudent(id) {


    const list =
        JSON.parse(
            localStorage.getItem(
                "shortlistedStudents"
            ) || "[]"
        );


    if (!list.includes(id)) {

        list.push(id);


        localStorage.setItem(
            "shortlistedStudents",
            JSON.stringify(list)
        );


        alert(
            "Student shortlisted successfully!"
        );

    }

    else {

        alert(
            "Student is already shortlisted."
        );

    }

}



function getStudents() {

    return [

        {
            id: "STU001",
            name: "Arun Kumar",
            department: "CSC",
            email: "arun@example.com",
            phone: "9876543210",
            skills: ["Java", "Python", "Communication"],
            cgpa: "8.7",
            activities: "Coding Club, Hackathon"
        },

        {
            id: "STU002",
            name: "Divya Sri",
            department: "ECE",
            email: "divya@example.com",
            phone: "9876543211",
            skills: ["JavaScript", "HTML", "Communication"],
            cgpa: "9.1",
            activities: "Technical Symposium"
        },

        {
            id: "STU003",
            name: "Karthik Raj",
            department: "Maths",
            email: "karthik@example.com",
            phone: "9876543212",
            skills: ["Python", "Data Analysis", "Leadership"],
            cgpa: "8.4",
            activities: "Maths Club, NSS"
        },

        {
            id: "STU004",
            name: "Meena Priya",
            department: "Accounts",
            email: "meena@example.com",
            phone: "9876543213",
            skills: ["Excel", "Accounting", "Communication"],
            cgpa: "8.9",
            activities: "Commerce Club"
        },

        {
            id: "STU005",
            name: "Rahul S",
            department: "CSC",
            email: "rahul@example.com",
            phone: "9876543214",
            skills: ["C++", "SQL", "Problem Solving"],
            cgpa: "8.2",
            activities: "Coding Club"
        }

    ];

}