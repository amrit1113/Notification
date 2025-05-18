const sendSMS = async (userId, content) => {
  if (Math.random() < 0.3) {
    throw new Error("SMS service failed");
  }
  console.log(`[SMS] Sent to User ${userId}: ${content}`);
};

module.exports = { sendSMS };
