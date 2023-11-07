import { useEffect, useState } from "react";
import "./App.css";
import Navbar, { SearchResult, Search, Favourites } from "./components/Navbar";
import CharacterList from "./components/CharacterList";
import CharacterDetail from "./components/CharacterDetail";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { character } from "../data/data";
import Modal from "./components/Modal";

function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/?name=${query}`,
          { signal }
        );
        setCharacters(data.results);
        // setIsLoading(false);
      } catch (err) {
        if (axios.isCancel()) {
          console.log("cancled");
        } else {
          setCharacters([]);
          toast.error(err.response.data.error);
        }
        // setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();

    // cleanup function
    return () => {
      controller.abort();
    };
  }, [query]);

  // useEffect(() => {
  //   setIsLoading(true);
  //   async function fetchData() {
  //     try {
  //       const res = await fetch("https://rickandmortyapi.com/api/character");
  //       const data = await res.json();
  //       if (!res.ok) throw new Error("something went wronge");
  //       setCharacters(data.results);
  //       // setIsLoading(false);
  //     } catch (err) {
  //       // setIsLoading(false);
  //       toast.error(err.message);
  //     } finally{
  //       setIsLoading(false);
  //     }
  //   }
  //   fetchData();
  // }, []);

  // useEffect(()=>{
  //   setIsLoading(true);
  //   fetch("https://rickandmortyapi.com/api/character")
  //     .then((res) => {
  //       if(!res.ok) throw new Error("something wnt wronge")
  //       return res.json()
  //     })
  //     .then((data) => {
  //       setCharacters(data.results);
  //       // setIsLoading(false);
  //     }).catch(err=>{
  //       // setIsLoading(false);
  //       toast.error(err.message);
  //     }).finally(()=> setIsLoading(false));
  // },[])

  const handleSelectCharacter = (id) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
  };
  const handleAddFavourite = (char) => {
    setFavourites((prev) => [...prev, char]);
  };
  const isAddFavourite = favourites.map((fav) => fav.id).includes(selectedId);
  return (
    <div className="app">
      <Toaster />
      <Modal title={"mdal test"}/>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <SearchResult numOfResult={characters.length} />
        <Favourites favourites={favourites} />
      </Navbar>
      <div className="main">
        <CharacterList
          selectedId={selectedId}
          characters={characters}
          isLoading={isLoading}
          onSelectCharacter={handleSelectCharacter}
        />
        <CharacterDetail
          selectedId={selectedId}
          addToFavourites={handleAddFavourite}
          isAddFavourite={isAddFavourite}
        />
      </div>
    </div>
  );
}

export default App;
