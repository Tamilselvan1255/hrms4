const express = require('express');
const router = express.Router();
const shiftController = require('../../controller/shift controller');
const {checkUserRole,authenticateUser}=require("../../controller/loginuser controller")


router.route('/').get(shiftController.getShiftUsers);
router.post('/registration',shiftController.registerShiftUser);
router.get("/:id", shiftController.getId);
router.get("/data/:key", shiftController.searchShiftUser);
router.route('/update/:id').patch(shiftController.updateShiftUser);
router.route('/delete/:id').delete(shiftController.deleteShiftUser);

// Define other routes using the corresponding controller functions

module.exports = router;
