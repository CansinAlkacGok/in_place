import "../styles/NotesStyles.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GrEdit } from "react-icons/gr";
import { useContext } from "react";
import MyContext from "../context/MyContext";
import toast, { Toaster } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";


export default function Notes() {
  const { user, setUser } = useContext(MyContext);
  /* const [notes, setNotes] = useState([]); */
  const [showModalHealth, setShowModalHealth] = useState(false);
  const [showModalBusiness, setShowModalBusiness] = useState(false);
  const [showModalPersonal, setShowModalPersonal] = useState(false);
  const [showModalInspirations, setShowModalInspirations] = useState(false);


  const editIcon = <FontAwesomeIcon icon={faPenToSquare} />;

  // GET

  /*  const getAllNotes = () => {
    fetch(`/notes`, {
      method: "GET",
      headers: { token: localStorage.getItem("token") },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setNotes(result.notes);
        } else {
          console.log(result.message);
        }
      });
  };

  useEffect(() => {
    getAllNotes();
  }, []); */

  // CREATE

  const createHealthNotes = (e) => {
    e.preventDefault();
    fetch(`/notes/health`, {
      method: "POST",
      headers: {
        token: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: e.target.title.value,
        note: e.target.note.value,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          toast.success("New note created");
          /*      setNotes([...notes, result.note]); */
          setUser(result.data);
          e.target.reset();
          setShowModalHealth(false);
        } else {
          toast.error(result.message);
        }
      });
  };

  const createBusinessNotes = (e) => {
    e.preventDefault();
    fetch(`/notes/business`, {
      method: "POST",
      headers: {
        token: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: e.target.title.value,
        note: e.target.note.value,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          toast.success("New note created");
          setUser(result.data);
          e.target.reset();
          setShowModalBusiness(false);
        } else {
          toast.error(result.message);
        }
      });
  };

  const createInspirationsNotes = (e) => {
    e.preventDefault();
    fetch(`/notes/inspirations`, {
      method: "POST",
      headers: {
        token: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: e.target.title.value,
        note: e.target.note.value,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setUser(result.data);
          e.target.reset();
          setShowModalInspirations(false);
        } else {
          toast.error(result.message);
        }
      });
  };

  const createPersonalNotes = (e) => {
    e.preventDefault();
    fetch(`/notes/personal`, {
      method: "POST",
      headers: {
        token: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: e.target.title.value,
        note: e.target.note.value,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          toast.success("New note created");
          setUser(result.data);
          e.target.reset();
          setShowModalPersonal(false);
        } else {
          toast.error(result.message);
        }
      });
  };

  return (
    <div className="notesComponent">
      <Toaster position="top-center" />
      <div className="notesContainer">
        <h3 className="notesH3">Health:</h3>
        <div className="notesSection">
          <div className="notesTags">
            {user &&
              user.notes.map((item) => {
                return (
                  <section key={item._id}>
                    {item.health.map((element) => {
                      return (
                        <div className="noteTag health" key={element.note}>
                          <p className="noteTitle overflow-ellipsis">
                            {element.title}
                          </p>
                          <p className="overflow-ellipsis">{element.note}</p>
                          <p className="noteLink">
                            <Link to={`/home/notes/${item._id}`}>
                              <button className="editing-buttons">
                              {editIcon}
                              </button>
                        
                            </Link>
                          </p>
                        </div>
                      );
                    })}
                  </section>
                );
              })}
          </div>
          <button
            className="notesButton"
            onClick={() => setShowModalHealth(true)}
          >
            Add New Note
          </button>
          {showModalHealth && (
            <div className="modalHealth">
              <form onSubmit={createHealthNotes}>
                <input
                  className="notesInput"
                  type="text"
                  name="title"
                  placeholder="Title"
                />
                <textarea
                  className="notesTextarea"
                  type="text"
                  name="note"
                  placeholder="Note text"
                />

                <button className="notesButton">Submit</button>

                <button
                  className="notesButton"
                  type="button"
                  onClick={() => {
                    setShowModalHealth(false);
                  }}
                >
                  Cancel
                </button>
              </form>
            </div>
          )}
        </div>

        <h3 className="notesH3">Business:</h3>
        <div className="notesSection">
          <div className="notesTags">
            {user &&
              user.notes.map((item) => {
                return (
                  <section key={item._id}>
                    {item.business.map((element) => {
                      return (
                        <div key={element.note} className="noteTag business">
                          <p className="noteTitle overflow-ellipsis">
                            {element.title}
                          </p>
                          <p className="overflow-ellipsis">{element.note}</p>
                          <p className="noteLink">
                            <Link to={`/home/notes/${item._id}`}>
                            <button className="editing-buttons ">
                              {editIcon}
                              </button>
                            </Link>
                          </p>
                        </div>
                      );
                    })}
                  </section>
                );
              })}
          </div>
          <button
            className="notesButton"
            onClick={() => setShowModalBusiness(true)}
          >
            Add New Note
          </button>
          {showModalBusiness && (
            <div className="modalBusiness">
              <form onSubmit={createBusinessNotes}>
                <input
                  className="notesInput"
                  type="text"
                  name="title"
                  placeholder="Title"
                />
                <textarea
                  className="notesTextarea"
                  type="text"
                  name="note"
                  placeholder="Note text"
                />

                <button className="notesButton">Submit</button>

                <button
                  className="notesButton"
                  type="button"
                  onClick={() => {
                    setShowModalBusiness(false);
                  }}
                >
                  Cancel
                </button>
              </form>
            </div>
          )}
        </div>

        <h3 className="notesH3">Inspirations:</h3>
        <div className="notesSection">
          <div className="notesTags">
            {user &&
              user.notes.map((item) => {
                return (
                  <section key={item._id}>
                    {item.inspirations.map((element) => {
                      return (
                        <div
                          key={element.note}
                          className="noteTag inspirations"
                        >
                          <p className="noteTitle overflow-ellipsis">
                            {element.title}
                          </p>
                          <p className="overflow-ellipsis">{element.note}</p>
                          <p className="noteLink">
                            <Link to={`/home/notes/${item._id}`}>
                            <button className="editing-buttons ">
                              {editIcon}
                              </button>
                            </Link>
                          </p>
                        </div>
                      );
                    })}
                  </section>
                );
              })}
          </div>
          <button
            className="notesButton"
            onClick={() => setShowModalInspirations(true)}
          >
            Add New Note
          </button>
          {showModalInspirations && (
            <div className="modalInspirations">
              <form onSubmit={createInspirationsNotes}>
                <input
                  className="notesInput"
                  type="text"
                  name="title"
                  placeholder="Title"
                />
                <textarea
                  className="notesTextarea"
                  type="text"
                  name="note"
                  placeholder="Note text"
                />

                <button className="notesButton">Submit</button>

                <button
                  className="notesButton"
                  type="button"
                  onClick={() => {
                    setShowModalInspirations(false);
                  }}
                >
                  Cancel
                </button>
              </form>
            </div>
          )}
        </div>

        <h3 className="notesH3">Personal:</h3>
        <div className="notesSection">
          <div className="notesTags">
            {user &&
              user.notes.map((item) => {
                return (
                  <section key={item._id}>
                    {item.personal.map((element) => {
                      return (
                        <div key={element.note} className="noteTag personal">
                          <p className="noteTitle overflow-ellipsis">
                            {element.title}
                          </p>
                          <p className="overflow-ellipsis">{element.note}</p>
                          <p className="noteLink">
                            <Link to={`/home/notes/${item._id}`}>
                            <button className="editing-buttons ">
                              {editIcon}
                              </button>
                            </Link>
                          </p>
                        </div>
                      );
                    })}
                  </section>
                );
              })}
          </div>
          <button
            className="notesButton"
            onClick={() => setShowModalPersonal(true)}
          >
            Add New Note
          </button>
          {showModalPersonal && (
            <div className="modalPersonal">
              <form onSubmit={createPersonalNotes}>
                <input
                  className="notesInput"
                  type="text"
                  name="title"
                  placeholder="Title"
                />
                <textarea
                  className="notesTextarea"
                  type="text"
                  name="note"
                  placeholder="Note text"
                />

                <button className="notesButton">Submit</button>

                <button
                  className="notesButton"
                  type="button"
                  onClick={() => {
                    setShowModalPersonal(false);
                  }}
                >
                  Cancel
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
