import { useParams } from "react-router-dom"

function ShowConstruction(){
    const { id } = useParams()
    const token = localStorage.getItem('token');
    const { authenticated, logout } = useContext(AuthContext);

    return (
        <>

        </>
    )
}

export default ShowConstruction