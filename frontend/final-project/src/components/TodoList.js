import React, { useState, useContext } from 'react'
import MyContext from '../context/MyContext.js'
import toast, { Toaster } from 'react-hot-toast'
import SingleToDo from './SingleToDo.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "../styles/ToDoList.css"

const plusIcon = <FontAwesomeIcon icon={faCirclePlus} />;
const deleteIcon = <FontAwesomeIcon icon={faTrash} />;


export default function TodoList() {

  const [form, setForm] = useState(false);
  const { user, setUser } = useContext(MyContext)


  const addTaskButton = () => {
    setForm(!form)
  }

  const createTask = (e) => {

    e.preventDefault();

    fetch("/tasks", {
      method: "POST",
      body: JSON.stringify({ task: e.target.task.value, date: e.target.date.value === '' ? Date.now() : e.target.date.value, kanban: e.target.kanban.checked }),
      headers: { "Content-Type": "application/json", token: localStorage.getItem("token") }
    })
      .then(res => res.json())
      .then(result => {

        if (result.success) {
          toast.success("Task is successfully added.")
          setUser(result.data)
        } else {
          toast.error(JSON.stringify(result.message))
        }

      })

    setForm(!form)
  }


  const doneTask = user && user.tasks.filter(task => task.completed)
  const pendingTask = user && user.tasks.filter(task => !task.completed)




  return (
    <div className='container'>
      {/*     <h2>To Do List</h2> */}
      <button onClick={addTaskButton} className='add-button' >{plusIcon} Add Task</button>
      <div>
        {form && (

          <form onSubmit={createTask} className='create-task-form'>
            <label>Task: </label>
            <input type="text" name="task" required></input><br></br>
            <label>Due Date: </label>
            <input type="date" name="date"></input><br></br>
            <div className='checkbox'>
              <input type="checkbox" name="kanban" id='checkbox'></input>
              <label for='checkbox'>Add to Kanban Board</label>
            </div>
            <div className='create-task-form-button'>
              <button onClick={addTaskButton}>Cancel</button>
              <button>Save</button>
            </div>
          </form>

        )}
      </div>
      <div>
        {
          user && (
            <div className='tasks-container'>
              <div className='tasks-container-children'>
                <div className='title-border'>
                  <h3>Tasks</h3>
                </div>
                <ul>
                  {pendingTask.map((task) => {
                    //console.log(task.date)
                    //const date = [(task.date).split('').splice(0, 4), "/", (task.date).split('').splice(5, 2), "/", (task.date).split('').splice(8, 2)]
                    const date = task.date.slice(0,10).split('-').reverse().join('/')
                    //console.log(date.flat())
                    return (
                      <SingleToDo task={task} date={date} />
                    )
                  })}
                </ul>
              </div>
              <div className='tasks-container-children'>
                <div className='title-border'>
                  <h3>Done</h3>
                </div>
                <ul>
                  {doneTask.map((task) => {
                    console.log(task)
                    const date = [(task.date).split('').splice(0, 4), "/", (task.date).split('').splice(5, 2), "/", (task.date).split('').splice(8, 2)]
                    //console.log(date)

                    return (
                      <div className='task-list-container done-list-container'>
                        <li className='task-list' key={task._id}>{task.task}</li>
                        <span>{date.reverse()}</span>
                        <div className='done-button-container'>
                          <button onClick={(e) => {
                            e.preventDefault();

                            fetch(`tasks/completed/${task._id}`, {
                              method: "DELETE",
                              headers: { token: localStorage.getItem("token") }
                            })
                              .then(res => res.json())
                              .then(result => {
                                setUser(prevTask => {
                                  const updated = prevTask.tasks.filter((singleTask) => singleTask._id !== task._id)
                                  return { ...prevTask, tasks: updated }
                                })

                              })
                          }} className='editing-buttons'>{deleteIcon}</button>
                        </div>
                      </div>
                    )

                  })}
                </ul>
              </div>
            </div>
          )
        }
      </div>

      <Toaster position="top-center" />

    </div>
  )
}
