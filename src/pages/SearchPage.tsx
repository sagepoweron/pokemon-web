export default SearchPage;
import { useState, type Key } from "react";
import "./SearchPage.css";
import { getPokemon, getPokemonList } from "../services/api.ts";
import ComparePanel from "../components/ComparePanel.tsx";
import { useCompareContext } from "../contexts/CompareContext.tsx";
import { Link } from "react-router-dom";

function SearchPage()
{
    return (
    <div>
        <h1>Search</h1>
        <div className="gridBox">
            <SearchPanel></SearchPanel>
            <ComparePanel></ComparePanel>
        </div>
        
    </div>
    );
}

function SearchPanel()
{
    const [searchQuery, setSearchQuery] = useState("1");
    const [offset, setOffset] = useState("0");
    const [limit, setLimit] = useState("10");
    const [pokemonList, setPokemonList] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

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

    async function onListButtonClick(offset: string, size: string)
    {
        setLoading(true);
        //await sleep(1000);
        const results = await getPokemonList(offset, size);
        setPokemonList(results);
        setLoading(false);
    }

    return (
        <div className="searchPanel">
            <h2>Search List</h2>
            <div className="searchControls">
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
                    <button onClick={() => onListButtonClick("0", "151")}>1-151</button>
                    <button onClick={() => onListButtonClick("151", "100")}>152-251</button>
                    <button onClick={() => onListButtonClick("251", "135")}>252-386</button>
                    <button onClick={() => onListButtonClick("386", "107")}>387-493</button>
                    <button onClick={() => onListButtonClick("493", "156")}>494-649</button>
                    <button onClick={() => onListButtonClick("649", "72")}>650-721</button>
                    <button onClick={() => onListButtonClick("721", "88")}>722-809</button>
                    <button onClick={() => onListButtonClick("809", "96")}>810-905</button>
                    <button onClick={() => onListButtonClick("905", "120")}>906-1025</button>
                    <button onClick={() => onListButtonClick("1025", "300")}>Alternate Forms</button>
                    <button onClick={clearSearchListClicked}>Clear List &#128936;</button>
                </div>
            </div>
            {loading? <div className="loadingContainer"><span className="loader"></span></div> : <></>}
            <SearchList list={pokemonList}></SearchList>
        </div>
    );
}

function SearchList({list}: {list: any})
{
    if (list.length === 0)
    {
        return (
            <div className="list">No results.</div>
        );
    }
    return (
    <div className="list">
        {list.map((item: { name: string; }, index: Key | null | undefined) => <SearchCard name={item.name} key = {index}></SearchCard>)}
    </div>
    );
}

function SearchCard({ name }: { name: string })
{
    const {addToCompareList, removeFromCompareList, isInCompareList } = useCompareContext();

    const params = new URLSearchParams();
    params.append("name", name);
    const page = "/info?"  + params.toString();

    function compareClicked()
    {
        if (isInCompareList(name))
        {
            removeFromCompareList(name);
        }
        else
        {
            addToCompareList(name);
        }
    }
    
    return(
        <div className="card">
            <h4>{name}</h4>
            <div className="row">
                <Link to={page}>
                    <button>Info</button>
                </Link>
                <button onClick={compareClicked}>{isInCompareList(name) ? "Remove" : "Compare"}</button>
            </div>
            
        </div>
    );

}