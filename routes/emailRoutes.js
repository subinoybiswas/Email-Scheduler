const express = require("express");
const router = express.Router();
const {
  scheduleEmail,
  getAllScheduledEmails,
  getScheduledEmailById,
  cancelScheduledEmail,
} = require("../controllers/emailController.js");


router.post("/schedule-email", scheduleEmail);

router.get("/scheduled-emails", getAllScheduledEmails);

router.get("/scheduled-emails/:id", getScheduledEmailById);

router.delete("/scheduled-emails/:id", cancelScheduledEmail);

module.exports = router;
