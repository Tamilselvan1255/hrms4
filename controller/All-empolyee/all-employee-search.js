const allemployee = require("../../modals/all-empolyeeSchema/allEmpolyeeSchema");

exports.allemployeeSearch=( async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Parse the page query parameter or default to 1
        const perPage = 10; // Set the number of items per page

        // Use the 'key' route parameter for searching
        const key = req.params.key; 

        // Construct a query to search for records containing the 'key'
        const query = {
            $or: [
                { First_Name: { $regex: key, $options: "i" } },

                { last_Name: { $regex: key, $options: "i" } },
                { User_Name: { $regex: key, $options: "i" } },
                { Departement: { $regex: key, $options: "i" } },
                { Email: { $regex: key, $options: "i" } },
                { Emaployee_ID: { $regex: key, $options: "i" } },
                { Mobile_No: isNaN(numericKey) ? { $regex: key, $options: "i" } : numericKey },
            ]
        };

        // Perform the search with pagination
        const users = await allemployee
            .find(query)
            .sort({ key: 1 })
            .skip((page - 1) * perPage)
            .limit(perPage);
            if (users && users.length > 0) {
                res.status(200).send(users);
              } else {
                res.status(400).send("No Users");
              }
    } catch (err) {
        res.status(500).send(err); // Return a structured error response
    }
});

exports.getId = async (req, res) => {
    const {id}=req.params
    try {
        const users = await allemployee.findById(id)
            if (users) {
              res.status(200).send(users);
            } else {
              res.status(400).send("No Users"); 
            }  
          } catch (err) {
        res.status(400).send('error: ' + err);
    }
};

