const { empolyeeTicketsDeleted } = require("../../controller/EmpolyeeTickets/EmpolyeeTickets-deleted");
const { empolyeeTicketsAdd } = require("../../controller/EmpolyeeTickets/EmpolyeeTickets-save");
const { empolyeeTicketsUpdated } = require("../../controller/EmpolyeeTickets/EmpolyeeTickets-updated");
const { empolyeeTicketsList } = require("../../controller/EmpolyeeTickets/EmpolyeeTickets-view");
const { empolyeeTicketsSearch,getId } = require("../../controller/EmpolyeeTickets/EmpolyeeTickets_search");
const express = require('express');
const router = express.Router();
const {checkUserRole,authenticateUser}=require("../../controller/loginuser controller")
const { roles } = require('../../utils/constants'); // Define your role constants



router.get('/data/:key',empolyeeTicketsSearch)
router.get('/:id',getId)
router.delete('/delete/:id',empolyeeTicketsDeleted)
router.patch('/update/:id',empolyeeTicketsUpdated)
router.post('/registration',empolyeeTicketsAdd)
router.get('/',empolyeeTicketsList)

module.exports = router;
   