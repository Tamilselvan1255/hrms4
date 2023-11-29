const express = require('express');
const router = express.Router();
const attendanceReport = require('../../controller/attendanceReport controller');

router.get('/',attendanceReport.getateendanceReport);
// router.route('/registration').post(leaveController.registerLeaveUser);
// router.get("/:id", leaveController.getId);
// router.get("/data/:key", leaveController.searchLeaveUser);
// router.route('/update/:id').patch(leaveController.updateLeaveUser);
// router.route('/delete/:id').delete(leaveController.deleteLeaveUser);

// Define other routes using the corresponding controller functions

module.exports = router;
