import { useEffect, useState } from "react";
import DeleteModal from "./DeleteModal";
import EditGuess from "./EditGuess";
import EditEventModal from "./EditEventModal";
import ConcludeEventModal from "./ConcludeEventModal";
import CancelEventModal from "./CancelEventModal";

function EventDetailModal({SelectedEvent, setModal, updateData}){

    const [loading, setLoading] = useState(true)
    const [eventData, setEventData] = useState();

    const [guessName, setGuessName] = useState('');
    const [guessPhone, setGuessPhone] = useState('');

    const [deleteModal, setDeleteModal] = useState(false);
    const [editGuessModal, setEditGuessModal] = useState(false);
    const [editEventModal, setEditEventModal] = useState(false);
    const [concludeEventModal, setConcludeEventModal] = useState(false);
    const [cancelEventModal, setCancelEventModal] = useState(false);

    const [selectedGuess, setSelectedGuess] = useState(undefined);

    const handleClose = () => {
        setModal(false);
        updateData();
    }

    const handleOpenDelete = (id) => {
        setSelectedGuess(id);
        setDeleteModal(true);
    }

    const handleEditModal = (id) => {
        setSelectedGuess(id);
        setEditGuessModal(true);
    }

    const handleGuessName = (event) => {
        setGuessName(event.target.value);
    }

    const handleGuessPhone = (event) => {
        setGuessPhone(event.target.value)
    }

    const dataFormatter = (data) => {
        const date = new Date(data);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const getEvent = async() => {
        try{
            const response = await fetch(`http://localhost:8080/event/${SelectedEvent}`);
            if(!response.ok){
                return
            }
            const result = await response.json();

            setEventData(result);

            setLoading(false);
        }catch(error){

        }
    }

    const addGuess = async() => {
        try{
            const response = await fetch("http://localhost:8080/guess", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: guessName,
                    phone: guessPhone,
                    event: {
                        id: eventData.id
                    }
                })
            })

            const result = await response.json();

            getEvent();
            setGuessName('')
            setGuessPhone('')
        }catch(error){
            console.log(error)
        }
    }

    const confirmGuessPresence = async(id) => {
        try{
            const response = await fetch(`http://localhost:8080/guess/confirm/${id}`, {
                method: "PUT"
            });
            getEvent();
        }catch(error){
            console.log(error);
        }
    }

    const deleteGuess = async(id) => {
        try{
            const response = await fetch(`http://localhost:8080/guess/${id}`, {
                method: "DELETE"
            })
            
            getEvent();
        }catch(error){
            console.log(error)
        }
    }


    const nothing = () => {
        return;
    }

    useEffect(()=>{
        if(eventData == undefined){
            getEvent()
        }
    })

    return(
        <div className="event-detail">
            {!loading &&
                <div className="detail-area">
                    <div className="return-button" onClick={handleClose}>X</div>
                    <div className="details">
                        <div className="details-title"><span>Evento</span> - {eventData.eventName}</div>
                        <div className="details-info"><span>Data:</span> {dataFormatter(eventData.date)}</div>
                        <div className="details-info"><span>Local:</span> {eventData.local}</div>
                        <div className="details-info"><span>Descrição:</span> {eventData.description}</div>
                        <div className="add-guess-form">
                            Adicionar convidados
                            <div className="form-inputs">
                                <input type="text" name="name" placeholder="nome do convidado" value={guessName} onChange={handleGuessName}/>
                                <input type="text" name="telefone" placeholder="telefone" value={guessPhone} onChange={handleGuessPhone}/>
                            </div>
                                <button onClick={addGuess} className="guss-add">Adicionar</button>
                        </div>
                        <div className="guess-list">
                            <div className="guess-list-header">Convidados</div>
                            <div className="guess-list-items">
                                {eventData.guessList.length == 0 && "Ainda sem convidados"}
                                {eventData.guessList.length > 0 &&
                                    <>
                                        {eventData.guessList.map((guess)=> (
                                            <div className="guess-list-item" key={guess.id}>
                                                <div className="confirm"><div className={guess.isConfirmed ? "confirmed" : "non-confirmed"} onClick={guess.isConfirmed ? () => nothing() : () => confirmGuessPresence(guess.id)}></div></div>
                                                <div>{guess.name}</div> 
                                                <div>{guess.phone}</div>
                                                <div>
                                                    <button className="editar" onClick={() => handleEditModal(guess)}>editar</button>
                                                    <button className="remove" onClick={()=> handleOpenDelete(guess.id)}>X</button>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                }
                            </div>
                            <div className="event-buttons">
                                <button onClick={() => setEditEventModal(true)}>Editar Evento</button>
                                <button onClick={() => setConcludeEventModal(true)}>Concluir Evento</button>
                                <button className="remove" onClick={() => setCancelEventModal(true)}>Cancelar Evento</button>
                            </div>
                        </div>
                        {deleteModal && <DeleteModal setDeleteModal={setDeleteModal} selectedGuess={selectedGuess} deleteGuess={deleteGuess} />}
                        {editGuessModal && <EditGuess selectedGuess={selectedGuess} setEditModal={setEditGuessModal} getEvent={getEvent}/>}
                        {editEventModal && <EditEventModal setEditEventModal={setEditEventModal} eventData={eventData} getEvent={getEvent}/>}
                        {concludeEventModal && <ConcludeEventModal setModal={setConcludeEventModal} eventData={eventData}/>}
                        {cancelEventModal && <CancelEventModal setModal={setCancelEventModal} eventData={eventData} setFatherModal={setModal} updateData={updateData} />}
                    </div>
                </div>
            }
        </div>
    )
}

export default EventDetailModal;