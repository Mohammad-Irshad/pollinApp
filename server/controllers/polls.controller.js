const Polls = require("../model/polls.model");

const addNewPoll = async (req, res) => {
  const { question, options } = req.body;

  // Validate request body
  if (!question || options.length < 2) {
    return res.status(400).json({
      error: "Please provide a valid question options.",
    });
  }

  // Transform options into an array of objects with text and initial votes
  const pollOptions = options.map((opt) => ({ text: opt }));

  try {
    const newPoll = await Polls.create({ question, options: pollOptions });
    return res.status(201).json(newPoll);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create poll." });
  }
};

const voteAPoll = async (req, res) => {
  const { pollId } = req.params;
  const { optionIndex } = req.body;

  try {
    const poll = await Polls.findById(pollId);
    if (!poll) {
      return res.status(404).json({ error: "Poll not found." });
    }

    // Check if optionIndex is within bounds
    if (optionIndex < 0 || optionIndex >= poll.options.length) {
      return res.status(400).json({ error: "Invalid option index." });
    }

    // Increment vote count for the selected option and overall votes
    poll.options[optionIndex].votes += 1;
    poll.totalVotes += 1;

    await poll.save();
    return res.status(200).json(poll);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to record vote." });
  }
};

const getAllPolls = async (req, res) => {
  try {
    const polls = await Polls.find({}); // see what you get after removing that object
    return res.status(200).json(polls);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch polls." });
  }
};

module.exports = { addNewPoll, voteAPoll, getAllPolls };
