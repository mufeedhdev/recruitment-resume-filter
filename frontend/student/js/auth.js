// auth.js

document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");
  const messageBox = document.getElementById("formMessage");

  if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const fullName = document.getElementById("fullName").value.trim();
      const regNumber = document.getElementById("regNumber").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const department = document.getElementById("department").value;
      const year = document.getElementById("year").value;
      const cgpa = parseFloat(document.getElementById("cgpa").value);
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      // Required field check
      if (!fullName || !regNumber || !email || !phone || !department || !year || isNaN(cgpa) || !password || !confirmPassword) {
        showMessage("Please fill in all fields.", "error");
        return;
      }

      // Register number check — must be exactly 8 digits
      const regNumberPattern = /^[0-9]{8}$/;
      if (!regNumberPattern.test(regNumber)) {
        showMessage("Register number must be exactly 8 digits.", "error");
        return;
      }

      // Email must start with 8-digit register number, then domain
      const emailPattern = /^[0-9]{8}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(email)) {
        showMessage("Email must start with your 8-digit register number (e.g. 12345678@sastra.ac.in).", "error");
        return;
      }

      // Email register number must match Register Number field
      const emailRegPart = email.split("@")[0];
      if (emailRegPart !== regNumber) {
        showMessage("Email must match your register number.", "error");
        return;
      }

      // Phone check (10 digits)
      const phonePattern = /^[0-9]{10}$/;
      if (!phonePattern.test(phone)) {
        showMessage("Phone number must be 10 digits.", "error");
        return;
      }

      // CGPA range check
      if (cgpa < 0 || cgpa > 10) {
        showMessage("CGPA must be between 0 and 10.", "error");
        return;
      }

      // Password match check
      if (password !== confirmPassword) {
        showMessage("Passwords do not match.", "error");
        return;
      }

      // Password strength (basic)
      if (password.length < 6) {
        showMessage("Password must be at least 6 characters.", "error");
        return;
      }

      // All checks passed
      const studentData = {
        fullName,
        regNumber,
        email,
        phone,
        department,
        year,
        cgpa,
        password
      };

      console.log("Student registration data:", studentData);

      showMessage("Registered successfully! Redirecting to login...", "success");

      setTimeout(() => {
        window.location.href = "login.html";
      }, 1500);
    });
  }
});