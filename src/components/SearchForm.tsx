import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const searchFormSchema = z.object({
  query: z.string(),
});

export type SearchFormInputs = z.infer<typeof searchFormSchema>;

export function SearchForm() {
  const { register, handleSubmit } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  });

  function handleSearchImage(data: SearchFormInputs) {
    console.log(data.query);
  }

  return (
    <form
      onSubmit={handleSubmit(handleSearchImage)}
      className="flex items-center flex-grow gap-2 lg:w-full bg-background-input/20 rounded-3xl py-2 px-4 col-span-1"
    >
      <button type="submit">
        <Search color="#5F5F5F" size={16} />
      </button>
      <input
        type="text"
        placeholder="Busque por imagens"
        className="placeholder:text-text-color w-full font-light bg-transparent"
        {...register("query")}
      />
    </form>
  );
}
