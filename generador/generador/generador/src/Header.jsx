import './header.css';

function Header() {
    return (
        <header className="header">
            <div className="logo-container">
                <img src="Logo.png" alt="Logo" className="logo" />
            </div>
            <nav className="nav">
                <ul className="nav-list">
                    <li className="nav-item"><a href="http://localhost:5173">Inicio de sesión</a></li>
                    <li className="nav-item"><a href="http://localhost:5173">Nosotras</a></li>
                    <li className="nav-item"><a href="#subir">Subir</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
