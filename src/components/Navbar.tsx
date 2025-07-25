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
                <Link to="/search">
                    <button>Search</button>
                </Link>
                <Link to="/compare">
                    <button>Compare</button>
                </Link>
            </div>
        </nav>
    );
}