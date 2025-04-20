import { Outlet } from "react-router-dom";
import { Footer, Navbar } from "../components";


const MainLayouts = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default MainLayouts;
