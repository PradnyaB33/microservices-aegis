const express = require("express");
const router = express.Router();
const {
    createAndPayOrganization,
    getOrganization
} = require("../controller/organisationController");

router.route("/").post(createAndPayOrganization);
router.route("/get").get(getOrganization);

module.exports = router;
