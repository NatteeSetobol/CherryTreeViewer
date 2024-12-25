import React from 'react';
import AppRoutes from  './AppRoutes'
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <AppRoutes />
     </Provider>
    </div>
  );
}

export default App;