//import logo from './logo.svg';
import "./App.css";
import Header from "./myComponents/Header";
//import {TodoItems} from "./myComponents/TodoItems";
import { Todos } from "./myComponents/Todos";
import { Footer } from "./myComponents/Footer";
import { AddTodo } from "./myComponents/AddTodo";
import { About } from "../src/myComponents/About";
import React, { useState, useEffect } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";



function App() {
  let initTodo;
  if (localStorage.getItem("todos") === null) {
    initTodo = [];
  } else {
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }

  const onDelete = (todo) => {
    setTodos(
      todos.filter((e) => {
        return e !== todo;
      })
    );
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const addTodo = (title, desc) => {
    console.log("im adding this todo", title, desc);
    let sno;
    if (todos.length == 0) {
      sno = 0;
    } else {
      sno = todos[todos.length - 1].sno + 1;
    }

    const myTodo = {
      sno: sno,
      title: title,
      desc: desc,
    };
    setTodos([...todos, myTodo]);
    console.log(myTodo);
  };
  const [todos, setTodos] = useState(initTodo);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
    <Router>
      <Header title="My TodoList" searchbar={true} />
      <Switch>
      <Route exact path="/" render={()=>{
        return(
         <>
               <AddTodo addTodo={addTodo} />
               <Todos todos={todos} onDelete={onDelete} />
        </> )
      }}>
          </Route>
          <Route exact path="/About">
            <About />
          </Route>
  
        </Switch>

      <Footer />
    </Router> 
    </>
  );
}

export default App;
