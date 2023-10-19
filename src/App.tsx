import React from "react";
import { Provider } from "react-redux";
import Game from "./components/Game";
import store from "./redux/store";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Game />
      </div>
    </Provider>
  );
};

export default App;
