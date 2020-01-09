import React from 'react';
import './App.css';
import Title from "./components/Title";
import Main from "./components/Main";
import {Grommet} from "grommet";

function App() {
  return (
    <Grommet className="App" full={true} theme={{ global: { colors: { olive: '#12463C', lightOlive: '#237364' }}, }}>
        <Title title="Cod...ing" bg="lightOlive" borderColor="olive" textColor="darkorange" />
        <Main />
    </Grommet>
  );
}

export default App;
