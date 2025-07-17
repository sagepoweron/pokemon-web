import type { Key } from "react";
import ResultCard from "./ResultCard";

export default Results;

/*function Results({list}: {list: any})
{
    if (list.length === 0)
    {
        return (
            <div>No results.</div>
        );
    }
    return (
    <ul>
        {list.map((item: { name: string; }, index: Key | null | undefined) => <li key = {index}><Card name = {item.name}></Card></li>)}
    </ul>
    );
}*/

function Results({list, onAddClicked}: {list: any, onAddClicked(name: string): void})
{
    if (list.length === 0)
    {
        return (
            <div>No results.</div>
        );
    }
    return (
    <ul>
        {list.map((item: { name: string; }, index: Key | null | undefined) => <li key = {index}><ResultCard name={item.name} onAddClicked={ onAddClicked }></ResultCard></li>)}
    </ul>
    );
}