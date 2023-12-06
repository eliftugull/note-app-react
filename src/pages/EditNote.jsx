import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { TiArrowBackOutline } from "react-icons/ti";
import { MdDeleteSweep } from "react-icons/md";
import useCreateDate from "../components/useCreateDate";

const EditNote = ({ notes, setNotes }) => {
  const { id } = useParams();
  const note = notes.find((item) => item.id == id);
  const [title, setTitle] = useState(note.title);
  const [details, setDetails] = useState(note.details);
  const date = useCreateDate();
  const navigate = useNavigate();

  //console.log(id)
  //console.log(note)

  const handleForm = (e) => {
    e.preventDefault();
    if (title && details) {
      const newNote = { ...note, title, details, date };

      const newNotes = notes.map((item) => {
        if (item.id == id) {
          item = newNote;
        }
        return item;
      });
      setNotes(newNotes);
    } else {
      return;
    }
    navigate("/");
  };

  const handleDelete = () => {
    if (window.confirm("Silmek istediğinize emin misiniz?")) {
      const newNotes = notes.filter((item) => item.id != id);
      setNotes(newNotes);
      navigate("/");
    }
  };
  return (
    <section>
      <header className="create-note__header">
        <Link to={"/"} className="btn">
          <TiArrowBackOutline />
        </Link>
        <button className="btn lg primary">Kaydet</button>
        <button className="btn lg denger" onClick={handleDelete}>
          <MdDeleteSweep />
        </button>
      </header>
      <form className="create-note__form" onSubmit={handleForm}>
        <input
          type="text"
          placeholder="Başlık"
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          rows="28"
          placeholder="Not detayı..."
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        ></textarea>
      </form>
    </section>
  );
};

export default EditNote;
