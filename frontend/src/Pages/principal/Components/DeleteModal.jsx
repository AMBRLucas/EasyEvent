function DeleteModal({setDeleteModal, deleteGuess, selectedGuess}){

    const handleDelete = () => {
        deleteGuess(selectedGuess);
        setDeleteModal(false);
    }

    const handleCancel = () => {
        setDeleteModal(false);
    }

    return(
        <div className="delete-modal">
            <div className="delete-content">
                <div className="delete-title">
                    Tem certeza que deseja excluir esse convidado?
                </div>
                <div className="delete-buttons">
                    <button className="delete" onClick={handleDelete}>Excluir</button>
                    <button className="normal" onClick={handleCancel}>Cancelar</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal;