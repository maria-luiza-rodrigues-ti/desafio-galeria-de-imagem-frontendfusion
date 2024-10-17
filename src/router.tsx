import { Routes, Route } from "react-router-dom";
import { Search } from "./pages/Search";
import { DefaultLayout } from "./layouts/default-layout";
import { Home } from "./pages/Home";
import { Favorites } from "./pages/Favorites";

export function Router() {
  return (
    <Routes>
      <Route path="" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/favoritos" element={<Favorites />} />
        <Route path="/search" element={<Search />} />
      </Route>
    </Routes>
  );
}
