import type { Key } from "react";
import { useCompareContext } from "../contexts/CompareContext";

export default CompareListPanel;

function CompareListPanel()
{
    const {removeFromCompareList, clearCompareList, compareList } = useCompareContext();

    return (

        <div>
            <h1>Compare</h1>
            <div className="panel">
                <button id="goComparePage">Compare &#128279;</button>
                <button onClick={clearCompareListClicked}>Clear List &#128936;</button>
            </div>
            <div className="panel">
                <CompareList></CompareList>
            </div>
        </div>
    );

    function CompareList()
    {
        if (compareList.length === 0)
        {
            return (
                <div>No results.</div>
            );
        }
        else
        {
            return (
                <ul>
                    {compareList.map((item: string, index: Key | null | undefined) => <li key = {index}><Card name={item}></Card></li>)}
                </ul>
            );
        }
    }
    
    


    function clearCompareListClicked()
    {
        clearCompareList();
    }
    
    function Card({ name }: { name: string })
    {
        function removeClicked()
        {
            removeFromCompareList(name);
        }

        return(
        <div className="result">
            <h4>{name}</h4>
            <button onClick={removeClicked}>Remove</button>
        </div>
        );
    }
}

