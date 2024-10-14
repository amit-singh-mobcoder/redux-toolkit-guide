import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todoList: []
    },
    reducers: {
        setTodoList: (state, action) => {
            state.todoList = action.payload
        }
    }
})

export const { setTodoList } = todoSlice.actions
export default todoSlice.reducer
