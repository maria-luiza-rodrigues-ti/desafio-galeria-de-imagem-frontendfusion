import { Gallery } from "./components/Gallery";
import { Header } from "./components/Header";
import { ImagesProvider } from "./context/images-context";

export function App() {
  return (
    <ImagesProvider>
      <Header />
      <main>
        <Gallery />
      </main>
    </ImagesProvider>
  );
}
