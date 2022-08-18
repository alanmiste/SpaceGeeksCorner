import React from 'react';
import './App.css';
import {HashRouter} from "react-router-dom";
import Home from "./pages/Home";

function App() {
    return (<>
        <HashRouter>
            <Home/>
        </HashRouter>
    </>);
}

export default App;
