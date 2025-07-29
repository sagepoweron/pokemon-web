import { isNullOrUndef } from "chart.js/helpers";
import { useEffect, useState } from "react";
import { getPokemon } from "../services/api";
import type { Pokemon } from "../types";
import "../css/Home.css";

export default Home;

function Home()
{
    async function getData(name: string)
        {
            const result = await getPokemon(name);
            setPokemon(result);
        }
    
        useEffect(() => {
            const randomNumber = Math.floor(Math.random() * 1000) + 1; //between 1 and 1000
            getData(randomNumber.toString());
        }, []);
    
        const [pokemon, setPokemon] = useState<Pokemon>();


    return (
    <div className="content">
        <h1>Home</h1>
        <div className="imageContainer">
            {displayImage()}
        </div>
        
        <div>Search for Pokemon using the search page, check their info, and then compare their stats on the compare page.</div>
    </div>
    );

    function displayImage()
    {
        if (isNullOrUndef(pokemon)) return <></>;
        return <img src={pokemon.sprites.front_default} className="pixelated"></img>
    }

}