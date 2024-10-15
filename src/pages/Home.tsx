import { useContext } from "react";
import { Gallery } from "../components/Gallery";
import { ImagesContext } from "../context/images-context";

export function Home() {
  const { images } = useContext(ImagesContext);

  return (
    <section>
      <h2 className="font-serif text-title-color text-5xl text-center mt-20">
        Gallery
      </h2>
      <div className="flex justify-center gap-6 mt-20">
        <button className="text-text-color font-bold font-sans pb-2 border-b-2 border-b-text-color">
          Todos
        </button>
        <button className="text-text-color font-bold font-sans pb-2 border-b-2 border-b-text-color">
          Salvo
        </button>
      </div>
      <Gallery images={images} />
    </section>
  );
}
