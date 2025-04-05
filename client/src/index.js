import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import './index.css';
import './flags.css';
import App from './App';
import TokenSlice from './Store/TokenSlice';
import UserSlice from './Store/UserSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux'
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import { persistReducer, persistStore } from 'redux-persist';
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['TokenSlice', 'UserSlice']
};
const rootReducer = combineReducers({
  TokenSlice,
  UserSlice
});


const persistedReducer = persistReducer(persistConfig, rootReducer);
const myStore = configureStore({
    reducer: persistedReducer,
  
})
const persistor = persistStore(myStore);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={myStore}>
    <PersistGate loading={null} persistor={persistor}><App />
    </PersistGate>
  
</Provider>
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
