const mongoose = require("mongoose");
const validator = require("validator");

const Employee = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, "Please Enter Your name"],
        maxLength: [30, "name cannot exceed 15 characters"],
        minLength: [1, "name should have more than 2 characters"],
    },
    last_name: {
        type: String,
        required: [true, "Please Enter Your name"],
        maxLength: [30, "name cannot exceed 15 characters"],
        minLength: [1, "name should have more than 2 characters"],
    },
    middle_name: {
        type: String,
        default: "",
    },

    isVerified: {
        type: Boolean,
        default: false,
    },
    isSelfOnboard: {
        type: Boolean,
        default: false,
    },

    isActive: {
        type: String,
    },

    email: {
        type: String,
        unique: [true, "Email is already exists"],
        required: [true, "Please Enter E-mail"],
        validate: [validator.isEmail, "Please fill a valid email address"],
    },
    password: {
        type: String,
        required: [true, "Please Enter Password"],
        default: "Pass@123",
    },
    phone_number: {
        type: String,
    },

    user_id: {
        type: String,
        default: null,
    },

    machineid: {
        type: String,
        default: null,
    },

    emergency_contact: {
        type: String,
    },
    joining_date: {
        type: Date,
    },
    gender: {
        type: String,
    },
    address: {
        type: String,
    },
    adhar_card_number: {
        type: Number,
        // unique: true,
    },
    pan_card_number: {
        type: String,
        // unique: true,
    },
    dept_cost_center_no: {
        type: String,
    },
    shift_allocation: {
        type: String,
        default: null,
    },
    profile: {
        type: [String],
        default: ["Employee"],
    },
    companyemail: {
        type: String,
    },

    citizenship: {
        type: String,
    },
    additional_phone_number: {
        type: Number,
    },
    status_message: {
        type: String,
    },
    chat_id: {
        type: String,
    },
    user_logo_url: {
        type: String,
    },
    date_of_birth: {
        type: Date,
    },
    empId: {
        type: String,
        // unique: true,
    },

    esicNo: {
        type: String,
    },
    uanNo: {
        type: String,
    },

    pwd: {
        type: Boolean,
        default: false,
    },

    additionalInfo: mongoose.Schema.Types.Mixed,

    bank_account_no: {
        type: Number,
        // unique: true,
    },
    verified: {
        type: Boolean,
        default: false,
    },

    companyname: {
        type: String,
    },
    latitude: {
        type: String,
        default: null,
    },
    longitude: {
        type: String,
        default: null,
    },

    payment_info: { type: String },

    isVendor: {
        type: Boolean,
        default: false,
    },

    vendorId: { type: String },

    documents: [
        {
            name: { type: String, required: true },
            url: { type: String, required: true },
            selectedValue: { type: String, required: true },
        },
    ],
    bank_details: {
        type: String,
    },

    selectedFrequency: [
        {
            label: { type: String, required: true },
            value: { type: String, required: true },
        },
    ],
});

const EmployeeModel = mongoose.model("Employee", Employee);

module.exports = { EmployeeModel };
