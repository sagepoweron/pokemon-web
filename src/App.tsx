import "./css/styles.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Info from "./pages/Info";
import Compare from "./pages/Compare";
import { CompareProvider } from "./contexts/CompareContext";


function App()
{
  return (
    <CompareProvider>
        <Navbar></Navbar>
        <main className="main-content">
            <Routes>
                <Route path="/" element={<Home></Home>}></Route>
                <Route path="/search" element={<Search></Search>}></Route>
                <Route path="/info" element={<Info></Info>}></Route>
                <Route path="/compare" element={<Compare></Compare>}></Route>
            </Routes>
        </main>
    </CompareProvider>
    
    
  );
}



export default App;