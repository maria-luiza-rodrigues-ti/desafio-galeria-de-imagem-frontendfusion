import { createContext, useEffect, useState } from "react";
import { api } from "../lib/axios";

interface Image {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

interface ImagesContextType {
  images: Image[];
}

interface ImagesProviderProps {
  children: React.ReactNode;
}

export const ImagesContext = createContext({} as ImagesContextType);

export function ImagesProvider({ children }: ImagesProviderProps) {
  const [images, setImages] = useState<Image[]>([]);

  const fetchImages = async () => {
    const response = await api.get("/");

    setImages(response.data);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <ImagesContext.Provider
      value={{
        images,
      }}
    >
      {children}
    </ImagesContext.Provider>
  );
}
