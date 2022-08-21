import React from 'react';
import './App.css';
import {HashRouter} from "react-router-dom";
import AllRoutes from "./components/AllRoutes";

function App() {
    return (<>
        <HashRouter>
            <AllRoutes/>
        </HashRouter>
    </>);
}

export default App;
