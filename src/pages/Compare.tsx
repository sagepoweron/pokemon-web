export default Compare;

import type { Key } from "react";
import { useCompareContext } from "../contexts/CompareContext";

function Compare()
{
    const {addToCompareList, removeFromCompareList, compareList} = useCompareContext();

    function addToComparesClicked()
    {
        addToCompareList("pikachu");
    }
    function removeFromComparesClicked()
    {
        removeFromCompareList("pikachu");
    }

    return (
    <div>
        <h1>Compare</h1>
        <button onClick={addToComparesClicked}>Add</button>
        <button onClick={removeFromComparesClicked}>Remove</button>
        {compareList.map((item: string, index: Key | null | undefined) => <div key = {index}><CompareCard name={item}></CompareCard></div>)}
    </div>
    );



    function CompareCard({ name }: { name: string })
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