import { BrowserRouter } from "react-router-dom";
import { ImagesProvider } from "./context/images-context";
import { Router } from "./router";

export function App() {
  return (
    <BrowserRouter>
      <ImagesProvider>
        <Router />
      </ImagesProvider>
    </BrowserRouter>
  );
}
