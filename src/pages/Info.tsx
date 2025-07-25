import { getPokemon } from "../services/api";
import { Chart } from "../components/Chart";
import { useEffect, useState } from "react";
import { isNullOrUndef } from "chart.js/helpers";

export default Info;

function Info()
{
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name");

    async function getData(name: string)
    {
        const result = await getPokemon(name);
        setPokemon(result);
    }

    useEffect(() => {
        if (!isNullOrUndef(name))
        {
            getData(name);
        }
        
    }, []);

    //const [stats, setStats] = useState<BaseStat[]>([]);
    const [pokemon, setPokemon] = useState<any>();

    
    function renderChart()
    {
        //return pokemon.map((item, index: Key | null | undefined) => <div key = {index}><Chart name = {item.name} stats={item.stats}></Chart></div>)
        /*if (pokemon.length <= 0) {
            return <p>No Results!</p>;
        } else {
            return <Chart name={pokemon[0].name} stats={stats}></Chart>
        }*/
        if (isNullOrUndef(pokemon))
        {
            return <div>No Data!</div>
        }
        else
        {
            return <Chart name={pokemon.name} stats={pokemon.stats}></Chart>
        }
    }

    return (
        <div className="content">
        <h1>Info</h1>
        {renderChart()}
        </div>
    );
}

