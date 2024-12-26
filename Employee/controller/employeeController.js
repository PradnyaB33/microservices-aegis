const catchAssyncError = require("../middleware/catchAssyncError");
const { EmployeeModel } = require("../models/employeeSchema");

exports.addEmployee = catchAssyncError(async (req, res, next) => {
    try {
        let {
            first_name,
            last_name,
            email,
            password,
            companyemail,
            address,
            adhar_card_number,
            pan_card_number,
            dept_cost_center_no,
            shift_allocation,
            bank_account_no,
            phone_number,
            deptname,
            citizenship,
            employmentType,
            date_of_birth,
            joining_date,
            designation,
            profile,
            empId,
            salarystructure,
            worklocation,
            gender,
            pwd,
            uanNo,
            esicNo,
            organizationId,
            creatorId,
            mgrempid,
            ...dynamicFields
        } = req.body;

        // check if employee count limit is over or not


        const empCountInOrg = await EmployeeModel.countDocuments({
            organizationId,
        });

        if (empCountInOrg >= empLimit.memberCount) {
            return res.status(400).json({
                message:
                    "You have exceed employee onboarding limit kindly upgrade your organization pack or increase member count",
                status: false,
            });
        }
        if (profile) {
            profile = [...profile, "Employee"];
        } else {
            profile = ["Employee"];
        }
        const existingEmployee = await EmployeeModel.findOne({ email });
        if (existingEmployee) {
            return res.status(400).json({ message: "Email already registered." });
        }
        const isEmpCodeExist = await EmployeeModel.findOne({
            empId,
            organizationId,
        });
        if (isEmpCodeExist) {
            return res.status(400).json({
                message: "Employee code already exists for this organization.",
            });
        }

        const filteredFields = Object.fromEntries(
            Object.entries(dynamicFields).filter(([_, value]) => value !== "")
        );
        let newEmployee = new EmployeeModel({
            ...(first_name && { first_name }),
            ...(last_name && { last_name }),
            ...(email && { email }),
            ...(password && { password }),
            ...(salarystructure && { salarystructure }),
            ...(companyemail && { companyemail }),
            ...(address && { address }),
            ...(adhar_card_number && { adhar_card_number }),
            ...(pan_card_number && { pan_card_number }),
            ...(dept_cost_center_no && { dept_cost_center_no }),
            ...(shift_allocation && { shift_allocation }),
            ...(bank_account_no && { bank_account_no }),
            ...(phone_number && { phone_number }),
            ...(deptname && { deptname }),
            ...(citizenship && { citizenship }),
            ...(date_of_birth && { date_of_birth }),
            ...(joining_date && { joining_date }),
            ...(designation && { designation }),
            ...(worklocation && { worklocation }),
            ...(gender && { gender }),
            ...(profile && { profile }),
            ...(empId && { empId }),
            ...(employmentType && { employmentType }),
            ...(mgrempid && { mgrempid }),
            ...(pwd && { pwd }),
            ...(uanNo && { uanNo }),
            ...(esicNo && { esicNo }),
            ...(organizationId && { organizationId }),
            ...(creatorId && { creatorId }),
            additionalInfo: filteredFields,
        });

        if (profile.includes("Manager")) {
            await EmployeeManagementModel.create({
                managerId: newEmployee._id,
                organizationId,
            });
        }

        if (mgrempid) {
            const assigneddata = await EmployeeManagementModel.findOneAndUpdate(
                { managerId: mgrempid },
                { $addToSet: { reporteeIds: newEmployee._id } },
                { new: true }
            );

            newEmployee.mgrempid = assigneddata._id;
        }

        await newEmployee.save();
        console.log("new employee", newEmployee);
        // return res.status(400).json({
        //   message: "Invalid profile provided.",
        // });

        const userWithoutPassword = {
            _id: newEmployee._id,
            first_name: newEmployee.first_name,
            last_name: newEmployee.last_name,
            middle_name: newEmployee.middle_name,
            email: newEmployee.email,
        };

        // Create a verification token
        const token = jwt.sign(userWithoutPassword, process.env.jWT_SECRETE, {
            expiresIn: "10m",
        });

        // Construct email verification URLs
        const verificationUrl = `${process.env.BASE_URL}/verify/${token}`;

        // Email content with inline styles for formatting
        const emailContent = `
            <h2>Email Verification for Your Account</h2>
            <p>Dear ${newEmployee.first_name} ${newEmployee.last_name},</p>
            <p>We have received a request to verify your email address associated with your account on AEGIS software. Please click on the following link to complete the verification process:</p>
            <a href="${verificationUrl}" style="text-decoration: none; background-color: #4CAF50; color: white; padding: 10px 20px; border-radius: 5px;">Email Verification Link</a>
            <p>If you did not initiate this request, please ignore this email. Your account security is important to us.</p>
            <p>Thank you for choosing AEGIS software.</p>
            <p><strong>Best regards,</strong></p>
            <p>AEGIS software Team</p>
            <p>Website: https://app.aegishrms.com/</p>
            <p>Email: <a href="mailto:support@aegishrms.com">support@aegishrms.com</a></p>
            <p>Phone: +919082462161</p>
                `;

        // Send the verification email
        await sendEmail(
            newEmployee.email,
            "Email Verification",
            emailContent,
            newEmployee,
            token
        );
        // Send a success response
        res.status(201).send({
            message:
                "An Email has been sent to your account. Please verify your email address.",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

exports.getEmployee = catchAssyncError(async (req, res, next) => {
    try {
        const employees = await EmployeeModel.find({});
        return res.status(200).json({ employees });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
