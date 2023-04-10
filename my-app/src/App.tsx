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


function App() {
    const [theme, colorMode] = useMode();

    return (<ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <div className="App">
                    <main className="content">
                        <Topbar/>
                        <BrowserRouter>
                            <Routes>
                                <Route path="/dashboards" element={<Dashboards/>}/>
                                <Route path="/" element={<Login/>}/>
                                <Route path="/profile" element={<Profile/>}/>
                                <Route path="/settings" element={<Settings/>}/>
                            </Routes>
                        </BrowserRouter>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>

    );
}

export default App;
