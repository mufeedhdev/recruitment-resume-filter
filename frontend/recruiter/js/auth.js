// Get logged-in recruiter name
const recruiterName = localStorage.getItem("recruiterName");

// Display recruiter name
const welcomeText = document.getElementById("welcomeText");

if (recruiterName) {
    welcomeText.textContent = "Welcome back, " + recruiterName;
} else {
    welcomeText.textContent = "Welcome back, Recruiter";
}

// Logout function
function logout() {
    localStorage.removeItem("recruiterName");
    window.location.href = "login.html";
}