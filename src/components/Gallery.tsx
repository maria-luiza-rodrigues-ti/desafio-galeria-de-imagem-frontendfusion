import { Heart } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { ImagesContext } from "../context/images-context";
import { Toaster, toast } from "sonner";

export interface ImageProps {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
  saved?: boolean;
}

export function Gallery({ images }: { images: ImageProps[] }) {
  const { saveImages } = useContext(ImagesContext);
  const [localImages, setLocalImages] = useState<ImageProps[]>(images);

  console.log(images);

  function handleSaveImage(image: ImageProps) {
    if (!image.saved) {
      toast.success("Imagem salva nos favoritos!");
    } else {
      toast.error("Imagem removida dos favoritos!");
    }

    setLocalImages((prevImages) => {
      return prevImages.map((prevImage) =>
        prevImage.id === image.id
          ? { ...prevImage, saved: !prevImage.saved }
          : prevImage
      );
    });
  }

  useEffect(() => {
    const localImagesSaved = localImages.filter(
      (localImage) => localImage.saved
    );

    if (localImagesSaved) {
      saveImages(localImagesSaved);
    }
  }, [localImages]);

  return (
    <ul className="columns-2 sm:columns-3 lg:columns-5 pt-10 pb-20 md:py-30 gap-4">
      {images &&
        localImages.map((image: ImageProps) => (
          <li key={image.id} className="mb-4 break-inside-avoid relative">
            <button
              className="bg-white/70 p-2 rounded-full absolute top-2 right-2 group"
              onClick={() => handleSaveImage(image)}
            >
              <Heart
                color="#111"
                className={`transition-all duration-200 group-hover:stroke-red-500 group-hover:fill-red-500 ${
                  image.saved ? "stroke-red-500 fill-red-500" : ""
                }`}
              />
            </button>
            <img
              src={image.download_url}
              alt="image"
              className="w-full object-cover rounded-lg"
            />
          </li>
        ))}
      <Toaster richColors />
    </ul>
  );
}
