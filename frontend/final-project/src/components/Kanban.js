import React, { useState, useContext, useEffect } from "react";
import MyContext from "../context/MyContext";
import "../styles/Kanban.css";

// Font Awesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
const deleteIcon = <FontAwesomeIcon icon={faTrash} />;
const editIcon = <FontAwesomeIcon icon={faPenToSquare} />;
const plusIcon = <FontAwesomeIcon icon={faSquarePlus} />;

export default function Kanban() {
  const { user, setUser } = useContext(MyContext);
  const [doArray, setDoArray] = useState([]);
  const [doingArray, setDoingArray] = useState([]);
  const [doneArray, setDoneArray] = useState([]);

  // States for Edit Task
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState({
    title: "",
    task: "",
  });

  // States for New Task
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    task: "",
    status: "do",
  });

  //  ---- Create New Task ----

  const handleAdd = (task) => {
    setShowModalCreate(true);
    setShowModal(false);
  };

  const handleCreateTask = async () => {
    try {
      const response = await fetch("/kanban", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify(newTask),
      });
      const data = await response.json();
      setUser(data.data);
      setShowModalCreate(false);
    } catch (err) {
      console.error(err);
    }
  };

  //  ---- Edit Task ----
  const handleEdit = (task) => {
    setShowModalCreate(false);
    setEditTask(task);
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/kanban/${editTask._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify(editTask),
      });
      const result = await response.json();

      setUser((prevState) => {
        const updatedKanban = prevState.kanban.map((task) => {
          if (task._id === result.data._id) {
            return result.data;
          }
          return task;
        });
        return { ...prevState, kanban: updatedKanban };
      });
      setShowModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  // ---- Filter through all the Kanban Tasks and sort them according to status (do, doing, done)

  useEffect(() => {
    const filteredTasks = user.kanban.reduce(
      (acc, task) => {
        if (task.status === "do") {
          acc[0].push(task);
        } else if (task.status === "doing") {
          acc[1].push(task);
        } else if (task.status === "done") {
          acc[2].push(task);
        }
        return acc;
      },
      [[], [], []]
    );

    setDoArray(filteredTasks[0]);
    setDoingArray(filteredTasks[1]);
    setDoneArray(filteredTasks[2]);
  }, [user]);

  // ---- Delete Task ----
  const handleDelete = (taskId) => {
    fetch(`/kanban/${taskId}`, {
      method: "DELETE",
      headers: {
        token: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser((prevState) => {
          const updatedKanban = prevState.kanban.filter(
            (task) => task._id !== taskId
          );
          return { ...prevState, kanban: updatedKanban };
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // ---- drag and drop ----
  const handleDrag = (e, task) => {
    e.dataTransfer.setData("task", JSON.stringify(task));
  };

  const handleDrop = (e, status) => {
    let task = JSON.parse(e.dataTransfer.getData("task"));
    task.status = status;

    console.log(task)


    fetch(`/kanban/${task._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        status: status,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUser((prevState) => {
          const updatedKanban = prevState.kanban.map((item) => {
            if (item._id === task._id) {
              return { ...item, status: status };
            }
            return item;
          });
          return { ...prevState, kanban: updatedKanban };
        });
      })

      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <div className="kanban-container">
        {/* ---- Modal for editing a Task---- */}
        {showModal && (
          <>
            <div className="kanban-modal-edit">
              <h2>Edit Task</h2>

              <input
                type="text"
                value={editTask.title}
                onChange={(e) =>
                  setEditTask({ ...editTask, title: e.target.value })
                }
              />

              <textarea
                type="text"
                placeholder="Task"
                value={editTask.task}
                onChange={(e) =>
                  setEditTask({ ...editTask, task: e.target.value })
                }
              />

              <div>
                <button onClick={() => setShowModal(false)}>Cancel</button>
                <button onClick={handleSave}>Save</button>
              </div>
            </div>
          </>
        )}

        {/* ---- Modal for Creating a new Task ---- */}
        <div>
          <button onClick={handleAdd} className="add-task-btn">
            {" "}
            {plusIcon} Add Task
          </button>
          {showModalCreate && (
            <div className="kanban-modal-create">
              <h2>Create New Task</h2>

              <input
                type="text"
                placeholder="Title"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
              />
              <textarea
                type="text"
                placeholder="Task"
                value={newTask.task}
                onChange={(e) =>
                  setNewTask({ ...newTask, task: e.target.value })
                }
              />

              <div>
                <button onClick={() => setShowModalCreate(false)}>
                  Cancel
                </button>
                <button onClick={handleCreateTask}>Save</button>
              </div>
            </div>
          )}
        </div>

        {/* ---- First Column ---- */}
        <div className="board-container">
          <div
            className="board-column"
            onDrop={(e) => handleDrop(e, "do")}
            onDragOver={(e) => e.preventDefault()}
          >
            <h3 className="kanban-column-header">To Do</h3>
            {doArray
              .filter((task) => task.status === "do")
              .map((task) => (
                <div
                  key={task._id}
                  className="board-task"
                  draggable
                  onDragStart={(e) => handleDrag(e, task)}
                >
                  {" "}
                  <h3>{task.title}</h3>
                  <p>{task.task}</p>
                  <div className="taskIcons">
                    <button onClick={() => handleEdit(task)}>{editIcon}</button>
                    <button onClick={() => handleDelete(task._id)}>
                      {deleteIcon}
                    </button>
                  </div>
                </div>
              ))}
          </div>

          {/* ---- Second Column ---- */}
          <div
            className="board-column"
            onDrop={(e) => handleDrop(e, "doing")}
            onDragOver={(e) => e.preventDefault()}
          >
            <h3 className="kanban-column-header">In Progress</h3>
            {doingArray
              .filter((task) => task.status === "doing")
              .map((task) => (
                <div
                  key={task._id}
                  className="board-task"
                  draggable
                  onDragStart={(e) => handleDrag(e, task)}
                >
                  <h3>{task.title}</h3>
                  <p>{task.task}</p>
                  <div className="taskIcons">
                    <button onClick={() => handleEdit(task)}>{editIcon}</button>
                    <button onClick={() => handleDelete(task._id)}>
                      {deleteIcon}
                    </button>
                  </div>
                </div>
              ))}
          </div>

          {/* ---- Third Column ---- */}
          <div
            className="board-column"
            onDrop={(e) => handleDrop(e, "done")}
            onDragOver={(e) => e.preventDefault()}
          >
            <h3 className="kanban-column-header">Done</h3>
            {doneArray
              .filter((task) => task.status === "done")
              .map((task) => (
                <div
                  key={task._id}
                  className="board-task"
                  draggable
                  onDragStart={(e) => handleDrag(e, task)}
                >
                  <h3>{task.title}</h3>
                  <p>{task.task}</p>
                  <div className="taskIcons">
                    <button onClick={() => handleEdit(task)}>{editIcon}</button>
                    <button onClick={() => handleDelete(task._id)}>
                      {deleteIcon}
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
