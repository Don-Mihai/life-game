import { configureStore } from '@reduxjs/toolkit';
import user from './User';
import skill from './Skill';
import common from './Common';
import characteristic from './Characteristic';

export const store = configureStore({
  reducer: {
    user,
    skill,
    common,
    characteristic
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
