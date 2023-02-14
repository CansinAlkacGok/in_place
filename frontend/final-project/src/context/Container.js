import React, { useEffect, useState } from "react";
import MyContext from "./MyContext.js";
import { useNavigate } from "react-router-dom";


export default function Container(props) {
  const [user, setUser] = useState(null);
  
  const [allTasks, setTasks] = useState([]);
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("/users/checkusertoken", {
        method: "GET",
        headers: { token: token },
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.success) {
            setUser(result.data);
          } else {
            navigate("/login");
          }
        });
    }

    const getTasks = () => {
      fetch("/tasks",{
       method: "GET",
       headers: {token: localStorage.getItem("token")}
     })
     .then(res => res.json())
     .then(result => {
      //console.log(result.tasks)
      setTasks([...result.tasks])})
   }
 
   getTasks();

  }, [navigate]);

  //console.log(tasks)

  return (

    <MyContext.Provider value={{ user, setUser, allTasks, setTasks , notes, setNotes }}>

      {props.children}
    </MyContext.Provider>
  );
}
