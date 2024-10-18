import { Heart } from "lucide-react";
import { SearchForm } from "./SearchForm";
import { Link, NavLink } from "react-router-dom";

export function Header() {
  return (
    <header className="grid grid-cols-[auto,24px] gris-rows-2 w-full items-center lg:flex lg:flex-nowrap gap-6">
      <h1 className="font-serif text-title-color text-nowrap text-2xl row-span-1 col-span-2 text-center">
        <Link to="/">Picsum Photos</Link>
      </h1>
      <SearchForm />
      <NavLink
        to={"/favoritos"}
        className="flex group"
        aria-label="Vá para a página de itens salvos/favoritos"
      >
        <Heart
          color="##f87171"
          className=" fill-red-400 transition-all duration-200 hover:text-red-500 hover:fill-red-500 group-active:text-red-500 group-active:fill-red-500"
        />
      </NavLink>
    </header>
  );
}
