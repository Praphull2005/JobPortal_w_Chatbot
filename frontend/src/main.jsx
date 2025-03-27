import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from './components/ui/sonner'
import { Provider } from 'react-redux'
import Store from './redux/Store'
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react'

const persistor = persistStore(Store)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={Store}>
      <PersistGate loading="null" persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
    <Toaster />
  </StrictMode>,
)
