function registerAdmin(event) {

    event.preventDefault();

    let adminName = document.getElementById("adminName").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let adminId = document.getElementById("adminId").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        document.getElementById("message").innerHTML =
            "Passwords do not match!";
        return;
    }

    document.getElementById("message").innerHTML =
        "Admin registered successfully!";

    console.log("Admin Name:", adminName);
    console.log("Email:", email);
    console.log("Phone:", phone);
    console.log("Admin ID:", adminId);
}