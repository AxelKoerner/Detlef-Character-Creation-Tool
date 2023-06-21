import React from 'react';
import './App.css';
import {ColorModeContext, useMode} from "./theme";
import {CssBaseline, ThemeProvider} from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Profile from "./scenes/profile";
import Settings from "./scenes/settings";
import Login from "./scenes/login";
import Dashboards from "./scenes/dashboards";
import CreateAccount from "./scenes/createAccount";
import DndCharacterSheet from './scenes/CharacterSheet/CharacterSheet';
import CustomBackground from './scenes/Custom/CustomBackground';
import CustomLineage from './scenes/Custom/CustomLineage';
import CharacterDisplaySheet from './scenes/CharacterSheet/CharacterDisplaySheet';
import SideBar from "./scenes/global/SideBar";

function App() {
    const [theme, colorMode] = useMode();

    // @ts-ignore
    return (<ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <div className="app">
                    <BrowserRouter>
                        <SideBar />
                    <main className="content">
                        <Topbar/>

                            <Routes>
                                <Route path="/dashboards" element={<Dashboards/>}/>
                                <Route path="/" element={<Login/>}/>
                                <Route path="/profile" element={<Profile/>}/>
                                <Route path="/settings" element={<Settings/>}/>
                                <Route path="/createAccount" element={<CreateAccount/>}/>
                                <Route path="/characterSheet" element={<DndCharacterSheet/>}/>
                                <Route path="/customBackground" element={<CustomBackground/>}/>
                                <Route path="/customLineage" element={<CustomLineage/>}/>
                                <Route path="/characterDisplaySheet" element={<CharacterDisplaySheet/>}/>
                            </Routes>

                    </main>
                    </BrowserRouter>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>

    );
}

export default App;
