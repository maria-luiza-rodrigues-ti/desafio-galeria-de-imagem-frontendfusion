import { useLocation } from "react-router-dom";
import { Gallery } from "../components/Gallery";
import { useContext } from "react";
import { ImagesContext } from "../context/images-context";

export function Search() {
  const { imagesFilteredByAuthor, isFetching } = useContext(ImagesContext);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get("query");

  return (
    <section>
      <h2 className="font-serif text-title-color text-5xl text-center mt-20">
        "{query}"
      </h2>
      {isFetching ? (
        <p>Carregando...</p>
      ) : (
        <Gallery images={imagesFilteredByAuthor} />
      )}
    </section>
  );
}
