
import './App.css';
import { Provider } from 'react-redux'
import store from './redux/store';
import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import { persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

function App() {

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </>

  );
}

export default App;
