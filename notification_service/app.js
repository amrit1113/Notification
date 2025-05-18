const express = require("express");
const mongoose = require("mongoose");
const notificationRoutes = require("./routes/notificationRoutes");
const app = express();

app.use(express.json());
app.use("/api", notificationRoutes);

mongoose
  .connect("mongodb://127.0.0.1:27017/notifications", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(3000, () => console.log("Server running on port 3000"));
  })
  .catch((err) => console.log(err));
