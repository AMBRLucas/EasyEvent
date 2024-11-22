import { useState } from "react";
import NoEvents from "./NoEvents";
import ConcludedEventModal from "./ConcludedEventModal";

function EventHistory({userData, updateData}){

    const [concludedEventModal, setConcludedEventModal] = useState(false)

    const [selectedEvent, setSelectedEvent] = useState('');

    const handleOpenModal = (event) => {
        setSelectedEvent(event);
        setConcludedEventModal(true);
    }

    const dataFormatter = (data) => {
        const date = new Date(data);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };
    
    return(
        <div className="view">
            <div className="view-header"><span>Historico de eventos</span></div>
            <div className="view-body">
            {userData.events.filter(event => !event.isActive).length == 0 && <NoEvents msg="Parece que você ainda não tem eventos concluidos..." area={"history"}/>}
            {userData.events.filter(event => !event.isActive).length > 0 && 
                <div className="event-list">
                    <div className="list-item header">
                        <div>ID</div>
                        <div>Nome do evento</div>
                        <div>Local</div>
                        <div>Data</div>
                        <div>Detalhes</div>
                    </div>
                    {userData.events.filter(item => !item.isActive).map((event)=>(
                            <div className="list-item" key={event.id}>
                                <div className="id">{event.id}</div>
                                <div>{event.eventName}</div>
                                <div>{event.local}</div>
                                <div>{dataFormatter(event.date)}</div>
                                <button onClick={() => handleOpenModal(event)}>Detalhes</button>
                            </div>
                        ))}
                </div>
            }
            </div>
            {concludedEventModal && <ConcludedEventModal selectedEvent={selectedEvent} />}
        </div>
    )
}

export default EventHistory;