const Promotion = require("../../modals/PromotionSchema/promotion");
const Emp_promotionSchema_joi = require("../../modals/PromotionSchema/Emp_promotionSchema_joi");
<<<<<<< HEAD
const Joi = require('@hapi/joi');

exports.promotionAdd=( async (req, res) =>  {
    try {
        const schema = Joi.object({
            promotion_employee: Joi.string().required(),
            department: Joi.string().required(),
            promotion_from: Joi.string().required(),
            promotion_to: Joi.string().required(),
            promotion_date: Joi.date().iso().required()
        });
=======

exports.promotionAdd=( async (req, res) =>  {
    try {
>>>>>>> 6865a817290281c9bdfd0135ef93d72d6a6263fe
        const { error } = Emp_promotionSchema_joi.validate(req.body);

        if (error) {
          return res.status(400).send(error);
        }

        const { promotion_employee, department, promotion_from, promotion_to, promotion_date } = req.body;
       
<<<<<<< HEAD
        // const formattedDate = new Date(promotion_date).toLocaleDateString('en-GB');
=======
        const formattedDate = new Date(promotion_date).toLocaleDateString('en-GB');
>>>>>>> 6865a817290281c9bdfd0135ef93d72d6a6263fe

        const promotion_employees = new Promotion({
            promotion_employee,
            department,
            promotion_from,
            promotion_to,
<<<<<<< HEAD
            promotion_date,
=======
            promotion_date:formattedDate,
>>>>>>> 6865a817290281c9bdfd0135ef93d72d6a6263fe
        });
        
        const savedPromotion = await promotion_employees.save();

        res.status(200).send("Promotion Added Successfully");
    } catch (err) {
        res.status(401).send(err);
    }
});


