import {
  Button,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, removeTodo, toggleTodo } from "../redux/todoSlice";

const TodoList = () => {
  const [todoText, setTodoText] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.todos);

  useEffect(() => {
    const storedError = localStorage.getItem("error");
    if (storedError) {
      setError(storedError);
    }
  }, []);

  const handleAddTodo = () => {
    if (todoText) {
      const newTodo = {
        id: Date.now(),
        text: todoText,
        completed: false,
      };

      dispatch(addTodo(newTodo));
      setTodoText("");
      const updatedTodos = [...todos, newTodo];
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      setError("");
    } else {
      setError("This is a required field");
    }
  };

  const handleRemoveTodo = (id) => {
    dispatch(removeTodo(id));
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const handleToggleTodo = (todo) => {
    dispatch(
      toggleTodo({
        id: todo.id,
        completed: !todo.completed,
      }),
    );
  };

  return (
    <div className="container">
      <h1> Todo App</h1>
      <br />
      <TextField
        label="Add Todo"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        required
      />

      <Button variant="contained" color="primary" onClick={handleAddTodo}>
        Add
      </Button>
      <div className="error">{error}</div>
      <List>
        {todos.map((todo) => (
          <ListItem key={todo.id}>
            <Checkbox
              checked={todo.completed}
              onChange={() => handleToggleTodo(todo)}
              color="primary"
            />
            <ListItemText
              primary={todo.text}
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                backgroundColor: todo.completed ? "green" : "none",
              }}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={() => handleRemoveTodo(todo.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default TodoList;
