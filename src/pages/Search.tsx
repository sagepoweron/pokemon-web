export default Search;
import { useState, type Key } from "react";
import { getPokemon, getPokemonList} from "../services/api.ts";
import CompareListPanel from "../components/CompareListPanel.tsx";
import ResultCard from "../components/ResultCard.tsx";
import "../css/Search.css";
//import sleep from "../services/helpers.ts";

function Search()
{
    const [searchQuery, setSearchQuery] = useState("1");
    const [offset, setOffset] = useState("0");
    const [limit, setLimit] = useState("10");
    const [pokemonList, setPokemonList] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    
    /*const [compareList, setCompareList] = useState(() => {
        return JSON.parse(sessionStorage.getItem('compareList') || "[]");
    });*/
    /*useEffect(() => {
        sessionStorage.setItem('compareList', JSON.stringify(compareList));
    }, [compareList]);*/

    function clearSearchListClicked()
    {
        setPokemonList([]);
    }

    async function handleSearch(e: React.FormEvent<HTMLFormElement>)
    {
        e.preventDefault();
        setLoading(true);
        //await sleep(1000);
        const result = await getPokemon(searchQuery);
        setPokemonList([result]);
        setLoading(false);
    }
    async function handleSearchList(e: React.FormEvent<HTMLFormElement>)
    {
        e.preventDefault();
        setLoading(true);
        //await sleep(1000);
        const results = await getPokemonList(offset, limit);
        setPokemonList(results);
        setLoading(false);
    }

    return (
    <div>
        <div className="gridBox">
            <div>
                <h1>Search</h1>
                <div className="panel">
                    <form onSubmit={handleSearch}>
                        <label htmlFor="query">Name/Number: </label>
                        <input id="query" type="text" placeholder="Name/Number" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}></input>
                        <button type="submit">Search &#128269;</button>
                    </form>
                    <hr></hr>
                    <form onSubmit={handleSearchList}>
                        <label htmlFor="offset">Offset: </label>
                        <input id="offset" className="inputBox" type="number" placeholder="0" min="0" value={offset} onChange={(e) => setOffset(e.target.value)}></input>

                        <label htmlFor="limit">Limit: </label>
                        <input id="limit" className="inputBox" type="number" placeholder="10 to 100" min= "10" max="100" value={limit} onChange={(e) => setLimit(e.target.value)}></input>

                        <button type="submit">Create List &#128269;</button>
                    </form>
                    <hr></hr>
                    <div>
                        <button onClick={clearSearchListClicked}>Clear List &#128936;</button>
                    </div>
                </div>
                <div className="panel">
                    <Results list={pokemonList}></Results>
                </div>
            </div>

            <CompareListPanel></CompareListPanel>
        </div>
        
        

        {loading? <div className="loadingContainer"><span className="loader"></span></div> : <></>}
    </div>
    );
}



function Results({list}: {list: any})
{
    if (list.length === 0)
    {
        return (
            <div>No results.</div>
        );
    }
    return (
    <ul className="results">
        {list.map((item: { name: string; }, index: Key | null | undefined) => <li key = {index}><ResultCard name={item.name}></ResultCard></li>)}
    </ul>
    );
}