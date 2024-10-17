import { useContext } from "react";
import { Gallery } from "../components/Gallery";
import { ImagesContext } from "../context/images-context";
import { NavLink } from "react-router-dom";

export function Home() {
  const { images, isFetching } = useContext(ImagesContext);

  return (
    <section>
      <h2 className="font-serif text-title-color text-5xl text-center mt-20">
        Gallery
      </h2>
      <div className="flex justify-center gap-6 mt-20">
        <NavLink
          to={"/"}
          className={`group relative text-text-color font-bold font-sans pb-2 $`}
        >
          Todos
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[2px] bg-text-color transition-transform duration-300 ease-in-out origin-center scale-x-100 group-hover:scale-x-100 group-active:scale-x-100"></span>
        </NavLink>
        <NavLink
          to={"/favoritos"}
          className={`group relative text-text-color font-bold font-sans pb-2 `}
        >
          Salvos
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[2px] bg-text-color transition-transform duration-300 ease-in-out origin-center scale-x-0 group-hover:scale-x-100 group-active:scale-x-100"></span>
        </NavLink>
      </div>
      {isFetching ? (
        <p className="text-center pt-10">Carregando...</p>
      ) : (
        <Gallery images={images} />
      )}
    </section>
  );
}
