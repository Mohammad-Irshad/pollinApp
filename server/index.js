const express = require("express");
const cors = require("cors");
const { initializeDatabase } = require("./database/db");
const {
  addNewPoll,
  voteAPoll,
  getAllPolls,
} = require("./controllers/polls.controller");

const app = express();

app.use(express.json());
app.use(cors());

initializeDatabase();

// Welcome Api

app.get("/", (req, res) => {
  res.send(
    "Welcome to Mohammad Irshad's Server for PollingApp ! Happy Coding."
  );
});

// User Api
app.post("/addPoll", addNewPoll); // Add new poll
app.post("/polls/:pollId", voteAPoll); // Vote a poll
app.get("/getPolls", getAllPolls); // Get all polls

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
});
