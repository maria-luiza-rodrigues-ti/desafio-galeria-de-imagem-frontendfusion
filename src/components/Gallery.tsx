import { Heart } from "lucide-react";

export interface ImageProps {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

export function Gallery({ images }: { images: ImageProps[] }) {
  return (
    <ul className="columns-2 sm:columns-3 lg:columns-5 pt-10 pb-20 md:py-30 gap-4">
      {images &&
        images.map((image: ImageProps) => (
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
  );
}
