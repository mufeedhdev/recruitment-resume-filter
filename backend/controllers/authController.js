const bcrypt = require("bcrypt");
const Student = require("../models/Student");

const registerStudent = async (req, res) => {
    try {
        const {
            fullName,
            regNumber,
            email,
            phone,
            department,
            year,
            cgpa,
            password
        } = req.body;

        // Check required fields
        if (
            !fullName ||
            !regNumber ||
            !email ||
            !phone ||
            !department ||
            !year ||
            cgpa === undefined ||
            !password
        ) {
            return res.status(400).json({
                message: "All required fields must be filled"
            });
        }

        // Check duplicate register number
        const existingRegNumber = await Student.findOne({ regNumber });

        if (existingRegNumber) {
            return res.status(400).json({
                message: "Register number already exists"
            });
        }

        // Check duplicate email
        const existingEmail = await Student.findOne({ email });

        if (existingEmail) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create student
        const student = await Student.create({
            fullName,
            regNumber,
            email,
            phone,
            department,
            year,
            cgpa,
            password: hashedPassword
        });

        res.status(201).json({
            message: "Student registered successfully",
            student: {
                id: student._id,
                fullName: student.fullName,
                regNumber: student.regNumber,
                email: student.email
            }
        });

    } catch (error) {
        console.error("Registration error:", error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

module.exports = {
    registerStudent
};