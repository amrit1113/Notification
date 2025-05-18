
const sendEmail = async (userId, content) => {
  // Simulate random failure with 30% chance
  if (Math.random() < 0.3) {
    throw new Error("Email service failed");
  }
  console.log(`[EMAIL] Sent to User ${userId}: ${content}`);
};

module.exports = { sendEmail };
