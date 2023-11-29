const Clients = require("../../modals/Clients/Clients_schema");

<<<<<<< HEAD
exports.ClientsUpdated = (async (req, res) => {
=======
exports.ClientsUpdated=(async (req, res) => {
>>>>>>> 6865a817290281c9bdfd0135ef93d72d6a6263fe
    try {
        const Clientss_employees = await Clients.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!Clientss_employees) {
            return res.status(404).send("No Data");
        }

        return res.status(200).send("Client Data Updated Successfully");
    } catch (err) {
<<<<<<< HEAD
        console.error(err);
=======
>>>>>>> 6865a817290281c9bdfd0135ef93d72d6a6263fe
        res.status(401).send(err);
    }
});

