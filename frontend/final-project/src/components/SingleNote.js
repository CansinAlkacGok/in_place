import React from "react";
import "../styles/NotesStyles.css";
import { useState } from "react";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useContext } from "react";
import MyContext from "../context/MyContext";
import toast, { Toaster } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

export default function SingleHealthNote() {
  const navigate = useNavigate();
  const { setUser } = useContext(MyContext);
  const [singleHealthNote, setSingleHealthNote] = useState(null);
  const [singleBusinessNote, setSingleBusinessNote] = useState(null);
  const [singleInspirationsNote, setSingleInspirationsNote] = useState(null);
  const [singlePersonalNote, setSinglePersonalNote] = useState(null);
  const [editClicked, setEditClicked] = useState(false);
  const deleteIcon = <FontAwesomeIcon icon={faTrash} />;
  const editIcon = <FontAwesomeIcon icon={faPenToSquare} />;
  const { id } = useParams();

  useEffect(() => {
    getSingleHealthNote(id);
    getSingleBusinessNote(id);
    getSingleInspirationsNote(id);
    getSinglePersonalNote(id);
  }, [id]);

  const goBack = () => {
    navigate("/home/notes");
  };

  // GET

  const getSingleHealthNote = (id) => {
    fetch(`/notes/health/${id}`, {
      method: "GET",
      headers: { token: localStorage.getItem("token") },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setSingleHealthNote(result.note[0]);
        } else {
          console.log(result.message);
        }
      });
  };

  const getSingleBusinessNote = (id) => {
    fetch(`/notes/business/${id}`, {
      method: "GET",
      headers: { token: localStorage.getItem("token") },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setSingleBusinessNote(result.note[0]);
        } else {
          console.log(result.message);
        }
      });
  };

  const getSingleInspirationsNote = (id) => {
    fetch(`/notes/inspirations/${id}`, {
      method: "GET",
      headers: { token: localStorage.getItem("token") },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setSingleInspirationsNote(result.note[0]);
        } else {
          console.log(result.message);
        }
      });
  };

  const getSinglePersonalNote = (id) => {
    fetch(`/notes/personal/${id}`, {
      method: "GET",
      headers: { token: localStorage.getItem("token") },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setSinglePersonalNote(result.note[0]);
        } else {
          console.log(result.message);
        }
      });
  };

  // DELETE

  const deleteHealthNote = (id) => {
    fetch(`/notes/health/${id}`, {
      method: "DELETE",
      headers: { token: localStorage.getItem("token") },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
         /*  const newNotes = notes.filter((item) => item._id !== id); */
         /*  setNotes(newNotes); */
         setUser(result.data)
          toast.success("Note deleted");
          setTimeout(() => {
            navigate("/home/notes");
          }, 1000);
        } else {
          console.log(result.message);
        }
      });
  };

  const deleteBusinessNote = (id) => {
    fetch(`/notes/business/${id}`, {
      method: "DELETE",
      headers: { token: localStorage.getItem("token") },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setUser(result.data)
          toast.success("Note deleted");
          setTimeout(() => {
            navigate("/home/notes");
          }, 1000);
        } else {
          console.log(result.message);
        }
      });
  };

  const deleteInspirationsNote = (id) => {
    fetch(`/notes/inspirations/${id}`, {
      method: "DELETE",
      headers: { token: localStorage.getItem("token") },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setUser(result.data)
          toast.success("Note deleted");
          setTimeout(() => {
            navigate("/home/notes");
          }, 1000);
        } else {
          console.log(result.message);
        }
      });
  };

  const deletePersonalNote = (id) => {
    fetch(`/notes/personal/${id}`, {
      method: "DELETE",
      headers: { token: localStorage.getItem("token") },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setUser(result.data)
          toast.success("Note deleted");
          setTimeout(() => {
            navigate("/home/notes");
          }, 1000);
        } else {
          console.log(result.message);
        }
      });
  };

  // EDIT

  const editHealthNotes = (e) => {
    e.preventDefault();
    fetch(`/notes/health/${id}`, {
      method: "PATCH",
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
          toast.success("Note edited");
          /* setNotes(
            notes.map((item) => {
              if (item._id === result.note._id) {
                return result.note;
              } else {
                return item;
              }
            })
          ); */
          setUser(result.data)
          setTimeout(() => {
            navigate("/home/notes");
          }, 1500);
        } else {
          toast.error(result.message);
        }
      });
  };

  const editBusinessNotes = (e) => {
    e.preventDefault();
    fetch(`/notes/business/${id}`, {
      method: "PATCH",
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
          toast.success("Note edited");
          setUser(result.data)
          setTimeout(() => {
            navigate("/home/notes");
          }, 1500);
        } else {
          toast.error(result.message);
        }
      });
  };

  const editInspirationsNotes = (e) => {
    e.preventDefault();
    fetch(`/notes/inspirations/${id}`, {
      method: "PATCH",
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
          toast.success("Note edited");
          setUser(result.data)
          setTimeout(() => {
            navigate("/home/notes");
          }, 1500);
        } else {
          toast.error(result.message);
        }
      });
  };

  const editPersonalNotes = (e) => {
    e.preventDefault();
    fetch(`/notes/personal/${id}`, {
      method: "PATCH",
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
          toast.success("Note edited");
          setUser(result.data)
          setTimeout(() => {
            navigate("/home/notes");
          }, 1500);
        } else {
          toast.error(result.message);
        }
      });
  };

  return (
    <div className="singleNoteContainer">
      <Toaster position="top-center" />
      <div className="backButton">
        <button className="notesButton" onClick={goBack}>
          <AiOutlineArrowLeft />
        </button>
        <div>
          {singleHealthNote && (
            <>
              <button
                className="notesButton"
                onClick={() => setEditClicked((current) => !current)}
              >
                {editIcon}
              </button>
              <button
                className="notesButton"
                onClick={() => deleteHealthNote(id)}
              >
                {deleteIcon}
              </button>
            </>
          )}
          {singleBusinessNote && (
            <>
              <button
                className="notesButton"
                onClick={() => setEditClicked((current) => !current)}
              >
               {editIcon}
              </button>
              <button
                className="notesButton"
                onClick={() => deleteBusinessNote(id)}
              >
                 {deleteIcon}
              </button>
            </>
          )}
          {singleInspirationsNote && (
            <>
              <button
                className="notesButton"
                onClick={() => setEditClicked((current) => !current)}
              >
              {editIcon}
              </button>
              <button
                className="notesButton"
                onClick={() => deleteInspirationsNote(id)}
              >
                 {deleteIcon}
              </button>
            </>
          )}
          {singlePersonalNote && (
            <>
              <button
                className="notesButton"
                onClick={() => setEditClicked((current) => !current)}
              >
              {editIcon}
              </button>
              <button
                className="notesButton"
                onClick={() => deletePersonalNote(id)}
              >
                 {deleteIcon}
              </button>
            </>
          )}
        </div>
      </div>

      {editClicked === false && (
        <>
          <h1 className="singleNoteTitle">
            {singleHealthNote ? singleHealthNote.title : ""}
          </h1>
          <h1 className="singleNoteTitle">
            {singleBusinessNote ? singleBusinessNote.title : ""}
          </h1>
          <h1 className="singleNoteTitle">
            {singleInspirationsNote ? singleInspirationsNote.title : ""}
          </h1>
          <h1 className="singleNoteTitle">
            {singlePersonalNote ? singlePersonalNote.title : ""}
          </h1>

          <p className="singleNoteParagraph">
            {singleHealthNote ? singleHealthNote.note : ""}
          </p>
          <p className="singleNoteParagraph">
            {singleBusinessNote ? singleBusinessNote.note : ""}
          </p>
          <p className="singleNoteParagraph">
            {singleInspirationsNote ? singleInspirationsNote.note : ""}
          </p>
          <p className="singleNoteParagraph">
            {singlePersonalNote ? singlePersonalNote.note : ""}
          </p>
        </>
      )}
      {editClicked === true && singleHealthNote && (
        <>
          <form onSubmit={editHealthNotes} className="editModal">
            <input
              className="notesInput"
              type="text"
              name="title"
              defaultValue={singleHealthNote.title}
            />
            <textarea
              className="editNotesTextarea"
              type="text"
              name="note"
              defaultValue={singleHealthNote.note}
            ></textarea>
            <button className="notesButton">Save</button>
          </form>
        </>
      )}

      {editClicked === true && singleBusinessNote && (
        <>
          <form onSubmit={editBusinessNotes} className="editModal">
            <input
              className="notesInput"
              type="text"
              name="title"
              defaultValue={singleBusinessNote.title}
            />
            <textarea
              className="editNotesTextarea"
              type="text"
              name="note"
              defaultValue={singleBusinessNote.note}
            ></textarea>
            <button className="notesButton">Save</button>
          </form>
        </>
      )}

      {editClicked === true && singleInspirationsNote && (
        <>
          <form onSubmit={editInspirationsNotes} className="editModal">
            <input
              className="notesInput"
              type="text"
              name="title"
              defaultValue={singleInspirationsNote.title}
            />
            <textarea
              className="editNotesTextarea"
              type="text"
              name="note"
              defaultValue={singleInspirationsNote.note}
            ></textarea>
            <button className="notesButton">Save</button>
          </form>
        </>
      )}

      {editClicked === true && singlePersonalNote && (
        <>
          <form onSubmit={editPersonalNotes} className="editModal">
            <input
              className="notesInput"
              type="text"
              name="title"
              defaultValue={singlePersonalNote.title}
            />
            <textarea
              className="editNotesTextarea"
              type="text"
              name="note"
              defaultValue={singlePersonalNote.note}
            ></textarea>
            <button className="notesButton">Save</button>
          </form>
        </>
      )}
    </div>
  );
}
