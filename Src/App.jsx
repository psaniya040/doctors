import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Helpus from "./pages/Helpus";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./utils/PrivateRoute";
import About from "./pages/About";
const App = () => {

  return <>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>

        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/help" elemen={<Helpus />}></Route>
           

        </Route>


      </Routes>
      <Footer />
    </BrowserRouter>

  </>

}
export default App;
