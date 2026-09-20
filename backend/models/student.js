const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
    {
        // =========================
        // BASIC STUDENT INFORMATION
        // =========================

        fullName: {
            type: String,
            required: true,
            trim: true
        },

        regNumber: {
            type: String,
            required: true,
            unique: true,
            match: /^[0-9]{9}$/
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        phone: {
            type: String,
            required: true,
            match: /^[0-9]{10}$/
        },

        department: {
            type: String,
            required: true,
            trim: true
        },

        year: {
            type: Number,
            required: true,
            min: 1,
            max: 4
        },

        cgpa: {
            type: Number,
            required: true,
            min: 0,
            max: 10
        },

        // =========================
        // PROFILE
        // =========================

        bio: {
            type: String,
            trim: true,
            default: ""
        },

        // =========================
        // LOGIN
        // =========================

        password: {
            type: String,
            required: true
        }
    },

    {
        timestamps: true
    }
);

module.exports = mongoose.model("Student", studentSchema);