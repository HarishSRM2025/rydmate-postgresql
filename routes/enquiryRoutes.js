const express = require("express");
const router = express.Router();
const {createEnquiry,getAllEnquiries,deleteEnquiry} = require("../controllers/enquiryController");

router.post("/create", createEnquiry);
router.get("/all", getAllEnquiries);
router.delete("/delete/:id", deleteEnquiry);

module.exports = router;
