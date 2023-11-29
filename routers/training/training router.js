const express = require('express');
const router = express.Router();
const trainingController = require('../../controller/training controller');
const {checkUserRole,authenticateUser}=require("../../controller/loginuser controller")


router.route('/').get(trainingController.getTrainingUsers);
router.post('/registration',trainingController.registerTrainingUser);
router.get("/:id", trainingController.getId);
router.get("/data/:key", trainingController.searchTrainingUser);
router.route('/update/:id').patch(trainingController.updateTrainingUser);
router.route('/delete/:id').delete(trainingController.deleteTrainingUser);

// Define other routes using the corresponding controller functions

module.exports = router;
