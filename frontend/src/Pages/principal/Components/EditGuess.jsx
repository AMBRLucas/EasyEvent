import { useState } from "react";

function EditGuess({selectedGuess, setEditModal, getEvent}) {

    const [idInput, setIdInput] = useState(selectedGuess.id);
    const [nameInput, setNameInput] = useState(selectedGuess.name);
    const [phoneInput, setPhoneInput] = useState(selectedGuess.phone)

    const handleNameInput = (event) => {
        setNameInput(event.target.value)
    }

    const handlePhoneInput = (event) => {
        setPhoneInput(event.target.value)
    }

    const closeAndUpdate = () => {
        getEvent();
        setEditModal(false);
    }

    const handleEditAction = async() => {
        try{
            console.log(nameInput, phoneInput)
            const response = await fetch(`http://localhost:8080/guess/update/${idInput}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    name: nameInput,
                    phone: phoneInput
                })
            });
            
            closeAndUpdate();

        }catch(error){
            console.log(error);
        }
    }

    return(
        <div className="delete-modal">
            <div className="delete-content">
                <div className="delete-title">Editar convidado</div>
                <input type="text" className="id" defaultValue={idInput} disabled/>
                <input type="text" className="name" defaultValue={nameInput} onChange={handleNameInput}/>
                <input type="text" className="phone" defaultValue={phoneInput} onChange={handlePhoneInput}/>
                <div className="delete-buttons">
                    <button className="normal" onClick={() => handleEditAction()}>Editar</button>
                    <button className="delete" onClick={()=>setEditModal(false)}>Cancelar</button>
                </div>

            </div>
        </div>
    )
}

export default EditGuess;