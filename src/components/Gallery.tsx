import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { api } from "../lib/axios";

interface Image {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

export function Gallery() {
  const [imageList, setImageList] = useState([]);

  const fetchImages = async () => {
    const response = await api.get("/");

    setImageList(response.data);
  };

  useEffect(() => {
    fetchImages();
  }, []);

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
  );
}
