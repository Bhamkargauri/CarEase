import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <ToastContainer autoClose={3000} />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
