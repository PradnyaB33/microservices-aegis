const express = require("express");
const router = express.Router();
const {
    addEmployee,
    getEmployee
} = require("../controller/employeeController");

router.route("/add-employee").post(addEmployee);
router.route("/get").get(getEmployee);

module.exports = router;
