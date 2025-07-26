import { getPokemon } from "../services/api";
import { Chart } from "../components/Chart";
import { useEffect, useState } from "react";
import { isNullOrUndef } from "chart.js/helpers";
import StatsCard from "../components/StatsCard";
import type { Pokemon } from "../types";

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
    const [pokemon, setPokemon] = useState<Pokemon>();


    if (isNullOrUndef(pokemon))
    {
        return (
            <div>No Data!</div>
        );
    }
    else
    {
        return (
            <div className="content">
                <div>
                    <h1>Info</h1>
                    <Chart name={pokemon.name} stats={pokemon.stats}></Chart>
                </div>
                <StatsCard pokemon={pokemon}></StatsCard>
            </div>
        );
    }
}

