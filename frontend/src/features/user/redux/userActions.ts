import { createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../api/UserService";

interface FetchParams {
  userId: string;
  startIndex: number;
  limit: number;
}

// Fetch Projects Incrementally
export const fetchMoreProjects = createAsyncThunk(
  "user/fetchMoreProjects",
  async (
    { userId, startIndex, limit }: FetchParams,
    { getState, dispatch }
  ) => {
    return UserService.fetchProjects(userId, startIndex, limit);
  }
);

// Fetch Tasks Incrementally
export const fetchMoreTasks = createAsyncThunk(
  "user/fetchMoreTasks",
  async (
    { userId, startIndex, limit }: FetchParams,
    { getState, dispatch }
  ) => {
    return UserService.fetchTasks(userId, startIndex, limit);
  }
);

// Fetch Friends Incrementally
export const fetchMoreColleagues = createAsyncThunk(
  "user/fetchMoreFriends",
  async (
    { userId, startIndex, limit }: FetchParams,
    { getState, dispatch }
  ) => {
    return UserService.fetchColleagues(userId, startIndex, limit);
  }
);
