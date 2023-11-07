import React, { useEffect, useState } from "react";
import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import axios, { all } from "axios";
import Loader from "./Loader.jsx";
import toast from "react-hot-toast";

function CharacterDetail({ selectedId, addToFavourites, isAddFavourite }) {
  const [character, setCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [episodes, setEpisodes] = useState([]);
  const [allepisodes, setAllEpisodes] = useState([]);
  const handleShowEpisodes = function () {
    setEpisodes([allepisodes].flat().slice(0, episodes.length + 5));
  };

  useEffect(() => {
    async function fetchSelectedCharacter() {
      try {
        setIsLoading(true);
        setCharacter(null);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/${selectedId}`
        );
        setCharacter(data);
        const episodesId = data.episode.map((e) => e.split("/").at(-1));
        const { data: episodeData } = await axios.get(
          `https://rickandmortyapi.com/api/episode/${episodesId}`
        );

        setEpisodes([episodeData].flat().slice(0, 5));
        setAllEpisodes([episodeData].flat());
      } catch (err) {
        toast.error(err.response.data.error);
      } finally {
        setIsLoading(false);
      }
    }
    if (selectedId) fetchSelectedCharacter();
  }, [selectedId]);

  if (isLoading) {
    return (
      <div style={{ flex: 1 }}>
        <Loader />
      </div>
    );
  }
  if (!character || !selectedId)
    return (
      <div style={{ flex: 1 }}>
        <div className="badge"> please select a character</div>
      </div>
    );
  return (
    <div style={{ flex: 1 }}>
      <CharacterInfo
        character={character}
        isAddFavourite={isAddFavourite}
        addToFavourites={addToFavourites}
      />
      <EpisodesList
        episodes={episodes}
        handleShowEpisodes={handleShowEpisodes}
      />
    </div>
  );
}

export default CharacterDetail;

function CharacterInfo({ character, addToFavourites, isAddFavourite }) {
  return (
    <div className="character-detail">
      <img
        className="character-detail__img"
        src={character.image}
        alt={character.name}
      />
      <div className="character-detail__info">
        <h3 className="name">
          <span>{character.gender === "Male" ? "(m)" : "(f)"}</span>
          <span>&nbsp;{character.name}</span>
        </h3>
        <div className="info">
          <span
            className={`status ${
              character.status === "Dead" ? "red" : "green"
            }`}
          ></span>
          <span> {character.status}</span>
          <span> - {character.species}</span>
        </div>
        <div className="location">
          <p>last known location:</p>
          <p>{character.location.name}</p>
        </div>
        <div className="actions">
          {isAddFavourite ? (
            <p>already this character is to favourite</p>
          ) : (
            <button
              onClick={() => addToFavourites(character)}
              className="btn btn--primary"
            >
              Add to favorit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function EpisodesList({ episodes, handleShowEpisodes }) {
  const [sortBy, setSortBy] = useState(true);
  let sortedEpisodes;

  if (sortBy) {
    sortedEpisodes = [...episodes].sort(
      (a, b) => new Date(a.created) - new Date(b.created)
    );
  } else {
    sortedEpisodes = [...episodes].sort(
      (a, b) => new Date(b.created) - new Date(a.created)
    );
  }

  return (
    <div className="character-episodes">
      <div className="title">
        <h2>List Of Episodes : </h2>
        <button onClick={() => setSortBy((is) => !is)}>
          <ArrowUpCircleIcon className="icon" style={{rotate:sortBy?"0deg":"180deg"}} />
        </button>
      </div>
      <ul>
        {sortedEpisodes.map((item, index) => (
          <li key={item.id}>
            <div>
              {String(index + 1).padStart(2, "0")} - {item.episode}:{" "}
              <strong>{item.name}</strong>
            </div>
            <div className="badge badge--secondary">{item.air_date}</div>
          </li>
        ))}
      </ul>
      <button className="show-more" onClick={handleShowEpisodes}>
        show more
      </button>
    </div>
  );
}
