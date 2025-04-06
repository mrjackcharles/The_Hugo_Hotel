import React from "react";
import "./App.css";
import GETrooms from "./components/GETrooms.jsx";
import SideNav from "./components/SideNav";

const App = () => {
    return (
        <div>
            <div>
                <SideNav />
            </div>
            <div className="roomlist-container">
                <GETrooms />
            </div>
        </div>
    );
};

export default App;
