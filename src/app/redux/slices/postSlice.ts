import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = [
    { id: 1, title: 'First Post!', content: 'Hello!' }
];

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPost(state, action: PayloadAction<{ id: number, title: string, content: string }>) {
            state.push(action.payload);
        },
        deletePost(state, action: PayloadAction<number>) {
            const postId = action.payload;
            return state.filter((post) => post.id !== postId);
        },
    }
})

export const { addPost, deletePost } = postSlice.actions;
export default postSlice.reducer;