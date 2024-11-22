import { useContext, useState } from "react";
import NoEvents from "./NoEvents";
import { TelaContext } from "../../../Contexts/TelaContext";
import EventDetailModal from "./EventDetailModal";

function ActiveEvents( {userData, updateData} ) {

    const { user } = useContext(TelaContext);

    const [createEventModal, setCreateEventModal] = useState(false);
    const [eventDetailModal, setEventDetailModal] = useState(false);

    const [selectedEvent, setSelectedEvent] = useState();

    const [eventName, setEventName] = useState('');
    const [eventLocal, setEventLocal] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventDescription, setEventDescription] = useState('');

    const handleEventName = (event) => {
        setEventName(event.target.value);
    }

    const handleEventLocal = (event) => {
        setEventLocal(event.target.value);
    }

    const handleEventDate = (event) => {
        setEventDate(event.target.value);
    }

    const handleEventDescription = (event) => {
        setEventDescription(event.target.value);
    }

    const closeModal = () => {
        setCreateEventModal(false);
        updateData();
    }

    const handleNewEvent = async() => {
        if(eventName == '' || eventDescription == '' || eventLocal == '' || eventDate == ''){
            console.log("insira valores validos");
            return
        }

        try{
            const response = await fetch(`http://localhost:8080/event`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    eventName: eventName,
                    description: eventDescription,
                    local: eventLocal,
                    date: eventDate,
                    user: {
                        id: user
                    }
                })
            })
    
            const result = await response.json();

            closeModal()
    
        }catch(error){
            console.log(error)
        }

    }

    const dataFormatter = (data) => {
        const date = new Date(data);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };
    
    const handleOpenDetailModal = (event) => {
        setSelectedEvent(event)
        setEventDetailModal(true)
    }

    return(
        <div className="view">
            <div className="view-header">
                <span>Eventos de {userData.username}</span>
                <div className="add-button" onClick={() => setCreateEventModal(true)}>+</div>
            </div>
            <div className="view-body">
                {userData.events.filter(event => event.isActive).length == 0 && <NoEvents openModal={setCreateEventModal} msg="Parece que você não tem eventos cadastrados" area="active"/>}
                {userData.events.filter(event => event.isActive).length > 0 && 
                    <div className="event-list">
                        <div className="list-item header">
                                <div>ID</div>
                                <div>Nome do evento</div>
                                <div>Local</div>
                                <div>Data</div>
                                <div>Detalhes</div>
                            </div>
                        {userData.events.filter(item => item.isActive).map((event)=>(
                            <div className="list-item" key={event.id}>
                                <div className="id">{event.id}</div>
                                <div>{event.eventName}</div>
                                <div>{event.local}</div>
                                <div>{dataFormatter(event.date)}</div>
                                <button onClick={() => handleOpenDetailModal(event.id)}>Detalhes</button>
                            </div>
                        ))}
                    </div>
                }
            </div>
            {createEventModal &&
                <div className="create-event-modal">
                    <div className="create-event-area">
                        <div className="return-button" onClick={closeModal}>X</div>
                        <div className="create-inputs">
                            <span>Registrar novo evento</span>
                            <input type="text" name="name" placeholder="Nome do evento" value={eventName} onChange={handleEventName} />
                            <input type="text" name="local" placeholder="Local do evento" value={eventLocal} onChange={handleEventLocal}/>
                            <input type="date" name="data" placeholder="data" value={eventDate} onChange={handleEventDate}/>
                            <textarea placeholder="Descrição do evento" rows={8} cols={50} value={eventDescription} onChange={handleEventDescription}/>
                            <button onClick={handleNewEvent}>Criar Evento</button>
                        </div>
                    </div>
                </div>
            }

            {eventDetailModal &&
                <EventDetailModal setModal={setEventDetailModal} SelectedEvent={selectedEvent} updateData={updateData}/>
            }
        </div>
    )
}

export default ActiveEvents;