import { useContext, useState } from "react";
import { Gallery } from "../components/Gallery";
import { ImagesContext } from "../context/images-context";
import { useNavigate } from "react-router-dom";

export function Favorites() {
  const { isFetching, savedImages } = useContext(ImagesContext);
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState("salvos");

  console.log(savedImages);

  function handleSavedImages() {
    setActiveButton("salvos");
    navigate(`/favoritos`);
  }
  function handleAllImages() {
    setActiveButton("todos");
    navigate(`/`);
  }

  return (
    <section>
      <h2 className="font-serif text-title-color text-5xl text-center mt-20">
        Favorites
      </h2>
      <div className="flex justify-center gap-6 mt-20">
        <button
          className={`group relative text-text-color font-bold font-sans pb-2 `}
          onClick={handleAllImages}
        >
          Todos
          <span
            className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[2px] bg-text-color transition-transform duration-300 ease-in-out origin-center ${
              activeButton === "todos"
                ? "scale-x-100"
                : "scale-x-0 group-hover:scale-x-100"
            }`}
          ></span>
        </button>
        <button
          className={`group relative text-text-color font-bold font-sans pb-2 `}
          onClick={handleSavedImages}
        >
          Salvos
          <span
            className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[2px] bg-text-color transition-transform duration-300 ease-in-out origin-center ${
              activeButton === "salvos"
                ? "scale-x-100"
                : "scale-x-0 group-hover:scale-x-100"
            }`}
          ></span>
        </button>
      </div>
      {isFetching ? (
        <p className="text-center pt-10">Carregando...</p>
      ) : (
        <Gallery images={savedImages} />
      )}
    </section>
  );
}
