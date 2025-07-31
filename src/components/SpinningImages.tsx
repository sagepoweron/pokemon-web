import "./SpinningImages.css";

export default SpinningImages;

function SpinningImages({ url1, url2 }: { url1: string, url2: string })
{
    return(
        <div className="container">
            <div className="cube">
                <div className="front"><img className="pixelated" src={url1}></img></div>
                <div className="back"><img className="pixelated" src={url2}></img></div>
                <div className="bottom"></div>
            </div>
        </div>
    );
}