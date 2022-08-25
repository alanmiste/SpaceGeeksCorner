import React from 'react';
import './App.css';
import {HashRouter} from "react-router-dom";
import AllRoutes from "./components/AllRoutes";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (<>
        <HashRouter>
            <AllRoutes/>
        </HashRouter>
        <ToastContainer/>
    </>);
}

export default App;
