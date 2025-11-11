import { createRoot } from 'react-dom/client'
import AppRouter from '@routes/AppRouter';

import 'bootstrap/dist/css/bootstrap.min.css';
import"@styles/global.css"
import { Provider } from 'react-redux';
import {store,  persistor } from './redux';
import { PersistGate } from 'redux-persist/integration/react';

// axios
import"./services/Axios-global.js"
createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        <AppRouter/>
    </PersistGate>
  </Provider>
)
