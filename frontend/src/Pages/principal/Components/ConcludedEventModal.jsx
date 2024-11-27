function ConcludedEventModal({selectedEvent, setModal}){

    const dataFormatter = (data) => {
        const date = new Date(data);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };
    

    return(
        <div className="delete-modal">
            <div className="delete-content">
                <div className="concluded-event">
                    <div className="return-button" onClick={() => setModal(false)}>X</div>
                    <div className="event-information">
                        <span>{selectedEvent.eventName}</span>
                        <div className="infos">
                            <div className="infos-area">
                            <p><span>Data:</span> {dataFormatter(selectedEvent.date)}</p>
                            <p><span>Local:</span> {selectedEvent.local}</p>
                            <p><span>Descrição:</span> {selectedEvent.description}</p>
                            </div>
                        </div>
                        <div className="guess-area">
                            <div className="guess-header">
                                Convidados que compareceram:
                            </div>
                            <div className="guess-area-list">
                                {selectedEvent.guessList.filter(guess => guess.isConfirmed).length === 0 && "infelizmente ninguem compareceu"}
                                {selectedEvent.guessList.filter(guess => guess.isConfirmed).map(guess => (
                                    <div className="guess-area-item"><p className="guess-name">{guess.name}</p> <p>Telefone: {guess.phone}</p></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConcludedEventModal;