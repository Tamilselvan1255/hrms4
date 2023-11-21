const { ProjectsDelete } = require("../../controller/ProjectControllers/projects-employee-deleted");
const { ProjectsAdd } = require("../../controller/ProjectControllers/projects-employee-save");
const { ProjectsUpdated } = require("../../controller/ProjectControllers/projects-employee-updated");
const { ProjectsList } = require("../../controller/ProjectControllers/projects-employee-view");
const { ProjectsSearch,getId } = require("../../controller/ProjectControllers/projects_empolyee_search");
const express = require('express');
const router = express.Router();
const {checkUserRole,authenticateUser}=require("../../controller/loginuser controller")
const { roles } = require('../../utils/constants'); // Define your role constants
const multer = require('multer');
const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });


router.get('/data/:key',ProjectsSearch)
router.get('/:id',getId)
router.patch('/update/:id',ProjectsUpdated)
router.delete('/delete/:id',ProjectsDelete)
router.post('/registration',ProjectsAdd)
router.get('/',ProjectsList)

module.exports = router;
