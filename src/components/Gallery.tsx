import { Heart } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Toaster, toast } from "sonner";

import { ImagesContext } from "../context/images-context";
import { Skeleton } from "@radix-ui/themes";

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
  const [loadingSkeleton, setLoadingSkeleton] = useState(true);

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

  useEffect(() => {
    const timeToShowContent = setTimeout(() => {
      setLoadingSkeleton(false);
    }, 2000);

    return () => {
      clearTimeout(timeToShowContent);
    };
  }, []);

  return (
    <ul className="columns-2 sm:columns-3 lg:columns-5 pt-10 pb-20 md:py-30 gap-4">
      {images &&
        localImages.map((image: ImageProps) => (
          <Skeleton key={image.id} loading={loadingSkeleton}>
            <li className="mb-4 break-inside-avoid relative cursor-pointer">
              <button
                className="bg-white/70 p-2 rounded-full absolute top-2 right-2 group"
                onClick={() => handleSaveImage(image)}
                aria-label="Salvar imagem"
              >
                <Heart
                  color="#111"
                  className={`transition-all duration-200 group-hover:stroke-red-500 group-hover:fill-red-500 ${
                    image.saved ? "stroke-red-500 fill-red-500" : ""
                  }`}
                />
              </button>

              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <img
                    src={image.download_url}
                    className="w-full object-cover rounded-lg"
                  />
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
                  <Dialog.Content asChild>
                    <figure className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background bg-white rounded-2xl h-[70vh] w-[70vh] flex gap-2 overflow-hidden">
                      <img
                        src={image.download_url}
                        className="w-1/2 object-cover"
                      />
                      <Dialog.Close />

                      <Dialog.Description asChild>
                        <div className="flex-1 flex flex-col justify-center gap-4 pr-2">
                          <div>
                            <span className="text-text-color text-left text-sm">
                              Autor:
                            </span>
                            <Dialog.Title className="text-3xl font-bold">
                              {image.author}
                            </Dialog.Title>
                          </div>
                          <div>
                            <span className="block text-sm">
                              Largura: {image.width}
                            </span>
                            <span className="block text-sm">
                              Altura: {image.height}
                            </span>
                          </div>
                        </div>
                      </Dialog.Description>
                    </figure>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            </li>
          </Skeleton>
        ))}
      <Toaster richColors />
    </ul>
  );
}
