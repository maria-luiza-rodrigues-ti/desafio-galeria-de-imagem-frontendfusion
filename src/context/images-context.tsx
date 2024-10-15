import axios from "axios";
import { createContext, useEffect, useState } from "react";

interface ImageProps {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

interface ImagesContextType {
  images: ImageProps[];
  imagesFilteredByAuthor: ImageProps[];
  isFetching: boolean;
  searchImageByAuthor: (query: string) => void;
}

interface ImagesProviderProps {
  children: React.ReactNode;
}

export const ImagesContext = createContext({} as ImagesContextType);

export function ImagesProvider({ children }: ImagesProviderProps) {
  const [images, setImages] = useState<ImageProps[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [imagesFilteredByAuthor, setImagesFilteredByAuthor] = useState<
    ImageProps[]
  >([]);

  const fetchImages = async () => {
    const response = await axios
      .get("https://picsum.photos/v2/list")
      .then((response) => setImages(response.data))
      .catch((err) => console.error(err))
      .finally(() => setIsFetching(false));

    return response;
  };

  useEffect(() => {
    fetchImages();
  }, []);

  function getStoredImages() {
    const storedImages = localStorage.getItem(
      "@picsum-photos:images-filtered-1.0.0"
    );
    if (storedImages) {
      setImagesFilteredByAuthor(JSON.parse(storedImages));
    }
  }

  useEffect(() => {
    getStoredImages();
  }, []);

  function searchImageByAuthor(query: string) {
    const imagesFiltered = images.filter((image) =>
      image.author.toLowerCase().includes(query.toLowerCase())
    );

    setImagesFilteredByAuthor(imagesFiltered);
  }

  useEffect(() => {
    if (images.length > 0) {
      const stateJSON = JSON.stringify(imagesFilteredByAuthor);
      localStorage.setItem("@picsum-photos:images-filtered-1.0.0", stateJSON);
    }
  }, [images, imagesFilteredByAuthor]);

  return (
    <ImagesContext.Provider
      value={{
        images,
        isFetching,
        imagesFilteredByAuthor,
        searchImageByAuthor,
      }}
    >
      {children}
    </ImagesContext.Provider>
  );
}
