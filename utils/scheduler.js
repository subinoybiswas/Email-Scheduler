let scheduledEmails = [];

function addScheduledEmailHelper(email) {
  const id = scheduledEmails.length + 1;
  scheduledEmails.push({ id, ...email });
  return id;
}

function getScheduledEmailsHelper() {
  return scheduledEmails;
}

function getScheduledEmailByIdHelper(id) {
  return scheduledEmails.find((email) => email.id === id);
}

function deleteScheduledEmailByIdHelper(id) {
  const index = scheduledEmails.findIndex((email) => email.id === id);
  if (index !== -1) {
    scheduledEmails.splice(index, 1);
    return true;
  }
  return false;
}

module.exports = {
  addScheduledEmailHelper,
  getScheduledEmailsHelper,
  getScheduledEmailByIdHelper,
  deleteScheduledEmailByIdHelper,
};
