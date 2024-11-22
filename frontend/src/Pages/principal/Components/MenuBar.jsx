function MenuBar({setView}) {

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
                <div className="menu-item">
                    Minha conta
                </div>
            </div>
            <button>Sair</button>
        </div>
    )
}

export default MenuBar;