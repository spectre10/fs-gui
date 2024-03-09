import React from 'react'
import * as ReactDOM from 'react-dom/client'
import { HashRouter, Routes, Route } from "react-router-dom";
import './style.css'
import App from './App'
import Send from './Send'
import Sdp from './Sdp'
import Receive from './Receive'

const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)

root.render(
    <React.StrictMode>
        <HashRouter>
            <Routes>
                <Route path="/" element={<App />} exact />
                <Route path="/send" element={<Send />} exact />
                <Route path="/send/sdp" element={<Sdp />} exact />
                <Route path="/receive" element={<Receive />} exact />
            </Routes>
        </HashRouter>
    </React.StrictMode>
);
