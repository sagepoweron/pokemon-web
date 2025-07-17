export default ResultCard;

function ResultCard({name, onAddClicked}: {name: string, onAddClicked(name: string): void})
{
    function infoClicked()
    {
        alert("info");
    }
    function addClicked()
    {
        onAddClicked(name);
    }

    return(<div className="result">
        <h4>{name}</h4>
        <button onClick={infoClicked}>Info</button>
        <button onClick={addClicked}>Add</button>
    </div>);
};