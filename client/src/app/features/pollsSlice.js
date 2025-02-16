import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addNewPoll = createAsyncThunk(
  "poll/addNewPoll",
  async (pollData) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/addPoll`,
        pollData
      );
      console.log("Added Poll", response.data);
      return response.data;
    } catch (error) {
      console.log("Failed to add a poll", error);
    }
  }
);

export const updatePoll = createAsyncThunk(
  "poll/updatePoll",
  async ({ pollId, updatedData }) => {
    try {
      console.log("Poll id : ", pollId, "Updated data : ", updatedData);
      const response = await axios.post(
        `http://localhost:3000/polls/${pollId}`,
        updatedData
      );
      console.log("Updaed Poll : ", response.data);
      return response.data;
    } catch (error) {
      console.log("Failed to update poll", error);
    }
  }
);

export const getAllPolls = createAsyncThunk("poll/getAllPolls", async () => {
  try {
    const response = await axios.get(`http://localhost:3000/getPolls`);
    console.log("All polls : ", response.data);
    return response.data;
  } catch (error) {
    console.log("Can't fetch all polls");
  }
});

export const pollsSlice = createSlice({
  name: "polls",
  initialState: {
    allPolls: [],
    status: "idle",
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewPoll.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addNewPoll.fulfilled, (state, action) => {
        state.status = "success";
        state.allPolls.push(action.payload);
      })
      .addCase(addNewPoll.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload.message;
      })
      .addCase(updatePoll.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updatePoll.fulfilled, (state, action) => {
        state.status = "success";
        const pollIndex = state.allPolls.findIndex(
          (poll) => poll._id === action.payload._id
        );
        state.allPolls[pollIndex] = action.payload;
      })
      .addCase(updatePoll.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload.message;
      })
      .addCase(getAllPolls.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllPolls.fulfilled, (state, action) => {
        state.status = "success";
        state.allPolls = action.payload;
      })
      .addCase(getAllPolls.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload.message;
      });
  },
});

export default pollsSlice.reducer;
