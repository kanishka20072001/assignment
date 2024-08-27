// src/App.js
import React, { useState } from 'react';
import './App.css';

function App() {
    const [style, setStyle] = useState('');
    const [voice, setVoice] = useState('');
    const [comedyShow, setComedyShow] = useState('');

    const handleGenerate = async () => {
        const response = await fetch('/generate-comedy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ style, voice }),
        });
        const data = await response.json();
        setComedyShow(data.comedyShow);
    };

    return (
        <div className="App">
            <h1>Generate Your Comedy Show</h1>
            <input
                type="text"
                placeholder="Comedy Style"
                value={style}
                onChange={(e) => setStyle(e.target.value)}
            />
            <input
                type="text"
                placeholder="Voice Type"
                value={voice}
                onChange={(e) => setVoice(e.target.value)}
            />
            <button onClick={handleGenerate}>Generate</button>
            <div className="comedy-show">
                <h2>Your Comedy Show:</h2>
                <p>{comedyShow}</p>
            </div>
        </div>
    );
}

export default App;
