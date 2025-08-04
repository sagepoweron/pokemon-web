import type { Key } from "react";
import { useCompareContext } from "../contexts/CompareContext";
import "./ComparePanel.css";
import { Link } from "react-router-dom";

export default ComparePanel;

function ComparePanel()
{
    const {clearCompareList} = useCompareContext();

    return (
        <div className="comparePanel">
            <h2>Compare List</h2>
            <div className="compareControls">
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
        <div className="compareList">No results.</div>
        );
    }
    else
    {
        return (
        <div className="compareList">
            {compareList.map((item: string, index: Key | null | undefined) => <CompareCard name={item} key = {index}></CompareCard>)}
        </div>
        );
    }
}

function CompareCard({ name }: { name: string })
{
    const params = new URLSearchParams();
    params.append("name", name);
    const page = "/info?"  + params.toString();

    const {removeFromCompareList} = useCompareContext();
    function removeClicked()
    {
        removeFromCompareList(name);
    }

    return(
    <div className="compareCard">
        <h4>{name}</h4>
        <div className="row">
            <Link to={page}>
                <button>Info</button>
            </Link>
            <button onClick={removeClicked}>Remove</button>
        </div>
        
    </div>
    );
}