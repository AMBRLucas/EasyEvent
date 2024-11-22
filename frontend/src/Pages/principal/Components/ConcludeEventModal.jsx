function ConcludeEventModal({eventData, setModal}){

    const handleConclude = async() => {
        try{
            const response = await fetch(`http://localhost:8080/event/conclude/${eventData.id}`, {
                method: "PUT"
            });

            setModal();
        }catch(error){
            console.log(error);
        }
    }

    return(
        <div className="delete-modal">
            <div className="delete-content">
                <div className="delete-title">Tem Certeza que deseja concluir esse evento?</div>
                <p>Uma vez concluido nenhuma informação desse evento poderá ser modificada</p>
                <div className="delete-buttons">
                    <button className="normal" onClick={handleConclude}>Concluir</button>
                    <button className="delete" onClick={() => setModal(false)}>Cancelar</button>
                </div>
            </div>
        </div>
    )
}

export default ConcludeEventModal;