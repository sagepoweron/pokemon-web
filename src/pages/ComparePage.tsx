import { useEffect, useState, type Key } from "react";
import { useCompareContext } from "../contexts/CompareContext";
import type { Pokemon, Stat } from "../types";
import { getPokemon } from "../services/api";
import ComparePanel from "../components/ComparePanel";
import { lerpColor, normalize } from "../services/helpers";

export default ComparePage;

function ComparePage()
{
    return (
    <div className="column">
        <h1>Compare</h1>
        <div className="gridBox">
            <div>
                <h2>Stats</h2>
                <StatsList></StatsList>
            </div>
            
            <ComparePanel></ComparePanel>
        </div>
    </div>
    );
}





function StatsList()
{
    const {compareList } = useCompareContext();
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

    async function getPokemonList(names: string[])
    {
        const list: Pokemon[] = [];
        for (let index = 0; index < names.length; index++)
        {
            const name = names[index];
            const result = await getPokemon(name);
            list.push(result);
        }
        setPokemonList(list);
    }

    useEffect(() => {
        getPokemonList(compareList);
    }, [compareList]);
    
    return (
        <StatsTable pokemonList={pokemonList}></StatsTable>
    );
}








function StatsTable({ pokemonList }: { pokemonList: Pokemon[] })
{
    function getHighestStat(statIndex: number)
    {
        let highest = 0;
        for (let index = 0; index < pokemonList.length; index++)
        {
            highest = Math.max(highest, pokemonList[index].stats[statIndex].base_stat);
        }
        return highest;
    }
    function getLowestStat(statIndex: number)
    {
        let lowest = 1000;
        for (let index = 0; index < pokemonList.length; index++)
        {
            lowest = Math.min(lowest, pokemonList[index].stats[statIndex].base_stat);
        }
        return lowest;
    }
    function getHighestTotal()
    {
        let highest = 0;
        for (let index = 0; index < pokemonList.length; index++)
        {
            const total = getTotal(pokemonList[index].stats);
            highest = Math.max(highest, total);
        }
        return highest;
    }
    function getLowestTotal()
    {
        let lowest = 1000;
        for (let index = 0; index < pokemonList.length; index++)
        {
            const total = getTotal(pokemonList[index].stats);
            lowest = Math.min(lowest, total);
        }
        return lowest;
    }

    function getTotal(stats: Stat[])
    {
        let sum = stats.reduce(function (x, y) {return x + y.base_stat;}, 0);
        return sum;
    }

    const highestStats = [getHighestStat(0), getHighestStat(1), getHighestStat(2), getHighestStat(3), getHighestStat(4), getHighestStat(5)];
    const lowestStats = [getLowestStat(0), getLowestStat(1), getLowestStat(2), getLowestStat(3), getLowestStat(4), getLowestStat(5)];
    const highestTotal = getHighestTotal();
    const lowestTotal = getLowestTotal();

    return(
        <table>
            <thead>
               <tr>
                    <th>Name</th>
                    <th>HP</th>
                    <th>Attack</th>
                    <th>Defense</th>
                    <th>Sp. Atk</th>
                    <th>Sp. Def</th>
                    <th>Speed</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {pokemonList.map((pokemon: Pokemon, index: Key | null | undefined) => (
                    <tr key={index}>
                        <td>{pokemon.name}</td>
                        <td style={getStyleProperties(pokemon.stats[0].base_stat, lowestStats[0], highestStats[0])}>{pokemon.stats[0].base_stat}</td>
                        <td style={getStyleProperties(pokemon.stats[1].base_stat, lowestStats[1], highestStats[1])}>{pokemon.stats[1].base_stat}</td>
                        <td style={getStyleProperties(pokemon.stats[2].base_stat, lowestStats[2], highestStats[2])}>{pokemon.stats[2].base_stat}</td>
                        <td style={getStyleProperties(pokemon.stats[3].base_stat, lowestStats[3], highestStats[3])}>{pokemon.stats[3].base_stat}</td>
                        <td style={getStyleProperties(pokemon.stats[4].base_stat, lowestStats[4], highestStats[4])}>{pokemon.stats[4].base_stat}</td>
                        <td style={getStyleProperties(pokemon.stats[5].base_stat, lowestStats[5], highestStats[5])}>{pokemon.stats[5].base_stat}</td>
                        <td style={getStyleProperties(getTotal(pokemon.stats), lowestTotal, highestTotal)}>{getTotal(pokemon.stats)}</td>
                    </tr>
                    )
                )}
            </tbody>
            
        </table>
    );
    
}





function getStyleProperties(value: number, min: number, max: number)
{
    let minColor = { r: 200, g: 200, b: 200 };
    let maxColor = { r: 0, g: 0, b: 0 };
    let amount = normalize(value, min, max);
    const color = lerpColor(minColor, maxColor, amount);

    /*let fontWeight = "normal";
    if (value === max)
    {
        fontWeight = "bold";
    }*/
    const styleConfig = { color : color }
    return styleConfig;
}

