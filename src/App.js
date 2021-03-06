import React from "react";
import "./App.css";
import Title from "./components/Title";
import Main from "./components/Main";
import { Grommet } from "grommet";
import { Apps } from "grommet-icons";

function App() {
  const theme = {
    global: {
      colors: { olive: "#12463C", lightOlive: "#237364" },
      selected: {
        background: "blue"
      }
    },
    tab: {
      color: "lightOlive",
      border: {
        color: "lightOlive"
      }
    },
    worldMap: {
      extend: {
        width: "70vw",
        height: "70vh"
      }
    },
    checkBox: {
      color: "black",
      icons: {
        checked: Apps
      }
    },
    select: {
      icons: {
        color: "#FDDF03"
      }
    }
  };

  return (
    <Grommet className="App" full={true} theme={theme}>
      <Title
        title="Cod...ing"
        bg="lightOlive"
        borderColor="olive"
        textColor="darkorange"
      />
      <Main />
    </Grommet>
  );
}

export default App;
