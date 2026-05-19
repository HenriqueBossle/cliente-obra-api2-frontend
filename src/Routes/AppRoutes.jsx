import { BrowserRouter, Route, Routes } from "react-router-dom"
import App from "../App"
import Login from "../Pages/Login"

function AppRoutes(){
    return(
        <>
     
            <BrowserRouter>
                <Routes>
                    <Route path="/home" element={<App />}></Route>
                    <Route path="/login" element={<Login />}></Route> 
                    <Route path="/register" element={<Register />}></Route> 
              
                </Routes>
            </BrowserRouter>

           </>
    
    )

}

export default AppRoutes