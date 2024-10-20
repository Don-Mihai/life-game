import { configureStore } from '@reduxjs/toolkit';
import user from '../User/index.ts';
import skill from '../Skill/index.js';

export const store = configureStore({
  reducer: {
    user,
    skill,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
