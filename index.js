const express = require("express");
const mongooes = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
// const ip = require("ip");


dotenv.config();

const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

let url = "mongodb://localhost:27017/Adit";
// "mongodb+srv://adit:adit@cluster0.bfpxxr9.mongodb.net/?retryWrites=true&w=majority"
// Connect to MongoDB
mongooes
  .connect(url, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}`);
    });
  });

  // get
  app.get("/", (req, res) => {
    res.send("Hello World");
  }
  );

app.use("/api/users", require("./routes/User"));
app.use("/api/properties", require("./routes/Property"));
app.use("/api/admin", require("./routes/Admin"));


