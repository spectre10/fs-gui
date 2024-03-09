import { useState } from 'react';
// import logo from './assets/images/logo-universal.png';
import './App.css';
import { useNavigate } from 'react-router-dom';
// import { Greet } from "../wailsjs/go/main/App";

function App() {
    // const [resultText, setResultText] = useState("Please enter your name below 👇");
    // const [name, setName] = useState('');
    // const updateName = (e) => setName(e.target.value);
    // const updateResultText = (result) => setResultText(result);
    let navigate = useNavigate();
    // function greet() {
    //     Greet(name).then(updateResultText);
    // }

    function handle(event) {
        if(event.target.name === "send") {
            navigate("/send");
        } else {
            navigate("/receive");
        }
    }

    return (
        <div id="App">
            <div className=''>
                <h1 className='text-6xl mt-5'>fs-gui</h1>
            </div>
            <div className='grid grid-cols-2 gap-4'>
                <div className='border-black border-4 h-72 flex justify-center items-center'>
                    <button name="send" className='bg-red-100 text-black' onClick={handle}>Send</button>
                </div>
                <div className='border-black border-4 h-72 flex justify-center items-center'>
                    <button name="receive" className='bg-red-100 text-black' onClick={handle}>Receive</button>
                </div>
            </div>
        </div>
    )
}

export default App
