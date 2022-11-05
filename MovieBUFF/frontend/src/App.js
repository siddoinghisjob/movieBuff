import {Route, Routes} from "react-router-dom";
import './App.css';
import Home from "./components/home/index.js";
import TV from "./components/tv";
import Movie from "./components/movie";
import PageNotFound from "./components/404";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/tv" element={<TV/>} />
      <Route path="/movie/:id" element={<Movie/>} />
      <Route path="*" element={<PageNotFound/>} />
    </Routes>
  );
}

export default App;
