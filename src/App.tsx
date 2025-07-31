import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import InfoPage from "./pages/InfoPage";
import ComparePage from "./pages/ComparePage";
import { CompareProvider } from "./contexts/CompareContext";


function App()
{
  return (
    <CompareProvider>
        <Navbar></Navbar>
        <main className="main-content">
            <Routes>
                <Route path="/" element={<HomePage></HomePage>}></Route>
                <Route path="/search" element={<SearchPage></SearchPage>}></Route>
                <Route path="/info" element={<InfoPage></InfoPage>}></Route>
                <Route path="/compare" element={<ComparePage></ComparePage>}></Route>
            </Routes>
        </main>
    </CompareProvider>
    
    
  );
}



export default App;