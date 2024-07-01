import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as mammoth from 'mammoth';
import Footer from '../Footer';
import Header from '../Header';
import './textGenerator.css'

const API_KEY = 'AIzaSyC0orTg-z3EPSj91Wtpf6bBIKAQTSjbuBg'; // Reemplaza 'YOUR_API_KEY' con tu clave de API real
const genAI = new GoogleGenerativeAI(API_KEY);

const TextGenerator = () => {
    const [inputText, setInputText] = useState('Genera un resumen y 4 preguntas básicas de la siguiente información');
    const [fileName, setFileName] = useState('');
    const [responseText, setResponseText] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(`Archivo seleccionado: ${file.name}`);
        } else {
            setFileName('');
        }
    };

    const handleGenerate = async () => {
        const fileInput = document.getElementById('fileInput');
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro-latest' });
        let finalPrompt = inputText;

        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            try {
                const arrayBuffer = await file.arrayBuffer();
                const result = await mammoth.extractRawText({ arrayBuffer });
                finalPrompt += '\n\n' + result.value;
            } catch (error) {
                console.error('Error al leer el archivo:', error);
            }
        }

        try {
            setLoading(true);
            setResponseText('');
            const result = await model.generateContent(finalPrompt);
            const response = await result.response;
            setResponseText(await response.text());
            setLoading(false);
        } catch (error) {
            console.error('Error al generar contenido:', error);
            setLoading(false);
        }
    };

    return (
        <div>
            <Header/>
            <div className="container">
                <h1>¡Subi tu archivo y genera tu resumen!</h1>
                <p>Puedes modificar el prompt como quieras</p>
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                />
                <div className="button-container">
                    <label htmlFor="fileInput" className="custom-file-upload">
                        Seleccionar archivo
                    </label>
                    <input type="file" id="fileInput" accept=".docx" onChange={handleFileChange} />
                    <button onClick={handleGenerate}>Generar</button>
                </div>
                {fileName && <p id="fileName">{fileName}</p>}
                <p id="responseText">{responseText}</p>
                {loading && (
                    <div className="loader" id="loader">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" style={{ background: 'none' }}>
                            <circle cx="50" cy="50" fill="none" stroke="#23072c" strokeWidth="8" r="35" strokeDasharray="164.93361431346415 56.97787143782138">
                                <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
                            </circle>
                        </svg>
                    </div>
                )}
            </div>
            <Footer/>
        </div>
    );
};

export default TextGenerator;