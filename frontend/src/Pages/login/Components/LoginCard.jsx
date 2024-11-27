import { useContext, useEffect, useState } from "react";
import { TelaContext } from "../../../Contexts/TelaContext";

function LoginCard(){

    const {Tela, setTela, user, setUser} = useContext(TelaContext);

    useEffect(()=>{
        setUser(localStorage.getItem("id"))
    }, [user])

    const [type, setType] = useState("login");

    const [logUsername, setLogUsername] = useState('');
    const [logPassword, setLogPassword] = useState('');

    const [cadUsername, setCadUsername] = useState('');
    const [cadPassword, setCadPassword] = useState('');

    const handleLogUsernameChange = (event) => {
        setLogUsername(event.target.value);
    }

    const handleLogPasswordChange = (event) => {
        setLogPassword(event.target.value)
    }

    const handleCadUsername = (event) => {
        setCadUsername(event.target.value);
    }

    const handleCadPassword = (event) => {
        setCadPassword(event.target.value);
    }

    const handleLogin = async() => {
        try{
            const response = await fetch("http://localhost:8080/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: logUsername,
                    password: logPassword
                })
            })

            if(!response.ok){
                return
            }

            const data = await response.json();

            localStorage.setItem("id", data)
            setUser(data);
            
            setTela("principal")
        }catch(error){
            console.log(error);
        }
    }

    const handleRegistry = async() => {
        try{
            const response = await fetch("http://localhost:8080/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: cadUsername,
                    password: cadPassword
                })
            })
    
            const result = await response.json();
    
            localStorage.setItem("id", result.id);
            setUser(result.id);
    
            setTela('principal')
        }catch(error){
            console.log(error);
        }
    }

    return(
        <div className="login-card">
            {type === 'login' &&
                <div className="login-area">
                    <span>Entrar</span>
                    <input type="text" name="username" placeholder="Nome de Usuário" value={logUsername} onChange={handleLogUsernameChange}/>
                    <input type="password" name="password" placeholder="Senha" value={logPassword} onChange={handleLogPasswordChange}/>
                    <button onClick={handleLogin}>Entrar</button>
                    <p>Ainda não tem uma conta? <span onClick={() => setType("cadastro")}>Criar uma</span></p>
                </div>
            }
            {type === 'cadastro' &&
                <div className="login-area">
                    <span>Cadastro</span>
                    <input type="text" name="username" placeholder="Nome de Usuário" value={cadUsername} onChange={handleCadUsername} />
                    <input type="password" name="password" placeholder="Senha" value={cadPassword} onChange={handleCadPassword}/>
                    <button onClick={handleRegistry}>Cadastrar</button>
                    <p>Já tem uma conta? <span onClick={() => setType("login")}>Criar uma</span></p>
                </div>
            }
            <div className="login-banner">
                <span>EazyEvent</span>
                <p>Uma maneira simples e facil de organizar seus eventos</p>
            </div>
        </div>
    )
}

export default LoginCard;