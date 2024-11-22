import { useState, useEffect } from "react";

function EditEventModal({setEditEventModal, eventData, getEvent}){

    const [eventNameInput, setEventNameInput] = useState(eventData.eventName);
    const [localInput, setLocalInput] = useState(eventData.local);
    const [dateInput, setInputDate] = useState(eventData.date);
    const [descriptionInput, setDescriptionInput] = useState(eventData.description);

    const handleNameInput = (event) => {
        setEventNameInput(event.target.value);
    }

    const handleLocalInput = (event) => {
        setLocalInput(event.target.value);
    }

    const handleDateInput = (event) => {
        setInputDate(event.target.value);
    }

    const handleDescriptionInput = (event) => {
        setDescriptionInput(event.target.value);
    }

    const handleEditEvent = async() => {

        try{
            const response = await fetch(`http://localhost:8080/event/update/${eventData.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    eventName: eventNameInput,
                    description: descriptionInput,
                    local: localInput,
                    date: dateInput
                })
            });

            handleClose();
        }catch(error){
            console.log(error);
        }
    }

    const handleClose = () => {
        setEditEventModal(false);
        getEvent()
    }

    const formatData = (data) => {
        const [year, month, day] = data;

        return `${year}-${month}-${day}` 
    }

    return(
        <div className="delete-modal">
            <div className="delete-content">
                <div className="delete-title">Alterar informações do evento</div>
                <div className="create-inputs">
                    <input type="text" placeholder="Nome do evento" defaultValue={eventNameInput} onChange={handleNameInput}/>
                    <input type="text" placeholder="local" defaultValue={localInput} onChange={handleLocalInput}/>
                    <input type="date" defaultValue={formatData(eventData.date)} onChange={handleDateInput}/>
                    <textarea placeholder="descrição"  cols={50} rows={8} defaultValue={eventData.description} onChange={handleDescriptionInput}/>
                </div>
                <div className="delete-buttons">
                    <button className="normal" onClick={() => handleEditEvent()}>Atualizar</button>
                    <button className="delete" onClick={handleClose}>Cancelar</button>
                </div>
            </div>
        </div>
    )
}

export default EditEventModal;