import './App.css'
import NavBar from "./component/nav-bar/NavBar.jsx";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {useMemo, useState} from "react";
import getTheme from "./theme/index.js";
import MainView from "./page/main/MainView.jsx";

function App() {
    const [mode, setMode] = useState('light')
    const theme = useMemo(() => getTheme(mode), [mode])
    const [selectedPlace , setSelectedPlace] = useState();

    const toggleColorMode = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

  return (
      <ThemeProvider theme={theme}>
          <CssBaseline/>
          <NavBar toggleColorMode={toggleColorMode} selectedPlace={selectedPlace}   setSelectedPlace={setSelectedPlace}/>
          <MainView selectedPlace={selectedPlace}/>

      </ThemeProvider>
  )
}

export default App
