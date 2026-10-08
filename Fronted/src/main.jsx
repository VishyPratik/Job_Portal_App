import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import { store } from './redux/Store.jsx'
import { Provider } from "react-redux"
import { ToastContainer } from 'react-toastify';
export const serverUrl ="https://job-portal-app-x7lr.onrender.com"
createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
            <ToastContainer />
        </Provider>
    
    </BrowserRouter>,
)
