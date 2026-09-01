document.addEventListener("DOMContentLoaded", function () {

    if (localStorage.getItem("loggedIn") !== "true") {

        window.location.href = "login.html";

        return;
    }


    const searchBtn =
        document.getElementById("searchBtn");

    const searchInput =
        document.getElementById("searchInput");

    const result =
        document.getElementById("searchResult");


    searchBtn.addEventListener(
        "click",
        function () {

            const value =
                searchInput.value.trim();


            if (value === "") {

                result.innerHTML =
                    "<p>Please enter a student name or skill.</p>";

                return;

            }


            result.innerHTML = `

                <div class="student-result">

                    <strong>Search Result</strong>

                    <p>
                        Searching for:
                        ${value}
                    </p>

                    <p>
                        Student database will be
                        connected here.
                    </p>

                </div>

            `;

        }
    );

});