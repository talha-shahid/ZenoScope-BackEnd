const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

function DbConnect() {
  const DB_URL = process.env.DB_URL;
  console.log(DB_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
  // Database connection
  mongoose.connect(DB_URL);
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", () => {
    console.log("DB connected...");
  });
}

module.exports = DbConnect;
