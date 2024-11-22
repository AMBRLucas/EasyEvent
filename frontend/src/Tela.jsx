import { useContext } from "react";
import { TelaContext } from "./Contexts/TelaContext";
import Login from "./Pages/login/login";
import Principal from "./Pages/principal/Principal";

function Tela(){

    const { tela, setTela, user, setUser } = useContext(TelaContext)

    return(
        <>
        {(tela === "login" && user === null) && <Login />}
        {(tela === "login" && user !== null) && <Principal />}
        {(tela === "principal" && user !== null) && <Principal />}
        {(tela === "principal" && user === null) && <Login />}
        </>
    )
}

export default Tela;