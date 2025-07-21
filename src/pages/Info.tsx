import { getPokemon } from "../services/api";
import { Chart } from "../components/Chart";
import { useState } from "react";

export default Info;

function Info()
{
    //const [stats, setStats] = useState<BaseStat[]>([]);
    const [pokemon, setPokemon] = useState<any>();

    
    async function testButton()
    {
        const result = await getPokemon("mew");
        setPokemon(result);
        //setStats(results[0].stats);
    }
    
    function renderChart() {
        //return pokemon.map((item, index: Key | null | undefined) => <div key = {index}><Chart name = {item.name} stats={item.stats}></Chart></div>)
        /*if (pokemon.length <= 0) {
            return <p>No Results!</p>;
        } else {
            return <Chart name={pokemon[0].name} stats={stats}></Chart>
        }*/
        if (pokemon === undefined)
        {
            return <div>No Results!</div>
        }
        else
        {
            return <Chart name={pokemon.name} stats={pokemon.stats}></Chart>
        }
    }

    return (
    <div className="content">
    <h1>Info</h1>
    <button onClick={testButton}>Test</button>
    {renderChart()}
    </div>
    );
}

