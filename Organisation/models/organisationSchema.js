const mongoose = require("mongoose");

const Organization = new mongoose.Schema(
    {
        orgName: {
            type: String,
            required: true,
            unique: true,
        },
        foundation_date: {
            type: String,
            required: true,
        },
        web_url: {
            type: String,
            // required: true,
        },
        organization_linkedin_url: {
            type: String,
            // required: false,
        },
        industry_type: {
            type: String,
            // required: true,
        },
        custom_industry_type: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        location: {
            address: {
                type: String,
                required: true,
            },
            position: {
                lat: {
                    type: Number,
                    required: true,
                },
                lng: {
                    type: Number,
                    required: true,
                },
            },
        },
        contact_number: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
        },
        gst_number: {
            type: Number,
        },
        pan_number: {
            type: Number,
        },
        tan_number: {
            type: Number,
        },
        tin_nummber: {
            type: Number,
        },

        selectedEnterprise: {
            type: String,
        },
        // packages: Array,
        packages: [
            {
                label: String,
                value: String,
                price: Number,
                plans: [
                    {
                        name: String,
                        description: String,
                        price: Number,
                        maxEmployees: Number,
                        features: [String],
                    }
                ],
            },
        ],
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee",
            required: true,
        },
        logo_url: {
            type: String,
            default: "",
        },
        active: {
            type: Boolean,
            default: false,
        },
        isCompOff: {
            type: Boolean,
            default: false,
        },
        isBiometric: {
            type: Boolean,
            default: false,
        },
        isHalfDay: {
            type: Boolean,
            default: false,
        },
        subscriptionDetails: {
            status: {
                required: true,
                type: String,
            },
            orderId: {
                type: String,
            },
            invoiceNumber: {
                type: Number,
                unique: true,
            },
            paymentDate: {
                type: Date,
            },
            expirationDate: {
                type: Date,
            },
        },
        memberCount: {
            type: Number,
            default: 0,
        },
        cycleCount: {
            type: Number,
            default: 1,
        },
        packages: [],
        coupan: {
            type: String,
            required: false,
        },
        packageInfo: {
            type: String,
            default: "Basic Plan",
        },
        updatablePackageInfo: {
            type: String,
            default: "",
        },
        remainingBalance: {
            type: Number,
            default: 0,
        },
        paymentToComplete: {
            type: Number,
            default: 0,
        },
        memberUpdatePaymentDetails: [
            {
                razorpay_payment_id: {
                    type: String,
                    required: true,
                },
                razorpay_signature: {
                    type: String,
                    required: true,
                },
                razorpay_order_id: {
                    type: String,
                    required: true,
                },
            },
        ],
        memberToAdd: {
            type: Number,
            default: 0,
        },
        packageToChange: {
            type: String,
        },
        upcomingPackageInfo: {
            packageName: {
                type: String,
            },
            packageStartDate: {
                type: Date,
            },
            packageEndDate: {
                type: Date,
            },
            memberCount: {
                type: Number,
            },
        },
    },
    { timestamps: true }
);

const OrganisationModel = mongoose.model("Organization", Organization);
module.exports = { OrganisationModel };
