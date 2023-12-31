const allemployee = require("../../modals/all-empolyeeSchema/allEmpolyeeSchema");

exports.allemployeeList=async (req, res) => {
    const perPage = 10;
    const page = parseInt(req.query.page) || 1; // Parse the page query parameter or default to 1
  
    try {
        const totalUsers = await allemployee.countDocuments();
        const totalPages = Math.ceil(totalUsers / perPage);
  
        const data = await allemployee
            .find()
            .sort({ _id: -1 })
            .skip((page - 1) * perPage)
            .limit(perPage);
  
        if (data && data.length > 0) {
            res.status(200).send({
                data,
                totalPages:totalPages,
                currentPage: page,
            });
        } else {
            res.status(400).send("No Users");
        }
    } catch (err) {
        res.status(500).send('Error: ' + err);
    }
  };



exports.allemployeeNameList = async (req, res) => {
    const perPage = 10;
    const page = parseInt(req.query.page) || 1; // Parse the page query parameter or default to 1

    try {
        const totalUsers = await allemployee.countDocuments();
        const totalPages = Math.ceil(totalUsers / perPage);

        // const employees = data.map(employee => ({
        //     name: employee.First_Name,
        //     id: employee._id
        // }));

        const data = await allemployee 
            .find()
            .skip((page - 1) * perPage)
            .limit(perPage);

        if (data && data.length > 0) {
            // Extracting only names from the data
            const names = data.map(employee => employee.First_Name);
            const id = data.map(employee => employee._id);


            res.status(200).send({
                names,
                id,
                totalPages: totalPages,
                currentPage: page,
            });
        } else {
            res.status(400).send("No Users");
        }
    } catch (err) {
        res.status(500).send('Error: ' + err);
    }
};




