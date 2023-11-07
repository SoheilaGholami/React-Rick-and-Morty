import React from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

function CharacterList({
  selectedId,
  characters,
  isLoading,
  onSelectCharacter,
}) {
  if (isLoading) {
    return <div className="characters-list">Is Loading ...</div>;
  }
  return (
    <div className="characters-list">
      {characters.map((item) => (
        <Character
          selectedId={selectedId}
          key={item.id}
          item={item}
          onSelectCharacter={onSelectCharacter}
        >
          <button
            className="icon red"
            onClick={() => onSelectCharacter(item.id)}
          >
            {selectedId === item.id ? <EyeSlashIcon /> : <EyeIcon />}
          </button>
        </Character>
      ))}
    </div>
  );
}

export default CharacterList;

export function Character({ item, children }) {
  return (
    <div className="list__item">
      <img src={item.image} alt={item.name} />
      <h3 className="name">
        <span>{item.gender === "Male" ? "(m)" : "(f)"}</span>
        <span>{item.name}</span>
      </h3>
      <div className="list-item__info">
        <span
          className={`status ${item.status === "Dead" ? "red" : "green"}`}
        ></span>
        <span> {item.status}</span>
        <span> - {item.species}</span>
      </div>
      {children}
    </div>
  );
}
