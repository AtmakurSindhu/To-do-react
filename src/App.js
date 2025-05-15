import React from 'react';
import './style.css';
import Home from './Pages/Home.jsx';

function App() {
  return (
    <>
      <h1
        style={{
          textAlign: 'center',
          fontSize: '2.5rem',
          fontWeight: 'bold',
          color: '#ffffff',
          backgroundColor: '#6a0dad', // purple background
          marginTop: '20px',
          padding: '15px',
          borderRadius: '10px',
          fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
        }}
      >
        To-Do App
      </h1>
      <Home />
    </>
  );
}

export default App;
