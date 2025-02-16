# Polling App

A simple polling app that allows users to create polls, vote on them, and view results in real time.

## API Endpoints

- **Add New Poll**  
  `POST /addPoll`  
  **Description:** Create a new poll.  
  **Request Body Example:**
  ```json
  {
    "question": "What is your favorite programming language?",
    "options": ["JavaScript", "Python", "Java", "C#"]
  }

Vote on a Poll
POST /polls/:pollId
Description: Vote for an option in a poll.
Request Parameters:

pollId: The ID of the poll.
Request Body Example:
 ```json
{
  "optionIndex": 1
}
```
Get All Polls
GET /getPolls
Description: Retrieve all polls along with their vote counts.

```
const mongoose = require("mongoose");

const pollSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    options: [
      {
        text: { type: String, required: true },
        votes: { type: Number, default: 0 },
      },
    ],
    totalVotes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Polls", pollSchema);
```

Running the App
Backend:

Ensure you have a MongoDB instance running.
Start the backend server (e.g., using Node.js/Express).
Frontend:

Install dependencies and run the React app built with Vite.
Ensure the API base URL in your frontend is configured correctly.
