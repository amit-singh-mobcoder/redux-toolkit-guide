import React, { useEffect } from "react";
import axios from "axios";
import { setTodoList } from "../features/Todos/todoSlice";
import { useSelector, useDispatch } from "react-redux";

const Todos = () => {
  const todos = useSelector((state) => state.todos.todoList);
  const dispatch = useDispatch();

  const handleChangeStatus = (todoId) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        const tempTodo = { ...todo };
        tempTodo.completed = !tempTodo.completed;
        return tempTodo;
      }
      return todo;
    });

    dispatch(setTodoList(updatedTodos));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      console.log("todos", response.data);
      dispatch(setTodoList(response.data));
    } catch (error) {
      console.error("Error while fetching todos", error);
    }
  };

  return (
    <>
      <div className="min-h-[50px] flex justify-center items-center bg-[#ba8fff] shadow-lg">
        <p className="font-extrabold text-[30px] text-white">Todos</p>
      </div>
      <div className="flex flex-col gap-4 justify-center items-center mt-8 p-4">
        <div className="bg-indigo-100 p-4 border-l-4 border-r-4 border-indigo-500 rounded-md font-medium text-indigo-500">Double click on todos, to mark it completed or vice-versa</div>
        {todos.length > 0 ? (
          todos.map((todo) => (
            <div
              key={todo.id}
              className={`${
                todo.completed ? "bg-green-100 border-green-400" : "bg-red-100 border-red-400"
              } border-l-4 p-2 rounded-md w-full max-w-md transition-all duration-300 hover:shadow-md cursor-pointer`}
              onDoubleClick={() => handleChangeStatus(todo.id)}
            >
              <p className={`font-medium ${todo.completed ? "text-green-600" : "text-red-600"}`}>
                {todo.title}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No todos available.</p>
        )}
      </div>
    </>
  );
};

export default Todos;