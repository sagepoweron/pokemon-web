import { getPokemon } from "../services/api";
import { Chart } from "../components/Chart";
import { useEffect, useState } from "react";
import { isNullOrUndef } from "chart.js/helpers";
import StatsTable from "../components/StatsTable";
import type { Pokemon } from "../types";
import "../css/Info.css";

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
                    <img src={pokemon.sprites.front_default} className="pixelated"></img>
                    <div className="chartContainer">
                        <Chart pokemon={pokemon}></Chart>
                    </div>
                </div>
                <StatsTable pokemon={pokemon}></StatsTable>
            </div>
        );
    }
}

