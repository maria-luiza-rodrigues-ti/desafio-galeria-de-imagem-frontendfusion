import { BrowserRouter } from "react-router-dom";
import { ImagesProvider } from "./context/images-context";
import { Router } from "./router";
import { Theme } from "@radix-ui/themes";

import "@radix-ui/themes/styles.css";

export function App() {
  return (
    <BrowserRouter>
      <ImagesProvider>
        <Theme>
          <Router />
        </Theme>
      </ImagesProvider>
    </BrowserRouter>
  );
}
