import { Link } from "react-router-dom";
import { useCompareContext } from "../contexts/CompareContext";

export default ResultCard;

function ResultCard({ name }: { name: string })
{
    const {addToCompareList, removeFromCompareList, isInCompareList } = useCompareContext();

    const params = new URLSearchParams();
    params.append("name", name);
    const page = "/info?"  + params.toString();

    function compareClicked()
    {
        if (isInCompareList(name))
        {
            removeFromCompareList(name);
        }
        else
        {
            addToCompareList(name);
        }
    }
    
    return(
        <div className="result">
            <h4>{name}</h4>
            <Link to={page}>
                <button>Info</button>
            </Link>
            <button onClick={compareClicked}>{isInCompareList(name) ? "Remove" : "Add"}</button>
        </div>
    );

}