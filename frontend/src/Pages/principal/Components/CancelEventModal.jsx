function CancelEventModal({setModal, eventData, setFatherModal, updateData}){

    const handleDeleteEvent = async() => {
        try{

            const response = await fetch(`http://localhost:8080/event/${eventData.id}`, {
                method: "DELETE"
            })

            setModal(false);
            setFatherModal(false);
            updateData();

        }catch(error){
            console.log(error);
        }
    }

    return(
        <div className="delete-modal">
            <div className="delete-content">
                <div className="delete-title">Deseja mesmo cancelar esse evento?</div>
                <p>O cancelamento do evento é permanente, cuidado</p>
                <div className="delete-buttons">
                    <button className="delete" onClick={handleDeleteEvent}>Cancelar Evento</button>
                    <button className="normal" onClick={() => setModal(false)}>Manter</button>
                </div>
            </div>
        </div>
    )
}

export default CancelEventModal;