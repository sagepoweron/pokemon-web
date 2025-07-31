import type { Key } from "react";
import { useCompareContext } from "../contexts/CompareContext";
import "./CompareListPanel.css";

export default CompareListPanel;

function CompareListPanel()
{
    const {clearCompareList} = useCompareContext();

    return (
        <div>
            <h1>Compare List</h1>
            <div className="controls">
                <button onClick={() => clearCompareList()}>Clear List &#128936;</button>
            </div>
            <CompareList></CompareList>
        </div>
    );

}

function CompareList()
{
    const {compareList } = useCompareContext();
    if (compareList.length === 0)
    {
        return (
        <div className="list">No results.</div>
        );
    }
    else
    {
        return (
        <div className="list">
            <ul>
                {compareList.map((item: string, index: Key | null | undefined) => <li key = {index}><CompareCard name={item}></CompareCard></li>)}
            </ul>
        </div>
        );
    }
}

function CompareCard({ name }: { name: string })
{
    const {removeFromCompareList} = useCompareContext();
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