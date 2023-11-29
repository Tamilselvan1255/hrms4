const allemployee = require("../../modals/all-empolyeeSchema/allEmpolyeeSchema");

<<<<<<< HEAD
exports.allemployeeUpadated = (async (req, res) => {
=======
exports.allemployeeUpadated=( async (req, res) => {
>>>>>>> 6865a817290281c9bdfd0135ef93d72d6a6263fe
    try {
        const allemployee_employees = await allemployee.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!allemployee_employees) {
<<<<<<< HEAD
            return res.status(404).send("No Data");
        }

        return res.status(200).send("Employee Data Updated Successfully");
    } catch (err) {
        console.error(err);
        res.status(401).send(err);
    }
});
=======
            return res.status(404).send("No Data" );
        }

        return res.status(200).send( "Employee Data Updated Successfully" );
    } catch (err) {
        console.error(err);
        res.status(401).send( err );
    }
});

>>>>>>> 6865a817290281c9bdfd0135ef93d72d6a6263fe
