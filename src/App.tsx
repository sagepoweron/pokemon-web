import "./css/styles.css";
import Search from "./pages/Search";
import { Route, Routes } from "react-router-dom";
import Info from "./pages/Info";
import Navbar from "./components/Navbar";

function App()
{
  return (
    <div>
        <Navbar></Navbar>
        <main className="main-content">
            <Routes>
                <Route path="/" element={<Search></Search>}></Route>
                <Route path="/info" element={<Info></Info>}></Route>
            </Routes>
        </main>
    </div>
    
    
  );
}



export default App;