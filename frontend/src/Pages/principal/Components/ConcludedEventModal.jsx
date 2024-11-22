function ConcludedEventModal({selectedEvent}){

    return(
        <div className="delete-modal">
            <div className="delete-content">
                <div className="concluded-event">
                    <div className="return-button">X</div>
                    <div className="event-information"><span>{selectedEvent.eventName}</span></div>
                </div>
            </div>
        </div>
    )
}

export default ConcludedEventModal;