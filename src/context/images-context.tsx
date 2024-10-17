import axios from "axios";
import { createContext, useEffect, useState } from "react";

interface ImageProps {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
  saved?: boolean;
}

interface ImagesContextType {
  images: ImageProps[];
  imagesFilteredByAuthor: ImageProps[];
  savedImages: ImageProps[];
  isFetching: boolean;
  searchImageByAuthor: (query: string) => void;
  saveImages: (imagesToSave: ImageProps[]) => void;
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
  const [savedImages, setSavedImages] = useState<ImageProps[]>([]);

  const fetchImages = async () => {
    const response = await axios
      .get("https://picsum.photos/v2/list")
      .then((response) =>
        setImages(
          response.data.map((image: ImageProps) => ({ ...image, saved: false }))
        )
      )
      .catch((err) => console.error(err))
      .finally(() => setIsFetching(false));

    return response;
  };

  useEffect(() => {
    fetchImages();
  }, []);

  function saveImages(imagesToSave: ImageProps[]) {
    setSavedImages(imagesToSave);

    const updatedImages = images.map((image) => {
      if (imagesToSave.some((savedImage) => savedImage.id === image.id)) {
        return { ...image, saved: true };
      }

      return image;
    });

    setImages(updatedImages);
  }

  useEffect(() => {
    const savedImagesJSON = JSON.stringify(savedImages);
    localStorage.setItem("@picsum-photos:saved-images-1.0.0", savedImagesJSON);
  }, [savedImages]);

  function getSearchedImages() {
    const searchedImages = localStorage.getItem(
      "@picsum-photos:searched-images-1.0.0"
    );
    if (searchedImages) {
      setImagesFilteredByAuthor(JSON.parse(searchedImages));
    }
  }

  function getSavedImages() {
    const savedImages = localStorage.getItem(
      "@picsum-photos:saved-images-1.0.0"
    );

    if (savedImages) {
      setSavedImages(JSON.parse(savedImages));
    }
  }

  useEffect(() => {
    getSearchedImages();
    getSavedImages();
  }, []);

  function searchImageByAuthor(query: string) {
    const imagesFiltered = images.filter((image) =>
      image.author.toLowerCase().includes(query.toLowerCase())
    );

    setImagesFilteredByAuthor(imagesFiltered);
  }

  useEffect(() => {
    if (images.length > 0) {
      const imagesFiltredByAuthorJSON = JSON.stringify(imagesFilteredByAuthor);
      localStorage.setItem(
        "@picsum-photos:searched-images-1.0.0",
        imagesFiltredByAuthorJSON
      );
    }
  }, [images, imagesFilteredByAuthor]);

  return (
    <ImagesContext.Provider
      value={{
        images,
        isFetching,
        savedImages,
        saveImages,
        imagesFilteredByAuthor,
        searchImageByAuthor,
      }}
    >
      {children}
    </ImagesContext.Provider>
  );
}
