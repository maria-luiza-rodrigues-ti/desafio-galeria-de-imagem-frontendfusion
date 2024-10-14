import { Search } from "lucide-react";

export function SearchForm() {
  return (
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
  );
}
