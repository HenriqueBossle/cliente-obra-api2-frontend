import { Link } from "react-router-dom"

function Navbar(){
    return(
        <>
            <header>
                <Link to="/">Início</Link>
                <Link to="/home">HOme</Link>
            </header>
        </>
    )
}

export default Navbar