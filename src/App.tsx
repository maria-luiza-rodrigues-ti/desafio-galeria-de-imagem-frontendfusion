import { useEffect, useState } from "react";
import { Heart, Search } from "lucide-react";
import { api } from "./lib/axios";

interface Image {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

export function App() {
  const [imageList, setImageList] = useState([]);

  const fetchImages = async () => {
    const response = await api.get("/");

    setImageList(response.data);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <>
      <header className="grid grid-cols-[auto,24px] gris-rows-2 w-full items-center lg:flex lg:flex-nowrap gap-6">
        <h1 className="font-serif text-title-color text-nowrap text-2xl row-span-1 col-span-2 text-center">
          Picsum Photos
        </h1>
        <form className="flex items-center flex-grow gap-2 lg:w-full bg-background-input/20 rounded-3xl py-2 px-4 col-span-1">
          <button>
            <Search color="#5F5F5F" size={16} />
          </button>
          <input
            type="text"
            placeholder="Busque por imagens"
            className="placeholder:text-text-color font-light bg-transparent"
          />
        </form>
        <button className="flex">
          <Heart
            color="##f87171"
            className=" fill-red-400 transition-all duration-200 hover:text-red-500 hover:fill-red-500"
          />
        </button>
      </header>
      <main>
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
          <ul className="columns-2 sm:columns-3 lg:columns-5 pt-10 pb-20 md:py-30 gap-4">
            {imageList &&
              imageList.map((image: Image) => (
                <li key={image.id} className="mb-4 break-inside-avoid relative">
                  <button className="bg-white/70 p-2 rounded-full absolute top-2 right-2 group">
                    <Heart
                      color="#111"
                      className="transition-all duration-200 group-hover:stroke-red-500 group-hover:fill-red-500"
                    />
                  </button>
                  <img
                    src={image.download_url}
                    alt="image"
                    className="w-full object-cover rounded-lg"
                  />
                </li>
              ))}
          </ul>
        </section>
      </main>
    </>
  );
}
