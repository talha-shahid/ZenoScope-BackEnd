require("dotenv").config();
const express = require("express");
const app = express();
const DbConnect = require("./database");
const cors = require("cors");
const cookieParser = require("cookie-parser");

//server
const server = require("http").createServer(app);


//PORT
const PORT = process.env.PORT || 5500;

//Connecting to the DataBase
DbConnect();

//Router
const router = require("./routes");

//Cookie Parser
app.use(cookieParser());

//CORS
const corsOptions = {
  credentials: true,
  origin: ["http://localhost:3000"],
};
app.use(cors(corsOptions));

app.use("/storage", express.static("storage"));

app.use(express.json({ limit: "8mb" }));
app.use(router);

//Index Route
app.get("/", (req, res) => {
  res.send("Hello World");
});

//Server listening
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
