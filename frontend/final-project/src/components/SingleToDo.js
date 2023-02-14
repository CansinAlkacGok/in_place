import React, { useState, useContext } from 'react';
import MyContext from '../context/MyContext.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faSquareCheck } from '@fortawesome/free-regular-svg-icons';
import "../styles/ToDoList.css"

const deleteIcon = <FontAwesomeIcon icon={faTrash} />;
const editIcon = <FontAwesomeIcon icon={faPenToSquare} />;
const doneIcon = <FontAwesomeIcon icon={faSquareCheck} />

export default function SingleToDo({ task, date }) {

    const [editing, setEditing] = useState(false);

    const { user, setUser } = useContext(MyContext)

/* const editedDate= task.date.slice(0,10).split('-').reverse().join('/')
console.log(editedDate) */


    const handleUpdate = (e) => {

        e.preventDefault()

        fetch(`/tasks/${task._id}`, {
            method: "PATCH",
            body: JSON.stringify({ task: e.target.task.value, date: e.target.date.value === '' ? Date.now() : e.target.date.value}),
            headers: { "Content-Type": "application/json", token: localStorage.getItem("token") }
        })
            .then(res => res.json())
            .then(result => {
                console.log(result)

                setUser((prevTask) => {
                    const updated = prevTask.tasks.map((task) => {

                        if (task._id === result.task._id) {
                            return result.task
                        } else {
                            return task
                        }
                    })
                    return { ...prevTask, tasks: updated }
                })

            })

        setEditing(!editing)
    }

    const handleDelete = (e) => {
        e.preventDefault();

        fetch(`tasks/${task._id}`, {
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
    }

    const handleDone = (e) => {
        e.preventDefault();

        fetch(`tasks/completed/${task._id}`, {
            method: "PATCH",
            headers: { token: localStorage.getItem("token") }
        })
            .then(res => res.json())
            .then(result => {
                /*  setUser(prevTask => {
                       const updatedTasks = prevTask.tasks.map(task => {
                           if (task._id === result.task._id) {
                               task.completed = true;
                           }
                           return task;
                       });
                       return { ...prevTask, tasks: [...updatedTasks] };
                   });  */
                setUser({
                    ...user, tasks: user.tasks.map(task => {
                        if (task._id === result.data._id) {
                            return result.data
                        } else {
                            return task
                        }
                    })
                })

            });
    };


    return (
        <div className='task-list-container'>

            <li className='task-list' key={task._id}>{task.task}</li>
            <span>{date}</span>
            <div className='editing-buttons-container'>
                <div>
                    <button onClick={() => { setEditing(!editing) }} className='editing-buttons'>{editIcon}</button>
                    <button onClick={handleDelete}
                        className='editing-buttons'>{deleteIcon}</button>
                </div>
                <div>
                    <button onClick={handleDone} className='editing-buttons done-button'>{doneIcon}</button>
                </div>

            </div>
            <div>
                {
                    editing && (
                        <form onSubmit={handleUpdate} className='edit-task-form'>
                            <label>Task: </label>
                            <input type="text" name="task" defaultValue={task.task}></input><br></br>
                            <label>Due Date: </label>
                            <input type="date" name="date"></input><br></br>
                            <div className='edit-form-buttons'>
                                <button onClick={() => setEditing(!editing)}>Cancel</button>
                                <button>Save</button>
                            </div>
                        </form>
                    )
                }
            </div>

        </div>
    )

}
