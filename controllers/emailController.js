const cron = require("node-cron");
const nodemailer = require("nodemailer");
const {
  addScheduledEmailHelper,
  getScheduledEmailsHelper,
  getScheduledEmailByIdHelper,
  deleteScheduledEmailByIdHelper,
} = require("../utils/scheduler.js");
require("dotenv").config();

// Nodemailer transporter setup (replace with your email service credentials)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "heysubinoy@gmail.com",
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});
console.log(process.env.CLIENT_ID);

function sendEmail(recipient, subject, body) {
  const mailOptions = {
    from: "subinoyworks@gmail.com",
    to: recipient,
    subject: subject,
    text: body,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
}

const scheduleEmail = (req, res) => {
  const { recipient, subject, body, schedule } = req.body;

  // Assuming schedule is provided as timestampz like '2024-07-09T10:30:00Z'
  const scheduleTime = new Date(schedule);
  const hours = scheduleTime.getUTCHours();
  const minutes = scheduleTime.getUTCMinutes();

  const cronExpression = `${minutes} ${hours} * * *`;

  const id = addScheduledEmailHelper({
    recipient,
    subject,
    body,
    schedule: cronExpression,
  });

  getScheduledEmailByIdHelper(id).cronJob = cron.schedule(
    cronExpression,
    () => {
      sendEmail(recipient, subject, body);
      console.log(
        `Email sent to ${recipient} at ${new Date().toLocaleString()}`
      );
    }
  );

  res.json({ message: "Email scheduled successfully", id });
};

const getAllScheduledEmails = (req, res) => {
  const emails = getScheduledEmailsHelper();
  res.json(emails);
};

const getScheduledEmailById = (req, res) => {
  const id = parseInt(req.params.id);
  const email = getScheduledEmailByIdHelper(id);
  if (email) {
    res.json(email);
  } else {
    res.status(404).json({ message: "Scheduled email not found" });
  }
};

const cancelScheduledEmail = (req, res) => {
  const id = parseInt(req.params.id);
  const deleted = deleteScheduledEmailByIdHelper(id);
  const email = getScheduledEmailByIdHelper(id);
  if (email) {
    // Stop the cron job associated with the email
    if (email.cronJob) {
      email.cronJob.destroy();
    }
  }
  if (deleted) {
    res.json({ message: `Scheduled email with id ${id} has been cancelled` });
  } else {
    res.status(404).json({ message: "Scheduled email not found" });
  }
};

module.exports = {
  scheduleEmail,
  getAllScheduledEmails,
  getScheduledEmailById,
  cancelScheduledEmail,
};
