import { useEffect, useState } from "react";
import SliderContent from "./SliderContent";
import Slider from "./Slider";
import Arrows from "./arrows";
import Dots from "./dots";
import Header from "./Header";
import Footer from "./Footer";
import './slider.css';
import './content.css'; 
import './footer.css';
import './styles.css';
import PropTypes from 'prop-types';
import { GoogleLogin } from "@react-oauth/google";

const len = Slider.length - 1;

const Login = ({ setIsRegistering }) => (
    <main className="card">
        <section className="izquierda">
            <img src="/images/Logo.png" alt="Imagen logo" className="imagen_logo" />
            <h3 className="titulo_login">Inicia sesión</h3>
            <span className="subtitulo">¡Ingresa a una cuenta para empezar!</span>
            <form>
                <section className="caja_input">
                    <label>E-mail</label>
                    <input type="text" placeholder="Email" />
                </section>
                <section className="caja_input">
                    <label>Contraseña</label>
                    <input type="password" placeholder="Contraseña" />
                </section>
            </form>
            <section className="control_guardado">
                <span className="olvidaste_contraseña">¿Olvidaste tu contraseña?</span>
            </section>
            <section className="control_acceso">
                <button type="submit">Iniciar sesión</button>
                <button className="boton_registrar" onClick={() => setIsRegistering(true)}>
                    <span className="boton_registrar--texto">Registrarte</span>
                </button>
            </section>
            <section className="separador">
                <span>o puedes...</span>
            </section>
            <section className="control_login_social">
                <div className="googlelogin">
                    <GoogleLogin
                        onSuccess={(credentialResponse) => console.log(credentialResponse)}
                        onFailure={() => console.log('login failed')}
                    />
                </div>
            </section>
        </section>
        <section className="derecha">
            <div className="background_imagen">
                <div className="detalle_vidrio">
                    <div className="detalle_vidrio-interno">
                        <span>¡Comienza ya!
                        Aprender es lo más importante en toda carrera universitaria, comienza a estudiar ahora con nuestra pagina.
                        </span>
                    </div>
                </div>
                <img src="./Mookup/ic-background-direita.svg" alt="background_imagen"></img>
            </div>
        </section>
    </main>
);

Login.propTypes = {
    setIsRegistering: PropTypes.func.isRequired,
};

const Register = ({ setIsRegistering }) => (
    <main className="card">
        <section className="izquierda">
            <img src="/images/Logo.png" alt="Imagen logo" className="imagen_logo" />
            <h3 className="titulo_login">Registrarse</h3>
            <span className="subtitulo">¡Crea una cuenta para empezar!</span>
            <form>
                <section className="caja_input">
                    <label>E-mail</label>
                    <input type="text" placeholder="Email" />
                </section>
                <section className="caja_input">
                    <label>Contraseña</label>
                    <input type="password" placeholder="Contraseña" />
                </section>
                <section className="caja_input">
                    <label>Confirmar Contraseña</label>
                    <input type="password" placeholder="Confirmar Contraseña" />
                </section>
            </form>
            <section className="control_acceso">
                <button type="submit">Registrarse</button>
                <button className="boton_registrar" onClick={() => setIsRegistering(false)}>
                    <span className="boton_registrar--texto">Volver a Iniciar sesión</span>
                </button>
            </section>
        </section>
        <section className="derecha">
            <div className="background_imagen">
                <div className="detalle_vidrio">
                    <div className="detalle_vidrio-interno">
                        <span>¡Comienza ya!
                        Aprender es lo más importante en toda carrera universitaria, comienza a estudiar ahora con nuestra pagina.
                        </span>
                    </div>
                </div>
                <img src="./Mookup/ic-background-direita.svg" alt="background_imagen"></img>
            </div>
        </section>
    </main>
);

Register.propTypes = {
    setIsRegistering: PropTypes.func.isRequired,
}

function Slidersss() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isRegistering, setIsRegistering] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex(activeIndex === len ? 0 : activeIndex + 1);
        }, 5000);
        return () => clearInterval(interval);
    }, [activeIndex]);

    return (
        <div>
            <Header />
            <div className="slider-container">
                <SliderContent activeIndex={activeIndex} Slider={Slider} />
                <Arrows 
                    prevSlide={() => 
                        setActiveIndex(activeIndex < 1 ? len : activeIndex - 1)
                    }
                    nextSlide={() => 
                        setActiveIndex(activeIndex === len ? 0 : activeIndex + 1)
                    }
                />
                <Dots 
                    activeIndex={activeIndex} 
                    Slider={Slider} 
                    onClick={(activeIndex) => setActiveIndex(activeIndex)} 
                />
            </div>
            <div className="content-container" id="login">
                {isRegistering ? <Register setIsRegistering={setIsRegistering} /> : <Login setIsRegistering={setIsRegistering} />}
            </div>
            <div className="image-content-container" id="nosotras">
                <img src="/images/Logo.png" alt="Placeholder" className="content-image" />
                <div className="text-content">
                    <h2>¿Quienes Somos?</h2>
                    <p>Somos alumnas de Tecnicatura Universitaria en Programación de la Universidad Tecnologica Nacional de Tucumán, dichosas y orgullosas creadoras de Malagmai con finalidad de aprobar el trabajo final de la materia Programación III.
Nos encontramos gratificantes hacia el apoyo recibido por parte de todos los usuarios y docentes inscritos para poder optar por nuestra herramienta a libre público y que su labor y el aprender sean captados en su completa esencia. De parte de nosotras: ¡les deseamos un buen aprender! 
                    </p>
                </div>
            </div>
            <Footer /> {/* Asegúrate de agregar el Footer aquí */}
        </div>
    );
}

export default Slidersss;
