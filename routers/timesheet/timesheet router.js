const express = require('express');
const router = express.Router();
const timesheetController = require('../../controller/timesheet controller');
const {checkUserRole,authenticateUser}=require("../../controller/loginuser controller")


router.route('/').get(timesheetController.getTimesheetUsers);
router.post('/registration',timesheetController.registerTimesheetUser);
router.get("/:id", timesheetController.getId);
router.get("/data/:key", timesheetController.searchTimesheetUser);
router.route('/update/:id').patch(timesheetController.updateTimesheetUser);
router.route('/delete/:id').delete(timesheetController.deleteTimesheetUser);

// Define other routes using the corresponding controller functions

module.exports = router;
