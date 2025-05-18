const Notification = require("../models/Notification");
const { sendEmail } = require("../services/emailService");
const { sendSMS } = require("../services/smsService");
const { sendInApp } = require("../services/inAppService");

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 2000;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const sendWithRetry = async (sendFn, userId, content, notification) => {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      await sendFn(userId, content);
      notification.status = "sent";
      notification.retries = attempt - 1;
      await notification.save();
      return;
    } catch (err) {
      console.error(`Attempt ${attempt} failed for user ${userId}:`, err.message);
      if (attempt < MAX_RETRIES) {
        await delay(RETRY_DELAY_MS);
      } else {
        notification.status = "failed";
        notification.retries = MAX_RETRIES;
        await notification.save();
        throw err;
      }
    }
  }
};

const sendNotification = async (req, res) => {
  const { userId, type, content } = req.body;

  try {
    const newNotification = new Notification({
      userId,
      type,
      content,
      status: "pending",
      retries: 0,
      createdAt: new Date(),
    });

    await newNotification.save();

    let sendFunction;
    if (type === "email") sendFunction = sendEmail;
    else if (type === "sms") sendFunction = sendSMS;
    else if (type === "in-app") sendFunction = sendInApp;
    else throw new Error("Invalid notification type");

    await sendWithRetry(sendFunction, userId, content, newNotification);

    res.status(201).json({ message: "Notification processed", data: newNotification });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error sending notification" });
  }
};

const getUserNotifications = async (req, res) => {
  const { id } = req.params;

  try {
    const notifications = await Notification.find({ userId: id });
    res.status(200).json({ data: notifications });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching notifications" });
  }
};

module.exports = { sendNotification, getUserNotifications };
