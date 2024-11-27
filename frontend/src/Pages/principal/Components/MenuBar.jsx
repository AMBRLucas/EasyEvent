function MenuBar({setView}) {

    const handleLogout = () => {
        localStorage.removeItem("id");
        window.location.reload();
    }

    return (
        <div className="menu-bar">
            <div className="menu-content">
                <div className="menu-title">
                    <span>EasyEvent</span>
                </div>
                <div className="menu-item" onClick={() => setView("active")}>
                    Meus Eventos
                </div>
                <div className="menu-item" onClick={() => setView("history")}>
                    Historico de eventos
                </div>
            </div>
            <button onClick={handleLogout}>Sair</button>
        </div>
    )
}

export default MenuBar;