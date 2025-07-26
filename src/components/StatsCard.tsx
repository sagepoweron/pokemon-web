import { useState } from "react";
import "../css/StatsCard.css";
import type { Pokemon } from "../types";

export default StatsCard;

function StatsCard({ pokemon }: { pokemon: Pokemon })
{
    const [level, setLevel] = useState<number>(100);
    const [hpIV, setHPIV] = useState<number>(0);
    const [attackIV, setAttackIV] = useState<number>(0);
    const [hpEV, setHPEV] = useState<number>(0);
    const [attackEV, setAttackEV] = useState<number>(0);

    return(
        <div>
            <h3>Stat Calculator</h3>
            <h4>{pokemon.name}</h4>
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
                <strong>Hardy</strong>
            </div>
            <div className="bar">
                <strong>HP</strong>
                <div>Base: {pokemon.stats[0].base_stat}</div>
                <label>
                    IV: <input type="number" min="0" max="31" value={hpIV} onChange={(e) => {
                        const value = parseInt(e.target.value);
                        setHPIV(value);
                    }}>
                    </input>
                </label>
                <label>
                    EV: <input type="number" min="0" max="255" value={hpEV} onChange={(e) => {
                        const value = parseInt(e.target.value);
                        setHPEV(value);
                    }}></input>
                </label>
                <strong>{calculateHP(level, pokemon.stats[0].base_stat, hpIV, hpEV)}</strong>
            </div>

            <div className="bar">
                <strong>Attack</strong>
                <div>Base: {pokemon.stats[1].base_stat}</div>
                <label>
                    IV: <input type="number" min="0" max="31" value={attackIV} onChange={(e) => {
                        const value = parseInt(e.target.value);
                        setAttackIV(value);
                    }}></input>
                </label>
                <label>
                    EV: <input type="number" min="0" max="255" value={attackEV} onChange={(e) => {
                        const value = parseInt(e.target.value);
                        setAttackEV(value);
                    }}></input>
                </label>
                <strong>{calculateStat(level, pokemon.stats[1].base_stat, attackIV, attackEV)}</strong>
            </div>
        </div>
    );
}


function calculateHP(level: number, base: number, ivPoints: number, evPoints: number)
{
    evPoints = Math.floor(evPoints / 4);
    const stat = Math.floor(((2 * base + ivPoints + evPoints) * level) / 100);
    return stat + level + 10;
}
function calculateStat(level: number, base: number, ivPoints: number, evPoints: number)
{
    evPoints = Math.floor(evPoints / 4);
    const stat = Math.floor(((2 * base + ivPoints + evPoints) * level) / 100);
    return (stat + 5) * 1;
}