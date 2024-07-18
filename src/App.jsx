import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Profile from "./Models/Profile.jsx";
import TicTacToe from "./Models/TicTacToe.jsx";
import ConnectFour from "./Models/ConnectFour.jsx";
import "./App.css";

const ViewState = Object.freeze({
  Default: 0,
  AboutPage: 1,
  TicTacToe: 2,
  ConnectFour: 3,
});

function Toolbar({ setState }) {
  function handleViewChange(state) {
    setState(state);
    window.scrollTo(0, 0);
  }

  return (
    <div className="mainToolbar">
      <button onClick={() => handleViewChange(ViewState.Default)}>
        Default
      </button>
      <button onClick={() => handleViewChange(ViewState.AboutPage)}>
        About
      </button>
      <button onClick={() => handleViewChange(ViewState.TicTacToe)}>
        TicTacToe
      </button>
      <button onClick={() => handleViewChange(ViewState.ConnectFour)}>
        Connect Four
      </button>
    </div>
  );
}

function DefaultView() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

function GetView({ state }) {
  switch (state) {
    case ViewState.AboutPage:
      return <Profile />;

    case ViewState.TicTacToe:
      return <TicTacToe />;

    case ViewState.ConnectFour:
      return <ConnectFour />;

    default:
      return <DefaultView />;
  }
}

function App() {
  const [state, setState] = useState(0);

  return (
    <div>
      <Toolbar setState={setState} />
      <div className="childContent">
        <GetView state={state} />
      </div>
    </div>
  );
}

export default App;
