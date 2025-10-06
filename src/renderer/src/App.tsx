// src/App.tsx
import React from 'react';
import TerminalPane from './components/TerminalPane';
import ChatPane from './components/ChatPane';
import './App.css'; // We will create this file next

function App() {
  return (
    <div className="app-container">
      <TerminalPane />
      <ChatPane />
    </div>
  );
}

export default App;