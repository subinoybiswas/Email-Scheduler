const express = require("express");
const bodyParser = require("body-parser");
const emailRoutes = require("./routes/emailRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

// Use the email routes
app.use("/", emailRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
