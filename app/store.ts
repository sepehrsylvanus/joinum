import { configureStore } from "@reduxjs/toolkit";
import orders from "@/features/orders/orderSlice";
export const store = configureStore({
  reducer: {
    orders,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
