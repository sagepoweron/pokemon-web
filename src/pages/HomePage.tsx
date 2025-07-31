import { isNullOrUndef } from "chart.js/helpers";
import { useEffect, useRef, useState } from "react";
import "./HomePage.css";
import { getPokemon } from "../services/api";
import type { Pokemon } from "../types";

export default HomePage;

function HomePage()
{
    const [pokemon, setPokemon] = useState<Pokemon>();

    const effectRan = useRef(false);
    useEffect(() => {

        if (effectRan.current) return;

        async function getData(name: string)
        {
            const result = await getPokemon(name);
            setPokemon(result);
        }

        const randomNumber = Math.floor(Math.random() * 1000) + 1; //between 1 and 1000
        getData(randomNumber.toString());

        return () => {effectRan.current = true};
    }, []);

    return (
    <div className="content">
        <h1>Home</h1>
        <div className="imageContainer">
            <DisplayImage pokemon={pokemon}></DisplayImage>
        </div>
        
        <div>Search for Pokemon using the search page, check their info, and then compare their stats on the compare page.</div>
    </div>
    );
}

function DisplayImage({pokemon}: {pokemon: Pokemon | undefined})
{
    if (isNullOrUndef(pokemon)) return <></>;
    return <img src={pokemon.sprites.front_default} className="pixelated"></img>
}