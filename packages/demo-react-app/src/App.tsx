import React from 'react';
import './App.css';
import { Nstaller } from '@nstaldev/react-core';
import { NstalReactComponents } from '@nstaldev/react-components';
import { Connector } from '@nstaldev/react-core';

function App() {
  return (
    <div className="App">
      <Nstaller components={NstalReactComponents}>
        Hello!
        <Connector />
      </Nstaller>
    </div>
  );
}

export default App;
