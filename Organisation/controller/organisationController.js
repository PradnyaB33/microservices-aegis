const catchAssyncError = require("../middleware/catchAssyncError");
const { OrganisationModel } = require("../models/organisationSchema");

exports.createAndPayOrganization = catchAssyncError(async (req, res) => {
    try {
        const {
            orgName,
            foundation_date,
            web_url,
            industry_type,
            custom_industry_type,
            email,
            organization_linkedin_url,
            location,
            contact_number,
            description,
            gst_number,
            pan_number,
            tan_number,
            tin_number,
            creator,
            isTrial,
            packageInfo,
            packages,
            count,
            cycleCount,
            totalPrice,
            paymentType,
            coupan,
            selectedEnterprise,
        } = req.body;
        console.log(
            `🚀 ~ file: organizationController.js:372 ~ req.body:`,
            req.body
        );

        console.log(packages);
        // const user = req?.user?.user;

        // if (!user) {
        //     return res.status(401).json({
        //         message: "Something went wrong try reloading",
        //         success: false,
        //     });
        // }
        const dataToEncode = {
            orgName,
            foundation_date,
            web_url,
            industry_type,
            custom_industry_type,
            email,
            organization_linkedin_url,
            industry_type,
            location: location,
            contact_number,
            description,
            gst_number,
            pan_number,
            tan_number,
            tin_number,
            creator: "668cc2a899ef919e90c380d4",
            subscriptionDetails: { status: "Pending" },
            memberCount: count,
            cycleCount,
            coupan,
            packageInfo,
            packages:
                packageInfo === "Enterprise Plan" ? packages?.map((item) => item) : [],
            selectedEnterprise,
        };

        const org = await OrganisationModel.create(dataToEncode);

        //const isOrganizationAlreadyExists = await EmployeeModel.findById(user._id);

        //   if (!isOrganizationAlreadyExists?.organizationId) {
        //     const updatedOne = await EmployeeModel.findByIdAndUpdate(
        //       user._id,
        //       {
        //         organizationId: org._id,
        //       },
        //       { new: true }
        //     );

        //     console.log(updatedOne, "udpaeOne");
        //   }
        //   console.log(isOrganizationAlreadyExists, "this data runs");

        if (!isTrial) {
            console.log(1);
            await OrganisationModel.findByIdAndDelete(org._id);
            const encodedData = encodeURI(JSON.stringify(dataToEncode));
            console.log(2);

            if (paymentType === "RazorPay") {
                console.log(3);
                return createOrganizationWithRazorPay(req, res, encodedData, user);
            } else {
                console.log(4);
                return createOrderWithAmountPhonePay(req, res, encodedData, user);
            }
        } else {
            console.log(5);
            return res.status(201).json({
                org,
                message: "Organisation created You are on 7 day trial period.",
                success: true,
            });
        }
    } catch (err) {
        console.error(`🚀 ~ file: organizationController.js:349 ~ err:`, err);
        let message;
        if (err.message.includes("contact_number_1")) {
            message =
                "This organisation Contact Number is already registered please go to step one and change organisational Contact Number";
        } else if (err.message.includes("email_1")) {
            message =
                "This organisation email is already registered please go to step one and change organisational email";
        } else if (err.message.includes("orgName_1")) {
            message =
                "This organisation organisation name is already registered please go to step one and change organisational organisation name";
        } else {
            message = "something went wrong";
        }
        return res.status(401).json({
            message,
            success: false,
        });
    }
});

exports.getOrganization = catchAssyncError(async (req, res, next) => {
    try {
        const organizations = await OrganisationModel.find({});
        return res.status(200).json({ organizations });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});