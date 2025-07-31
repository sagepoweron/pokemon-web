import { useState } from "react";
import "./StatsTable.css";
import type { Pokemon } from "../types";

export default StatsTable;

const natures = ["adamant", "bashful", "bold", "brave", "calm", "careful", "docile", "gentle", "hardy", "hasty", "impish", "jolly", "lax", "lonely", "mild", "modest", "naive", "naughty", "quiet", "quirky", "rash", "relaxed", "sassy", "serious", "timid"] as const;

function StatsTable({ pokemon }: { pokemon: Pokemon })
{
    const [level, setLevel] = useState<number>(100);
    
    const [nature, setNature] = useState<string>(natures[8]);
    const [IVs, setIVs] = useState<number[]>([0, 0, 0, 0, 0, 0]);
    const [EVs, setEVs] = useState<number[]>([0, 0, 0, 0, 0, 0]);

    
    
    
    function setIV(index: number, iv: number)
    {
        if (iv < 0) iv = 0;
        if (iv > 31) iv = 31;

        const ivs = [...IVs];
        ivs[index] = iv;
        setIVs(ivs);
    }
    function setEV(index: number, ev: number)
    {

        let sum = 0;
        for (let i = 0; i < EVs.length; i++)
        {
            if (i === index) continue;
            sum += EVs[i];
        }
        const maxSum = 510;
        const remaining = Math.max(maxSum - sum, 0);
        const max = 255;

        ev = Math.min(ev, remaining, max);

        const evs = [...EVs];
        evs[index] = ev;
        setEVs(evs);
    }
    function handleDropdownChange(event: any)
    {
        const value = event.target.value;
        setNature(value);
    };

    return(
        <div>
            <h1>{pokemon.name}</h1>
            <div className="row">
                <div className="bar">
                    <strong>Level</strong>
                    <input type="number" min="1" max="100" value={level} onChange={(e) => {
                        const value = parseInt(e.target.value);
                        setLevel(value);
                    }}>
                    </input>
                </div>
                <div className="bar">
                    <strong>Nature</strong>
                    <select value={nature} onChange={handleDropdownChange}>
                        {natures.map((nature, index) => (
                            <option key={index} value={nature}>{nature}</option>
                        ))}
                    </select>
                </div>
            </div>
            
            

            <div className="table">
            <div className="row header">
                <div className="cell"></div>
                <div className="cell">HP</div>
                {displayHeader(1)}
                {displayHeader(2)}
                {displayHeader(3)}
                {displayHeader(4)}
                {displayHeader(5)}
            </div>
            <div className="row">
                <div className="cell header">Base</div>
                <div className="cell">{pokemon.stats[0].base_stat}</div>
                <div className="cell">{pokemon.stats[1].base_stat}</div>
                <div className="cell">{pokemon.stats[2].base_stat}</div>
                <div className="cell">{pokemon.stats[3].base_stat}</div>
                <div className="cell">{pokemon.stats[4].base_stat}</div>
                <div className="cell">{pokemon.stats[5].base_stat}</div>
            </div>

            <div className="row">
                <div className="cell header">IV</div>
                <div className="cell">
                    <input type="number" min="0" max="31" value={IVs[0]} onChange={(e) => {
                        const value = parseInt(e.target.value);
                        setIV(0, value);
                    }}></input>
                </div>
                <div className="cell">
                    <input type="number" min="0" max="31" value={IVs[1]} onChange={(e) => {
                        const value = parseInt(e.target.value);
                        setIV(1, value);
                    }}></input>
                </div>
                <div className="cell">
                    <input type="number" min="0" max="31" value={IVs[2]} onChange={(e) => {
                        const value = parseInt(e.target.value);
                        setIV(2, value);
                    }}></input>
                </div>
                <div className="cell">
                    <input type="number" min="0" max="31" value={IVs[3]} onChange={(e) => {
                        const value = parseInt(e.target.value);
                        setIV(3, value);
                    }}></input>
                </div>
                <div className="cell">
                    <input type="number" min="0" max="31" value={IVs[4]} onChange={(e) => {
                        const value = parseInt(e.target.value);
                        setIV(4, value);
                    }}></input>
                </div>
                <div className="cell">
                    <input type="number" min="0" max="31" value={IVs[5]} onChange={(e) => {
                        const value = parseInt(e.target.value);
                        setIV(5, value);
                    }}></input>
                </div>
            </div>


            <div className="row">
                <div className="cell header">EV</div>
                <div className="cell">
                    <input type="number" min="0" max="255" value={EVs[0]} onChange={(e) => {
                        let value = parseInt(e.target.value);
                        setEV(0, value);
                    }}></input>
                </div>
                <div className="cell">
                    <input type="number" min="0" max="255" value={EVs[1]} onChange={(e) => {
                        const value = parseInt(e.target.value);
                        setEV(1, value);
                    }}></input>
                </div>
                <div className="cell">
                    <input type="number" min="0" max="255" value={EVs[2]} onChange={(e) => {
                        const value = parseInt(e.target.value);
                        setEV(2, value);
                    }}></input>
                </div>
                <div className="cell">
                    <input type="number" min="0" max="255" value={EVs[3]} onChange={(e) => {
                        const value = parseInt(e.target.value);
                        setEV(3, value);
                    }}></input>
                </div>
                <div className="cell">
                    <input type="number" min="0" max="255" value={EVs[4]} onChange={(e) => {
                        const value = parseInt(e.target.value);
                        setEV(4, value);
                    }}></input>
                </div>
                <div className="cell">
                    <input type="number" min="0" max="255" value={EVs[5]} onChange={(e) => {
                        const value = parseInt(e.target.value);
                        setEV(5, value);
                    }}></input>
                </div>
            </div>

            <div className="row">
                <div className="cell header">Total</div>
                <div className="cell">
                    <strong>{calculateHP()}</strong>
                </div>
                <div className="cell">
                    <strong>{calculateStat(1)}</strong>
                </div>
                <div className="cell">
                    <strong>{calculateStat(2)}</strong>
                </div>
                <div className="cell">
                    <strong>{calculateStat(3)}</strong>
                </div>
                <div className="cell">
                    <strong>{calculateStat(4)}</strong>
                </div>
                <div className="cell">
                    <strong>{calculateStat(5)}</strong>
                </div>
            </div>
        </div>

        </div>
    );


    function calculateHP()
    {
        const evPoints = Math.floor(EVs[0] / 4);
        const stat = Math.floor(((2 * pokemon.stats[0].base_stat + IVs[0] + evPoints) * level) / 100);
        return stat + level + 10;
    }

    function calculateStat(index: number)
    {
        const evPoints = Math.floor(EVs[index] / 4);
        const stat = ((2 * pokemon.stats[index].base_stat + IVs[index] + evPoints) * level) / 100 + 5;
        return Math.floor(stat * natureMultiplier(index));
    }
    function natureMultiplier(index: number)
    {
        const attack = 1;
        const defense = 2;
        const specialAttack = 3;
        const specialDefense = 4;
        const speed = 5;

        const strong = 1.1;
        const weak = 0.9;

        switch (nature)
        {
            case "adamant":
                if (index === attack) return strong;
                if (index === specialAttack) return weak;
                break;
            case "bashful":
                break;
            case "bold":
                if (index === defense) return strong;
                if (index === attack) return weak;
                break;
            case "brave":
                if (index === attack) return strong;
                if (index === speed) return weak;
                break;
            case "calm":
                if (index === specialDefense) return strong;
                if (index === attack) return weak;
                break;
            case "careful":
                if (index === specialDefense) return strong;
                if (index === specialAttack) return weak;
                break;
            case "docile":
                break;
            case "gentle":
                if (index === specialDefense) return strong;
                if (index === defense) return weak;
                break;
            case "hardy":
                break;
            case "hasty":
                if (index === speed) return strong;
                if (index === defense) return weak;
                break;
            case "impish":
                if (index === defense) return strong;
                if (index === specialAttack) return weak;
                break;
            case "jolly":
                if (index === speed) return strong;
                if (index === specialAttack) return weak;
                break;
            case "lax":
                if (index === defense) return strong;
                if (index === specialDefense) return weak;
                break;
            case "lonely":
                if (index === attack) return strong;
                if (index === defense) return weak;
                break;
            case "mild":
                if (index === specialAttack) return strong;
                if (index === defense) return weak;
                break;
            case "modest":
                if (index === specialAttack) return strong;
                if (index === attack) return weak;
                break;
            case "naive":
                if (index === speed) return strong;
                if (index === specialDefense) return weak;
                break;
            case "naughty":
                if (index === attack) return strong;
                if (index === specialDefense) return weak;
                break;
            case "quiet":
                if (index === specialAttack) return strong;
                if (index === speed) return weak;
                break;
            case "quirky":
                break;
            case "rash":
                if (index === specialAttack) return strong;
                if (index === specialDefense) return weak;
                break;
            case "relaxed":
                if (index === defense) return strong;
                if (index === speed) return weak;
                break;
            case "sassy":
                if (index === specialDefense) return strong;
                if (index === speed) return weak;
                break;
            case "serious":
                break;
            case "timid":
                if (index === speed) return strong;
                if (index === attack) return weak;
                break;
            default:
                break;
        }
        return 1;
    }

    function displayHeader(index: number)
    {
        const attack = 1;
        const defense = 2;
        const specialAttack = 3;
        const specialDefense = 4;
        const speed = 5;

        switch (nature)
        {
            case "adamant":
                if (index === attack) return <div className="cell strong">Attack+</div>
                if (index === specialAttack) return <div className="cell weak">Sp. Atk-</div>
                break;
            case "bashful":
                break;
            case "bold":
                if (index === defense) return <div className="cell strong">Defense+</div>;
                if (index === attack) return <div className="cell weak">Attack-</div>;
                break;
            case "brave":
                if (index === attack) return <div className="cell strong">Attack+</div>;
                if (index === speed) return <div className="cell weak">Speed-</div>;
                break;
            case "calm":
                if (index === specialDefense) return <div className="cell strong">Sp. Def+</div>;
                if (index === attack) return <div className="cell weak">Attack-</div>;
                break;
            case "careful":
                if (index === specialDefense) return <div className="cell strong">Sp. Def+</div>;
                if (index === specialAttack) return <div className="cell weak">Sp. Atk-</div>;
                break;
            case "docile":
                break;
            case "gentle":
                if (index === specialDefense) return <div className="cell strong">Sp. Def+</div>;
                if (index === defense) return <div className="cell weak">Defense-</div>;
                break;
            case "hardy":
                break;
            case "hasty":
                if (index === speed) return <div className="cell strong">Speed+</div>;
                if (index === defense) return <div className="cell weak">Defense-</div>;
                break;
            case "impish":
                if (index === defense) return <div className="cell strong">Defense+</div>;
                if (index === specialAttack) return <div className="cell weak">Sp. Atk-</div>;
                break;
            case "jolly":
                if (index === speed) return <div className="cell strong">Speed+</div>;
                if (index === specialAttack) return <div className="cell weak">Sp. Atk-</div>;
                break;
            case "lax":
                if (index === defense) return <div className="cell strong">Defense+</div>;
                if (index === specialDefense) return <div className="cell weak">Sp. Def-</div>;
                break;
            case "lonely":
                if (index === attack) return <div className="cell strong">Attack+</div>;
                if (index === defense) return <div className="cell weak">Defense-</div>;
                break;
            case "mild":
                if (index === specialAttack) return <div className="cell strong">Sp. Atk+</div>;
                if (index === defense) return <div className="cell weak">Defense-</div>;
                break;
            case "modest":
                if (index === specialAttack) return <div className="cell strong">Sp. Atk+</div>;
                if (index === attack) return <div className="cell weak">Attack-</div>;
                break;
            case "naive":
                if (index === speed) return <div className="cell strong">Speed+</div>;
                if (index === specialDefense) return <div className="cell weak">Sp. Def-</div>;
                break;
            case "naughty":
                if (index === attack) return <div className="cell strong">Attack+</div>;
                if (index === specialDefense) return <div className="cell weak">Sp. Def-</div>;
                break;
            case "quiet":
                if (index === specialAttack) return <div className="cell strong">Sp. Atk+</div>;
                if (index === speed) return <div className="cell weak">Speed-</div>;
                break;
            case "quirky":
                break;
            case "rash":
                if (index === specialAttack) return <div className="cell strong">Sp. Atk+</div>;
                if (index === specialDefense) return <div className="cell weak">Sp. Def-</div>;
                break;
            case "relaxed":
                if (index === defense) return <div className="cell strong">Defense+</div>;
                if (index === speed) return <div className="cell weak">Speed-</div>;
                break;
            case "sassy":
                if (index === specialDefense) return <div className="cell strong">Sp. Def+</div>;
                if (index === speed) return <div className="cell weak">Speed-</div>;
                break;
            case "serious":
                break;
            case "timid":
                if (index === speed) return <div className="cell strong">Speed+</div>;
                if (index === attack) return <div className="cell weak">Attack-</div>;
                break;
            default:
                break;
        }

        if (index === attack) return <div className="cell">Attack</div>
        if (index === defense) return <div className="cell">Defense</div>
        if (index === specialAttack) return <div className="cell">Sp. Atk</div>
        if (index === specialDefense) return <div className="cell">Sp. Def</div>
        if (index === speed) return <div className="cell">Speed</div>

        return <></>
    }
    
    function totalBase()
    {
        let sum = 0;
        pokemon.stats.map(e => sum += e.base_stat);
        return sum;
    }
    function totalIV()
    {
        let sum = 0;
        IVs.map(e => sum += e);
        return sum;
    }
    function totalEV()
    {
        let sum = 0;
        EVs.map(e => sum += e);
        return sum;
    }
}






