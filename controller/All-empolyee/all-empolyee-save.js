const allemployee = require("../../modals/all-empolyeeSchema/allEmpolyeeSchema");
const bcrypt = require("bcrypt");
const allEmployee_Joi_schema = require("../../modals/all-empolyeeSchema/allEmoleeSchema_joi");

exports.allemployeeAdd = async (req, res) => {
    try {
        const { 
            First_Name, 
            last_Name, 
            User_Name, 
            email,
            Password,
            Confirm_Password,
            Company, 
            Employee_ID,
            Mobile_No,
            Department,
            Designation,
            Joining_Date
 } = req.body;
                   

        const { error } = allEmployee_Joi_schema.validate(req.body);

        if (error) {
            return res.status(400).send(error.details[0].message);
        }


        // Validate email format
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).send("Invalid email format");
        }

        const existingUser = await allemployee.findOne({ email });
        console.log(existingUser)
        if (existingUser) {
            return res.status(400).send("Email Already Registered");
        }

        if (Password !== Confirm_Password) {
            return res.status(400).send("Passwords do not match");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Password, salt);

        const newEmployee = new allemployee({
            email,
            First_Name,
            last_Name,
            User_Name,
            Password: hashedPassword,
            Confirm_Password: hashedPassword,
            Employee_ID,
            Mobile_No,
            Department,
            Company,
            Designation,
            Joining_Date,
        });

        // Use async/await for saving the user
        await newEmployee.save();

        res.status(200).send("Employee Data Added Successfully");
    } catch (err) {
        console.error(err);
        res.status(400).send(err);
    }
};

