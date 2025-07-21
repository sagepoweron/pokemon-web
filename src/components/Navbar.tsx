import { Link } from "react-router-dom";
export default Navbar;

function Navbar()
{
    return (
        <nav>
            <div>
                <Link to="/">
                    <button>Home</button>
                </Link>
                
                <Link to="/info">
                    <button>Info</button>
                </Link>
            </div>
        </nav>
    );
}