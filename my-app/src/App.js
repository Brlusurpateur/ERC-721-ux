import React from 'react';
import FakeBayc from './FakeBayc';
import ChainInfo from './ChainInfo';
import FakeBaycID from './FakeBaycID';
import FakeNefturians from './FakeNefturians';
import './App.css';

function App() {
  return (
      <div className="App">
        <ChainInfo />
        <FakeBayc />
        <FakeBaycID />
        <FakeNefturians />
      </div>
  );
}

export default App;
