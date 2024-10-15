import { Routes, Route } from "react-router-dom";
import { Search } from "./pages/Search";
import { DefaultLayout } from "./layouts/default-layout";
import { Home } from "./pages/Home";

export function Router() {
  return (
    <Routes>
      <Route path="" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
      </Route>
    </Routes>
  );
}
