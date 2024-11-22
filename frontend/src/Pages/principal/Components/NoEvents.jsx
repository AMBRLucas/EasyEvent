function NoEvents({openModal, msg, area}){

    return(
        <div className="no-events">
            <p>{msg}</p>
            {area == "active" && <button onClick={() => openModal(true)}>Criar Novo Evento</button>}
        </div>
    )
}

export default NoEvents;