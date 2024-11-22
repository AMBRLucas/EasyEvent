import React, { useState, createContext } from "react";

const TelaContext = createContext();

const TelaProvider = ({ children }) => {
    const [tela, setTela] = useState("login");
    const [user, setUser] = useState(null);

    return(
        <TelaContext.Provider value={{tela, setTela, user, setUser}}>
            {children}
        </TelaContext.Provider>
    );
}

export {TelaContext, TelaProvider};