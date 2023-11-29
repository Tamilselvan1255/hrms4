const employeeTicketsJoiSchema = require("../../modals/EmpolyeeTicketsSchema/EmpolyeeTicketsSchema_joi");
const EmpolyeeTickets = require("../../modals/EmpolyeeTicketsSchema/EmpolyeeTicketsSchema");
const Joi = require('@hapi/joi');


exports.empolyeeTicketsAdd=( async (req, res) => {
    try {
        const schema = Joi.object({
            project: Joi.string().required(),
            ticket_id: Joi.string().required(),
            assign_to: Joi.string().required(),
            ticket_followers: Joi.string().required(),
            client: Joi.string().required(),
            priority: Joi.string().required(),
            status: Joi.string().required(),
            description: Joi.string().required(),
            create_date: Joi.date().iso().required()
        });

        const { error } = employeeTicketsJoiSchema.validate(req.body);

        if (error) {
          return res.status(400).send(error.details[0].message);
        }

        const {  project,
            ticket_id,
            assign_to,
            ticket_followers,
            client,
            priority,
            status,
            // attachment,
            description,
            create_date,} = req.body;
            
        
        const EmpolyeeTickets_employees = new EmpolyeeTickets({
            project,
            ticket_id,
            assign_to,
            ticket_followers,
            client,
            priority,
            status,
            // attachment,
            description,
            create_date,
        });

        const savedEmpolyeeTickets = await EmpolyeeTickets_employees.save();

        res.status(201).send("Tickets Added Successfully");
    } catch (err) {
        res.status(401).send( err);
    }
});


