console.log("auth.js loaded");

document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");
  const messageBox = document.getElementById("formMessage");

  const regNumberInput = document.getElementById("regNumber");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");

  const regNumberError = document.getElementById("regNumberError");
  const emailError = document.getElementById("emailError");
  const phoneError = document.getElementById("phoneError");
  const passwordError = document.getElementById("passwordError");
  const confirmPasswordError = document.getElementById("confirmPasswordError");

  // ---- Live validation while typing ----
  function checkRegAndEmailLive() {
    const regNumber = regNumberInput.value.trim();
    const email = emailInput.value.trim();
    const regNumberPattern = /^[0-9]{9}$/;
    const emailPattern = /^[0-9]{9}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (regNumber && !regNumberPattern.test(regNumber)) {
      regNumberError.textContent = "Must be exactly 9 digits.";
      regNumberError.style.display = "block";
    } else {
      regNumberError.style.display = "none";
    }

    if (email && !emailPattern.test(email)) {
      emailError.textContent = "Must start with your 9-digit register number (e.g. 123456789@sastra.ac.in).";
      emailError.style.display = "block";
    } else if (email && regNumber && email.split("@")[0] !== regNumber) {
      emailError.textContent = "Email must match your register number.";
      emailError.style.display = "block";
    } else {
      emailError.style.display = "none";
    }
  }

  // ---- Phone validation while typing ----
  function checkPhoneLive() {
    const phone = phoneInput.value.trim();
    const phonePattern = /^[0-9]{10}$/;

    if (phone && !phonePattern.test(phone)) {
      phoneError.textContent = "Phone number must be exactly 10 digits.";
      phoneError.style.display = "block";
    } else {
      phoneError.style.display = "none";
    }
  }

  // ---- Password validation while typing ----
  function checkPasswordLive() {
    const password = passwordInput.value;

    if (password && password.length < 6) {
      passwordError.textContent = "Password must be at least 6 characters.";
      passwordError.style.display = "block";
    } else {
      passwordError.style.display = "none";
    }

    checkConfirmPasswordLive();
  }

  // ---- Confirm password validation while typing ----
  function checkConfirmPasswordLive() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (confirmPassword && password !== confirmPassword) {
      confirmPasswordError.textContent = "Passwords do not match.";
      confirmPasswordError.style.display = "block";
    } else {
      confirmPasswordError.style.display = "none";
    }
  }

  if (regNumberInput && emailInput) {
    regNumberInput.addEventListener("input", checkRegAndEmailLive);
    emailInput.addEventListener("input", checkRegAndEmailLive);
  }

  if (phoneInput) {
    phoneInput.addEventListener("input", checkPhoneLive);
  }

  if (passwordInput) {
    passwordInput.addEventListener("input", checkPasswordLive);
  }

  if (confirmPasswordInput) {
    confirmPasswordInput.addEventListener("input", checkConfirmPasswordLive);
  }

  // ---- Full validation on submit ----
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

      if (!fullName || !regNumber || !email || !phone || !department || !year || isNaN(cgpa) || !password || !confirmPassword) {
        showMessage("Please fill in all fields.", "error");
        return;
      }

      const regNumberPattern = /^[0-9]{9}$/;
      if (!regNumberPattern.test(regNumber)) {
        showMessage("Register number must be exactly 9 digits.", "error");
        return;
      }

      const emailPattern = /^[0-9]{9}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(email)) {
        showMessage("Email must start with your 9-digit register number (e.g. 123456789@sastra.ac.in).", "error");
        return;
      }

      const emailRegPart = email.split("@")[0];
      if (emailRegPart !== regNumber) {
        showMessage("Email must match your register number.", "error");
        return;
      }

      const phonePattern = /^[0-9]{10}$/;
      if (!phonePattern.test(phone)) {
        showMessage("Phone number must be 10 digits.", "error");
        return;
      }

      if (cgpa < 0 || cgpa > 10) {
        showMessage("CGPA must be between 0 and 10.", "error");
        return;
      }

      if (password !== confirmPassword) {
        showMessage("Passwords do not match.", "error");
        return;
      }

      if (password.length < 6) {
        showMessage("Password must be at least 6 characters.", "error");
        return;
      }

      const studentData = { fullName, regNumber, email, phone, department, year, cgpa, password };
      console.log("Student registration data:", studentData);

      showMessage("Registered successfully! Redirecting to login...", "success");

      setTimeout(() => {
        window.location.href = "login.html";
      }, 1500);
    });
  }

  function showMessage(text, type) {
    if (messageBox) {
      messageBox.textContent = text;
      messageBox.className = "message " + type;
    }
  }
});