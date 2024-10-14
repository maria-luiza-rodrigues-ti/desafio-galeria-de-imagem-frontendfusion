import { Heart, Search } from "lucide-react";

export function App() {
  return (
    <>
      <header className="flex items-center gap-6 max-w-7xl my-10 mx-auto px-4 md:px-0">
        <h1 className="font-serif text-title-color text-nowrap text-2xl">
          Picsum Photos
        </h1>
        <form className="flex items-center flex-grow gap-2 w-full bg-background-input/20 rounded-3xl py-2 px-4">
          <button>
            <Search color="#5F5F5F" size={16} />
          </button>
          <input
            type="text"
            placeholder="Busque por imagens"
            className="placeholder:text-text-color font-light bg-transparent"
          />
        </form>
        <button>
          <Heart
            color="##f87171"
            className="fill-red-400 transition-all duration-200 hover:text-red-500 hover:fill-red-500"
          />
        </button>
      </header>
      <main>
        <section>
          <h2 className="font-serif text-title-color text-5xl text-center">
            Gallery
          </h2>
        </section>
      </main>
    </>
  );
}
