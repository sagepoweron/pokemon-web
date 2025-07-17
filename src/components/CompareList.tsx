import type { Key } from "react";
import Card from "./ResultCard";

export default CompareList;

function CompareList({list}: {list: any})
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
}