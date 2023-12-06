import React, { useEffect, useState } from 'react';
import { BsSearchHeart } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { FiPlus } from "react-icons/fi";

import notes from '../dummy_notes';
import NoteItem from '../components/NoteItem';
import { Link } from 'react-router-dom';


const Notes = ({notes}) => {
  const [showSearch, setShowSearch]= useState(false)
  const [text, setText]= useState("");
  const [filteredNotes, setFilteredNotes]= useState(notes);

const handleSearch = () =>{
  setFilteredNotes(
    notes.filter((note)=>{
      if(note.title.toLowerCase().match(text.toLocaleLowerCase())){
        return note;
      }
    })
  );
};
useEffect(handleSearch,[text]);
  return (
   <section className='container'>
    <header className='notes__header'>
    {!showSearch && <h2>Notlarım</h2>}
    {showSearch && (
      <input type="text" placeholder='Aramak İstediğiniz Kelimeyi Giriniz.' onChange={(e)=> {
      setText(e.target.value);
      handleSearch();
    }}
     />
    )}
    
    <button className='btn' onClick={()=> setShowSearch((prevState) => ! prevState) }>
      {showSearch ? <IoMdClose/> : <BsSearchHeart/>}

    </button>
    </header>
    <div className='notes__container'>
{filteredNotes.length == 0 && (<p className='empty_notes'>Not eklemek ister misiniz?</p>
)}
{filteredNotes.map((note) => (
  <NoteItem key={note.id} note={note} />
))}
    </div>
<Link className='btn add__btn' to="create-note">
<FiPlus/>
</Link>
    
   </section>
  )
}

export default Notes;