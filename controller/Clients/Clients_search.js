const Clients = require("../../modals/Clients/Clients_schema");

exports.ClientsSearch = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = 10;
        const key = req.params.key;

        // Parse numericKey as a number or use null if it's not a valid number
        const numericKey = !isNaN(key) ? parseInt(key) : null;

        const query = {
            $or: [
                { client_name: { $regex: key, $options: "i" } },
                { client_email: { $regex: key, $options: "i" } },
                { client_company: { $regex: key, $options: "i" } },
                { client_mobilenumber: isNaN(numericKey) ? { $regex: key, $options: "i" } : numericKey },
                { client_address: { $regex: key, $options: "i" } },
            ]
        };

        const clients = await Clients
            .find(query)
            .sort({ client_name: 1 })
            .skip((page - 1) * perPage)
            .limit(perPage);

        res.status(200).send(clients);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.getId = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await Clients.findById(id);
        if (user) {
            res.status(200).send(user);
        } else {
            res.status(404).send("User not found");
        }
    } catch (err) {
        res.status(500).send('Error: ' + err.message);
    }
};

