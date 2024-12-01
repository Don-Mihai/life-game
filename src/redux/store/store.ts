import { configureStore } from '@reduxjs/toolkit';
import user from '../User';
import skill from '../Skill';
import common from '../Common';

export const store = configureStore({
  reducer: {
    user,
    skill,
    common
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
