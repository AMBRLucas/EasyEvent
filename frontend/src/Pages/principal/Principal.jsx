import { useContext, useEffect, useState } from 'react';
import './Principal.css'
import { TelaContext } from '../../Contexts/TelaContext';
import MenuBar from './Components/MenuBar';
import ActiveEvents from './Components/ActiveEvents';
import EventHistory from './Components/EventHistory';

function Principal(){

    const {user, setUser} = useContext(TelaContext);

    const [userData, setUserData] = useState();
    const [loading, setLoading] = useState(true);

    const [view, setView] = useState("active");

    const getData = async() => {
        try{
            const response = await fetch(`http://localhost:8080/user/${user}`);
            const result = await response.json();

            setUserData(result);
            setLoading(false)
            console.log(userData)
        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        getData()
    }, [])

    return (
        <div className="main-screen">
            {loading && "Carregando..."}
            {!loading && 
                <>
                    <MenuBar setView={setView} />
                    {view == "active" && 
                        <ActiveEvents userData={userData} updateData={getData} />
                    }
                    {view == "history" && <EventHistory userData={userData} updateData={getData} />}
                </>
            }
        </div>
    )
}

export default Principal;
