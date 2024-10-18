import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { ImagesContext } from "../context/images-context";
import { useNavigate } from "react-router-dom";

const searchFormSchema = z.object({
  query: z.string(),
});

export type SearchFormInputs = z.infer<typeof searchFormSchema>;

export function SearchForm() {
  const { searchImageByAuthor } = useContext(ImagesContext);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  });

  function handleSearchImage(data: SearchFormInputs) {
    if (!data.query) {
      return;
    }

    searchImageByAuthor(data.query);

    navigate(`/search?query=${data.query}`);
  }

  return (
    <form
      onSubmit={handleSubmit(handleSearchImage)}
      className="flex items-center flex-grow gap-2 lg:w-full bg-background-input/20 rounded-3xl py-2 px-4 col-span-1"
    >
      <button type="submit" aria-label="Pesquisa">
        <Search color="#5F5F5F" size={16} />
      </button>
      <input
        type="text"
        placeholder="Busque imagem pelo autor"
        className="placeholder:text-text-color w-full font-light bg-transparent"
        {...register("query")}
      />
    </form>
  );
}
