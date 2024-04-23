import { configureStore } from "@reduxjs/toolkit";
// ...
import viewsReducer from "./viewsReducer.ts";
import authReducer from "./authReducer.ts";

const store = configureStore({
  reducer: {
    views: viewsReducer,
    auth: authReducer,
    // posts: postsReducer,
    // comments: commentsReducer,
    // users: usersReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
