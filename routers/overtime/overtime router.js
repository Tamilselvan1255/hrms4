const express = require('express');
const router = express.Router();
const overTime = require('../../controller/overtime controller');
const {checkUserRole,authenticateUser}=require("../../controller/loginuser controller")


router.route('/').get(overTime.getOverUsers);
router.post('/registration',overTime.registerOverUser);
router.get("/:id", overTime.getId);
router.get("/data/:key", overTime.searchOverUser);
router.route('/update/:id').patch(overTime.updateOverUser);
router.route('/delete/:id').delete(overTime.deleteOverUser);

// Define other routes using the corresponding controller functions

module.exports = router;
