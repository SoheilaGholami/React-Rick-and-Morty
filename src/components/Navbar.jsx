import React, { useState } from "react";
import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import { episodes } from "../../data/data";
import Modal from "./Modal";
import { Character } from "./CharacterList";

function Navbar({ children }) {
  return (
    <div className="navbar">
      <div className="navbar__logo">LOGO</div>

      {children}
    </div>
  );
}

export default Navbar;

export function SearchResult({ numOfResult }) {
  return <div className="navbar__result">Found {numOfResult} characters</div>;
}

export function Search({ query, setQuery }) {
  return (
    <input
      value={query}
      type="text"
      className="text-field"
      placeholder="search ..."
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
export function Favourites({ favourites }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Modal
        onOpen={setIsOpen}
        open={isOpen}
        title={"List Of Favourite Characters"}
      >
        {favourites.map((item) => (
          <Character
            key={item.id}
            item={item}
            onSelectCharacter={() => {}}
            selectedId={"1"}
          >
            <button className="icon red" >
              <TrashIcon />
            </button>
          </Character>
        ))}
      </Modal>
      <button className="heart" onClick={() => setIsOpen((is) => !is)}>
        <HeartIcon className="icon" />
        <span className="badge">{favourites.length}</span>
      </button>
    </>
  );
}
